// Temporary: sanity-check the real index against CSLB's own license pages.
import { readdir, readFile, stat } from 'node:fs/promises';
import { classLabel } from '../src/lib/ca-search.ts';

const dir = 'public/data/ca';
const meta = JSON.parse(await readFile(`${dir}/meta.json`, 'utf8'));
console.log('meta:', meta.asOf, meta.count, 'heavy words:', meta.heavy.length, meta.heavy.join(' '));
const recs = [];
for (const f of await readdir(`${dir}/lic`)) Object.values(JSON.parse(await readFile(`${dir}/lic/${f}`, 'utf8'))).forEach((r) => recs.push(r));
const count = (fn) => recs.reduce((m, r) => (m.set(fn(r), (m.get(fn(r)) ?? 0) + 1), m), new Map());
console.log('statuses:', [...count((r) => r.st)]);
console.log('suspension reasons:', [...count((r) => r.why ?? '')].sort((a, b) => b[1] - a[1]).slice(0, 25));
console.log('workers comp types:', [...count((r) => r.wc?.t ?? '')]);
const codes = new Map();
recs.forEach((r) => r.cls.forEach((c) => codes.set(c, (codes.get(c) ?? 0) + 1)));
console.log('codes without a name:', [...codes].filter(([c]) => classLabel(c) === c).sort((a, b) => b[1] - a[1]));
console.log('D codes:', [...codes].filter(([c]) => c.startsWith('D')).length, 'all codes:', codes.size);
console.log('alt-name samples:', recs.filter((r) => r.alt && r.type === 'Corporation').slice(0, 8).map((r) => [r.nm, r.alt]));
console.log('sole-owner alt samples:', recs.filter((r) => r.alt && r.type === 'Sole Owner').slice(0, 4).map((r) => [r.nm, r.alt]));
const sizes = [];
for (const f of await readdir(`${dir}/name`)) sizes.push([f, (await stat(`${dir}/name/${f}`)).size]);
sizes.sort((a, b) => b[1] - a[1]);
console.log('name files:', sizes.length, 'largest (KB):', sizes.slice(0, 12).map(([f, s]) => `${f} ${Math.round(s / 1024)}`).join(', '));
console.log('total name KB:', Math.round(sizes.reduce((a, [, s]) => a + s, 0) / 1024));

const pick = (st, k) => recs.filter((r) => r.st === st).slice(0, k);
for (const r of [...pick('A', 1), ...pick('E', 2), ...pick('I', 3), ...pick('S', 2)]) {
  const url = `https://www.cslb.ca.gov/OnlineServices/CheckLicenseII/LicenseDetail.aspx?LicNum=${r.n}`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; contractorlicenselookup.org data check)' } });
    const text = (await res.text()).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
    const i = text.indexOf('License Status');
    console.log(`${r.st} ${r.n} exp=${r.exp} why=${r.why ?? ''} -> HTTP ${res.status}: ${i >= 0 ? text.slice(i, i + 260) : text.slice(0, 200)}`);
  } catch (e) {
    console.log(r.st, r.n, 'detail page error', e.message);
  }
  await new Promise((s) => setTimeout(s, 1500));
}
