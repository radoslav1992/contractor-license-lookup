// Turns CSLB's License Master CSV into the small JSON files the California
// search box loads. Pure functions only, so tests can run them on a fixture.

import {
  indexKey,
  keyTokens,
  licenseShard,
  normalizeClass,
  tokens,
  type LicenseRecord,
  type Meta,
  type NameEntry,
  type StatusCode,
} from './ca-search.ts';

/** A word used by more licenses than this is too common to search on by itself. */
export const HEAVY_LIMIT = 2500;

/** CSLB's file holds about 244,000 licenses; far fewer means a broken download. */
export const MIN_LICENSES = 150_000;

const REQUIRED = [
  'LicenseNo', 'BusinessName', 'BUS-NAME-2', 'FullBusinessName', 'City', 'County', 'BusinessType', 'IssueDate',
  'ExpirationDate', 'InactivationDate', 'ReactivationDate', 'PrimaryStatus', 'Classifications(s)',
  'WorkersCompCoverageType', 'WCInsuranceCompany', 'WCExpirationDate', 'WCCancellationDate', 'CBSuretyCompany',
  'CBEffectiveDate', 'CBCancellationDate', 'CBAmount',
] as const;

/** RFC 4180 CSV: quoted fields may hold commas, quotes ("") and line breaks. */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else quoted = false;
      } else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') {
      row.push(field);
      field = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else field += c;
  }
  if (field !== '' || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

/** "05/31/2027" → "2027-05-31"; anything else → undefined. */
export function isoDate(value: string): string | undefined {
  const m = value.trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  return m ? `${m[3]}-${m[1]}-${m[2]}` : undefined;
}

/** "SAN LUIS OBISPO" → "San Luis Obispo". */
export function titleCase(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/(^|[\s\-/.'])([a-z])/g, (_, sep: string, ch: string) => sep + ch.toUpperCase());
}

/**
 * The license's state on the day of the file.
 * - S: CSLB lists a suspension (anything other than CLEAR).
 * - E: the expiration date has passed.
 * - I: inactivated and not reactivated since.
 * - A: none of the above.
 */
export function licenseStatus(row: {
  primary: string;
  expires?: string;
  inactivated?: string;
  reactivated?: string;
  asOf: string;
}): { st: StatusCode; why?: string } {
  const primary = row.primary.trim();
  if (primary && primary.toUpperCase() !== 'CLEAR') {
    return { st: /susp/i.test(primary) ? 'S' : 'X', why: primary };
  }
  if (row.expires && row.expires < row.asOf) return { st: 'E' };
  if (row.inactivated && (!row.reactivated || row.reactivated < row.inactivated)) return { st: 'I' };
  return { st: 'A' };
}

/** Names that add words the main name doesn't already have. */
export function otherNames(main: string, candidates: string[]): string[] {
  const seen = new Set(tokens(main));
  const out: string[] = [];
  for (const name of candidates) {
    const words = tokens(name);
    if (words.length === 0 || words.every((w) => seen.has(w))) continue;
    words.forEach((w) => seen.add(w));
    out.push(name);
  }
  return out;
}

export interface BuildResult {
  /** Path under public/data/ca → JSON value */
  files: Map<string, unknown>;
  meta: Meta;
  stats: { licenses: number; nameFiles: number; licenseFiles: number; biggestNameFile: [string, number] };
}

export function buildCaData(rows: string[][], asOf: string): BuildResult {
  const [header, ...body] = rows;
  const col = new Map(header.map((h, i) => [h.trim(), i]));
  const missing = REQUIRED.filter((name) => !col.has(name));
  if (missing.length) throw new Error(`CSLB file layout changed; missing columns: ${missing.join(', ')}`);
  const get = (r: string[], name: (typeof REQUIRED)[number]) => (r[col.get(name)!] ?? '').trim();

  const records: LicenseRecord[] = [];
  for (const r of body) {
    if (r.length < header.length) continue;
    const n = get(r, 'LicenseNo').replace(/^0+/, '');
    if (!/^\d+$/.test(n)) continue;

    // FullBusinessName is the complete name in natural order ("M TABBERT INC DBA
    // BAYSIDE ELECTRIC", "RANDALL MARK DOCKERY"); BusinessName may be the trading
    // name or "LAST FIRST", and BUS-NAME-2 the legal entity behind a trading name.
    const nm = get(r, 'FullBusinessName') || get(r, 'BusinessName');
    const others = otherNames(nm, [get(r, 'BusinessName'), get(r, 'BUS-NAME-2')]);
    const expires = isoDate(get(r, 'ExpirationDate'));
    const status = licenseStatus({
      primary: get(r, 'PrimaryStatus'),
      expires,
      inactivated: isoDate(get(r, 'InactivationDate')),
      reactivated: isoDate(get(r, 'ReactivationDate')),
      asOf,
    });

    const rec: LicenseRecord = {
      n,
      nm,
      city: titleCase(get(r, 'City')),
      st: status.st,
      cls: get(r, 'Classifications(s)')
        .split('|')
        .map(normalizeClass)
        .filter(Boolean),
    };
    if (others.length) rec.alt = others.join(' · ');
    const county = get(r, 'County');
    if (county) rec.cty = county;
    const type = get(r, 'BusinessType');
    if (type) rec.type = type;
    const issued = isoDate(get(r, 'IssueDate'));
    if (issued) rec.iss = issued;
    if (expires) rec.exp = expires;
    if (status.why) rec.why = status.why;

    const surety = get(r, 'CBSuretyCompany');
    if (surety) {
      rec.bond = { co: surety, amt: Number(get(r, 'CBAmount')) || 0 };
      const eff = isoDate(get(r, 'CBEffectiveDate'));
      const can = isoDate(get(r, 'CBCancellationDate'));
      if (eff) rec.bond.eff = eff;
      if (can) rec.bond.can = can;
    }
    const wcType = get(r, 'WorkersCompCoverageType');
    if (wcType) {
      rec.wc = { t: wcType };
      const co = get(r, 'WCInsuranceCompany');
      const exp = isoDate(get(r, 'WCExpirationDate'));
      const can = isoDate(get(r, 'WCCancellationDate'));
      if (co) rec.wc.co = co;
      if (exp) rec.wc.exp = exp;
      if (can) rec.wc.can = can;
    }
    records.push(rec);
  }

  // Words so common (CONSTRUCTION, ROOFING…) that their index file would be huge.
  const wordCount = new Map<string, number>();
  for (const rec of records) {
    for (const t of new Set(tokens(`${rec.nm} ${rec.alt ?? ''}`))) wordCount.set(t, (wordCount.get(t) ?? 0) + 1);
  }
  const heavy = new Set([...wordCount].filter(([, c]) => c > HEAVY_LIMIT).map(([t]) => t));

  const files = new Map<string, unknown>();
  const byLicense = new Map<string, Record<string, LicenseRecord>>();
  const byName = new Map<string, NameEntry[]>();
  for (const rec of records) {
    const shard = licenseShard(rec.n);
    if (!byLicense.has(shard)) byLicense.set(shard, {});
    byLicense.get(shard)![rec.n] = rec;

    const keys = new Set(keyTokens(`${rec.nm} ${rec.alt ?? ''}`, heavy).map(indexKey));
    const entry: NameEntry = rec.alt ? [rec.n, rec.nm, rec.city, rec.st, rec.alt] : [rec.n, rec.nm, rec.city, rec.st];
    for (const key of keys) {
      if (!byName.has(key)) byName.set(key, []);
      byName.get(key)!.push(entry);
    }
  }
  for (const [shard, recs] of byLicense) files.set(`lic/${shard}.json`, recs);
  let biggest: [string, number] = ['', 0];
  for (const [key, entries] of byName) {
    entries.sort((a, b) => a[1].localeCompare(b[1], 'en'));
    files.set(`name/${key}.json`, entries);
    if (entries.length > biggest[1]) biggest = [key, entries.length];
  }

  const meta: Meta = { asOf, count: records.length, heavy: [...heavy].sort() };
  files.set('meta.json', meta);
  return {
    files,
    meta,
    stats: { licenses: records.length, nameFiles: byName.size, licenseFiles: byLicense.size, biggestNameFile: biggest },
  };
}
