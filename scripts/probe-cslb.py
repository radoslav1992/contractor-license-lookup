"""Temporary: download CSLB's statewide License Master CSV and describe it."""
import csv, html, http.cookiejar, io, re, urllib.parse, urllib.request, zipfile
from collections import Counter

BASE = "https://www.cslb.ca.gov/OnlineServices/DataPortal/"
URL = BASE + "ContractorList"
UA = "Mozilla/5.0 (compatible; contractorlicenselookup.org data check)"
jar = http.cookiejar.CookieJar()
opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(jar))
opener.addheaders = [("User-Agent", UA)]

def hidden(page):
    return {n: html.unescape(v) for n, v in re.findall(r'<input type="hidden" name="([^"]+)" id="[^"]*" value="([^"]*)"', page)}

def post(page, target, extra):
    data = hidden(page)
    data.update({"__EVENTTARGET": target, "__EVENTARGUMENT": ""})
    data.update(extra)
    req = urllib.request.Request(URL, data=urllib.parse.urlencode(data).encode(), headers={"User-Agent": UA})
    return opener.open(req, timeout=600)

page = opener.open(URL, timeout=60).read().decode("utf-8", "replace")
step2 = post(page, "ctl00$MainContent$ddlStatus", {"ctl00$MainContent$ddlStatus": "M"}).read().decode("utf-8", "replace")
i = step2.find('id="MainContent_uplinks"')
print("--- links area after choosing License Master")
print(re.sub(r"<[^>]+>", " ", step2[i:i + 2500]).split("Back")[0])
resp = post(step2, "ctl00$MainContent$lbMasterCSV", {"ctl00$MainContent$ddlStatus": "M"})
body = resp.read()
print("--- download ->", resp.status, resp.headers.get("Content-Type"), resp.headers.get("Content-Disposition"), len(body), "bytes")
if body[:2] == b"PK":
    z = zipfile.ZipFile(io.BytesIO(body))
    print("zip contents:", [(x.filename, x.file_size) for x in z.infolist()])
    body = z.read(z.infolist()[0])
text = body.decode("utf-8-sig", "replace")
if text.lstrip().startswith("<"):
    print(re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", text))[:1500])
else:
    rows = list(csv.reader(io.StringIO(text)))
    print("rows:", len(rows))
    print("header:", rows[0])
    for r in rows[1:3]:
        print("sample:", [c[:30] for c in r])
    for name in rows[0]:
        if any(k in name.lower() for k in ("status", "class", "county", "type", "wc")):
            col = rows[0].index(name)
            print(f"{name}:", Counter(r[col] for r in rows[1:] if len(r) > col).most_common(12))
    for idx, name in enumerate(rows[0]):
        vals = [r[idx] for r in rows[1:2000] if len(r) > idx and r[idx]]
        print(f"  {idx} {name}: filled {len(vals)}/1999, max len {max((len(v) for v in vals), default=0)}")

# ---- round 2: semantics and index sizing
import datetime
H = rows[0]
col = {h: i for i, h in enumerate(H)}
data = [r for r in rows[1:] if len(r) == len(H)]
print("--- classification codes")
codes = Counter(c.strip() for r in data for c in r[col["Classifications(s)"]].split("|"))
print(sorted(codes.items()))
print("--- name fields samples")
shown = 0
for r in data:
    if r[col["BUS-NAME-2"]] or r[col["FullBusinessName"]]:
        print([r[col[k]] for k in ("BusinessType", "BusinessName", "BUS-NAME-2", "FullBusinessName", "NAME-TP-2")])
        shown += 1
        if shown >= 12: break
print("NAME-TP-2:", Counter(r[col["NAME-TP-2"]] for r in data).most_common(8))
today = datetime.date(2026, 11, 3)
def d(s):
    s = s.strip()
    try: return datetime.datetime.strptime(s, "%m/%d/%Y").date()
    except ValueError: return None
expired = [r for r in data if d(r[col["ExpirationDate"]]) and d(r[col["ExpirationDate"]]) < today]
inactive = [r for r in data if r[col["InactivationDate"]].strip()]
print("expired:", len(expired), "inactivation set:", len(inactive))
for r in inactive[:5]:
    print("inactive sample:", [r[col[k]] for k in ("LicenseNo", "IssueDate", "ExpirationDate", "InactivationDate", "ReactivationDate", "PrimaryStatus")])
picks = {"clear": next(r for r in data if r[col["PrimaryStatus"]] == "CLEAR" and r not in expired and not r[col["InactivationDate"]].strip()),
         "expired": expired[0] if expired else None,
         "inactive": inactive[0] if inactive else None,
         "inactive2": inactive[1] if len(inactive) > 1 else None,
         "bondsusp": next((r for r in data if r[col["PrimaryStatus"]] == "Contr Bond Susp"), None),
         "wcsusp": next((r for r in data if r[col["PrimaryStatus"]] == "Work Comp Susp"), None)}
for label, r in picks.items():
    if not r: continue
    n = r[col["LicenseNo"]].strip()
    u = f"https://www.cslb.ca.gov/OnlineServices/CheckLicenseII/LicenseDetail.aspx?LicNum={n}"
    try:
        p = opener.open(u, timeout=60).read().decode("utf-8", "replace")
        t = re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", p))
        k = t.find("License Status")
        print(f"--- {label} {n} file: exp={r[col['ExpirationDate']]} inact={r[col['InactivationDate']]} react={r[col['ReactivationDate']]} prim={r[col['PrimaryStatus']]} sec={r[col['SecondaryStatus']]}")
        print("    cslb page:", t[k:k + 400] if k >= 0 else t[:300])
    except Exception as e:
        print(label, n, "detail page error", e)
STOP = {"INC", "LLC", "CO", "CORP", "CORPORATION", "COMPANY", "THE", "AND", "OF", "DBA", "LP", "LLP", "LTD", "A"}
def toks(name):
    return [t for t in re.findall(r"[A-Z0-9]+", name.upper()) if t not in STOP and len(t) >= 2]
for size in (2, 3):
    shards = Counter()
    for r in data:
        names = {r[col["BusinessName"]], r[col["FullBusinessName"]], r[col["BUS-NAME-2"]]}
        keys = {t[:size] for nm in names if nm for t in toks(nm)}
        for k in keys: shards[k] += 1
    print(f"--- {size}-char keys: {len(shards)} files, biggest {shards.most_common(8)}")
lic = Counter(int(r[col["LicenseNo"]]) // 1000 for r in data if r[col["LicenseNo"]].strip().isdigit())
print("license shards:", len(lic), "max", lic.most_common(3), "min/max license", min(int(r[col["LicenseNo"]]) for r in data), max(int(r[col["LicenseNo"]]) for r in data))
