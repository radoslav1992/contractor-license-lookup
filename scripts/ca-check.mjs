// Temporary: sanity-check the real index against CSLB's own license pages.
import { readdir, readFile, stat } from 'node:fs/promises';
import { tokens } from '../src/lib/ca-search.ts';

const dir = 'public/data/ca';
const meta = JSON.parse(await readFile(`${dir}/meta.json`, 'utf8'));
const recs = [];
for (const f of await readdir(`${dir}/lic`)) Object.values(JSON.parse(await readFile(`${dir}/lic/${f}`, 'utf8'))).forEach((r) => recs.push(r));
console.log('licenses:', recs.length, 'statuses:', JSON.stringify([...recs.reduce((m, r) => m.set(r.st, (m.get(r.st) ?? 0) + 1), new Map())]));
const exps = recs.map((r) => r.exp).filter(Boolean).sort();
console.log('expiration range:', exps[0], '…', exps.at(-1), 'past:', exps.filter((e) => e < meta.asOf).length);
const freq = new Map();
for (const r of recs) for (const t of new Set(tokens(`${r.nm} ${r.alt ?? ''}`))) freq.set(t, (freq.get(t) ?? 0) + 1);
const top = [...freq].filter(([t]) => t.length >= 3).sort((a, b) => b[1] - a[1]);
console.log('words 1000-2500:', top.filter(([, c]) => c <= 2500 && c > 1000).map(([t, c]) => `${t} ${c}`).join(', '));
console.log('CON words:', top.filter(([t, c]) => t.startsWith('CON') && c <= 2500).slice(0, 12).map(([t, c]) => `${t} ${c}`).join(', '));
console.log('name samples:', JSON.stringify(recs.filter((r) => r.alt).slice(0, 6).map((r) => [r.type, r.nm, r.alt])));
const sizes = [];
for (const f of await readdir(`${dir}/name`)) sizes.push([f, (await stat(`${dir}/name/${f}`)).size]);
sizes.sort((a, b) => b[1] - a[1]);
console.log('largest name files (KB):', sizes.slice(0, 6).map(([f, s]) => `${f} ${Math.round(s / 1024)}`).join(', '));

const ua = { 'User-Agent': 'Mozilla/5.0 (compatible; contractorlicenselookup.org)', Accept: '*/*' };
const inactive = recs.filter((r) => r.st === 'I').slice(0, 3);
const active = recs.filter((r) => r.st === 'A').slice(100, 101);
for (const r of [...active, ...inactive]) {
  const { default: https } = await import('node:https');
  const url = `https://www.cslb.ca.gov/OnlineServices/CheckLicenseII/LicenseDetail.aspx?LicNum=${r.n}`;
  const html = await new Promise((res) =>
    https.get(url, { headers: ua }, async (resp) => {
      const c = [];
      for await (const x of resp) c.push(x);
      res(`HTTP ${resp.statusCode} ` + Buffer.concat(c).toString('utf8'));
    }).on('error', (e) => res(`error ${e.message}`)),
  );
  const text = html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const hits = [...text.matchAll(/(this license|license status|inactive|suspend|expired|current and active)/gi)].slice(0, 4).map((m) => text.slice(Math.max(0, m.index - 60), m.index + 160));
  console.log(`--- ${r.st} ${r.n} "${r.nm}" ${text.slice(0, 12)} hits:`, JSON.stringify(hits));
  await new Promise((s) => setTimeout(s, 2000));
}
