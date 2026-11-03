"""Temporary: download CSLB's statewide License Master CSV and describe it."""
import csv, html, http.cookiejar, io, re, sys, urllib.parse, urllib.request

URL = "https://www.cslb.ca.gov/OnlineServices/DataPortal/ContractorList"
UA = "Mozilla/5.0 (compatible; contractorlicenselookup.org data check)"
jar = http.cookiejar.CookieJar()
opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(jar))
opener.addheaders = [("User-Agent", UA)]

page = opener.open(URL, timeout=60).read().decode("utf-8", "replace")
start = page.find("Statewide Public Database Files")
print("--- form around the download links")
print(re.sub(r"\s+", " ", page[start - 3000:start + 2500]))
print("--- status/format options")
for m in re.finditer(r'<option[^>]*value="([^"]*)"[^>]*>([^<]*)</option>', page):
    print(m.group(1), "|", m.group(2))

fields = dict(re.findall(r'<input type="hidden" name="([^"]+)" id="[^"]*" value="([^"]*)"', page))
targets = re.findall(r"__doPostBack\(&#39;([^&]+)&#39;", page)
print("--- postback targets:", sorted(set(targets)))
master = next((t for t in targets if "aster" in t), None)
select = re.search(r'<select name="([^"]+)"', page)
options = re.findall(r'<option[^>]*value="([^"]*)"', page)
for fmt in [o for o in options if "csv" in o.lower()] or options[:1]:
    data = {k: html.unescape(v) for k, v in fields.items()}
    data["__EVENTTARGET"] = master or ""
    data["__EVENTARGUMENT"] = ""
    if select:
        data[select.group(1)] = fmt
    req = urllib.request.Request(URL, data=urllib.parse.urlencode(data).encode(), headers={"User-Agent": UA})
    resp = opener.open(req, timeout=300)
    body = resp.read()
    print("--- download with", fmt, "->", resp.status, resp.headers.get("Content-Type"), resp.headers.get("Content-Disposition"), len(body), "bytes")
    if body[:2] == b"PK":
        import zipfile
        z = zipfile.ZipFile(io.BytesIO(body))
        print("zip contents:", [(i.filename, i.file_size) for i in z.infolist()])
        body = z.read(z.infolist()[0])
    text = body.decode("utf-8-sig", "replace")
    if text.lstrip().startswith("<"):
        print(re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", text))[:1500])
        continue
    rows = list(csv.reader(io.StringIO(text)))
    print("rows:", len(rows))
    print("header:", rows[0])
    for r in rows[1:3]:
        print("sample:", [c[:25] for c in r])
    status_col = next((i for i, h in enumerate(rows[0]) if "status" in h.lower()), None)
    if status_col is not None:
        from collections import Counter
        print("status counts:", Counter(r[status_col] for r in rows[1:] if len(r) > status_col).most_common(15))
