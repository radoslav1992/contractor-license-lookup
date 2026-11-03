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
