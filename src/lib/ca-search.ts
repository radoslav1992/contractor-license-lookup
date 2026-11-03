// Shared by the California data build (scripts/ca-data.mjs) and the search box
// on /california. Keep it free of Node- and browser-only APIs.

/** Words that say nothing about which business it is. Never used as index keys. */
export const STOP_WORDS = new Set([
  'A', 'AN', 'AND', 'THE', 'OF', 'DBA', 'INC', 'LLC', 'LP', 'LLP', 'LTD', 'CO', 'CORP', 'CORPORATION', 'COMPANY',
]);

/** Status letters used in the published files. */
export type StatusCode = 'A' | 'E' | 'I' | 'S' | 'X';

/** One row of a name-index file: license number, name, city, status, other names. */
export type NameEntry = [string, string, string, StatusCode, string?];

export interface Bond {
  /** Surety company */
  co: string;
  /** Amount in dollars */
  amt: number;
  /** Effective date, YYYY-MM-DD */
  eff?: string;
  /** Cancellation date, YYYY-MM-DD */
  can?: string;
}

export interface WorkersComp {
  /** Coverage type as CSLB lists it */
  t: string;
  /** Insurance company */
  co?: string;
  /** Policy expiration date, YYYY-MM-DD */
  exp?: string;
  /** Cancellation date, YYYY-MM-DD */
  can?: string;
}

/** One license, as published in the license-number files. */
export interface LicenseRecord {
  n: string;
  nm: string;
  alt?: string;
  city: string;
  cty?: string;
  type?: string;
  iss?: string;
  exp?: string;
  st: StatusCode;
  /** CSLB's own status text when the license is suspended or unusual */
  why?: string;
  cls: string[];
  bond?: Bond;
  wc?: WorkersComp;
}

export interface Meta {
  /** Date the file was downloaded from CSLB, YYYY-MM-DD */
  asOf: string;
  count: number;
  /** Words too common to search on by themselves */
  heavy: string[];
}

/** Upper-case letter and number runs: "Bob's Roofing, Inc." → BOB, S, ROOFING, INC. */
export function tokens(text: string): string[] {
  return text.toUpperCase().match(/[A-Z0-9]+/g) ?? [];
}

/** The index file a word belongs to: its first three characters. */
export function indexKey(token: string): string {
  return token.slice(0, 3).toLowerCase();
}

/** Words of a name that get an index entry. */
export function keyTokens(name: string, heavy: ReadonlySet<string>): string[] {
  return tokens(name).filter((t) => t.length >= 3 && !STOP_WORDS.has(t) && !heavy.has(t));
}

/** A query of digits only is a license number. */
export function licenseQuery(query: string): string | null {
  const digits = query.replace(/[\s#-]/g, '');
  return /^\d{1,8}$/.test(digits) ? String(Number(digits)) : null;
}

/** The license-number file a license lives in. */
export function licenseShard(license: string | number): string {
  return String(Math.floor(Number(license) / 1000));
}

/** Which index file to load for a name query, or null if no word is specific enough. */
export function queryKey(query: string, heavy: ReadonlySet<string>): string | null {
  const usable = keyTokens(query, heavy);
  if (usable.length === 0) return null;
  // The longest word narrows the results the most.
  const best = usable.reduce((a, b) => (b.length > a.length ? b : a));
  return indexKey(best);
}

/** Every word of the query starts some word of the name. */
export function matchesQuery(name: string, query: string): boolean {
  const nameTokens = tokens(name);
  return tokens(query).every((q) => nameTokens.some((t) => t.startsWith(q)));
}

/** "C10" or "C-10" → "C-10"; "B2" → "B-2"; "A" and "B" stay as they are. */
export function normalizeClass(code: string): string {
  const c = code.trim().toUpperCase().replace(/\s+/g, '');
  const m = c.match(/^([A-Z]+)-?(\d+)$/);
  return m ? `${m[1]}-${m[2]}` : c;
}

const CLASS_NAMES: Record<string, string> = {
  A: 'General Engineering',
  B: 'General Building',
  'B-2': 'Residential Remodeling',
  'C-2': 'Insulation and Acoustical',
  'C-4': 'Boiler, Hot Water Heating and Steam Fitting',
  'C-5': 'Framing and Rough Carpentry',
  'C-6': 'Cabinet, Millwork and Finish Carpentry',
  'C-7': 'Low Voltage Systems',
  'C-8': 'Concrete',
  'C-9': 'Drywall',
  'C-10': 'Electrical',
  'C-11': 'Elevator',
  'C-12': 'Earthwork and Paving',
  'C-13': 'Fencing',
  'C-15': 'Flooring and Floor Covering',
  'C-16': 'Fire Protection',
  'C-17': 'Glazing',
  'C-20': 'Warm-Air Heating, Ventilating and Air-Conditioning',
  'C-21': 'Building Moving/Demolition',
  'C-22': 'Asbestos Abatement',
  'C-23': 'Ornamental Metal',
  'C-27': 'Landscaping',
  'C-28': 'Lock and Security Equipment',
  'C-29': 'Masonry',
  'C-31': 'Construction Zone Traffic Control',
  'C-32': 'Parking and Highway Improvement',
  'C-33': 'Painting and Decorating',
  'C-34': 'Pipeline',
  'C-35': 'Lathing and Plastering',
  'C-36': 'Plumbing',
  'C-38': 'Refrigeration',
  'C-39': 'Roofing',
  'C-42': 'Sanitation System',
  'C-43': 'Sheet Metal',
  'C-45': 'Sign',
  'C-46': 'Solar',
  'C-47': 'General Manufactured Housing',
  'C-49': 'Tree and Palm',
  'C-50': 'Reinforcing Steel',
  'C-51': 'Structural Steel',
  'C-53': 'Swimming Pool',
  'C-54': 'Ceramic and Mosaic Tile',
  'C-55': 'Water Conditioning',
  'C-57': 'Well Drilling',
  'C-60': 'Welding',
  'C-61': 'Limited Specialty',
  ASB: 'Asbestos Certification',
  HAZ: 'Hazardous Substance Removal Certification',
};

/** "C-10 Electrical"; codes without a known name are shown as they are. */
export function classLabel(code: string): string {
  const name = CLASS_NAMES[code] ?? (/^D-\d+$/.test(code) ? 'Limited Specialty' : undefined);
  return name ? `${code} ${name}` : code;
}

/** Link to the license on CSLB's own Instant License Check. */
export function cslbLicenseUrl(license: string): string {
  return `https://www.cslb.ca.gov/OnlineServices/CheckLicenseII/LicenseDetail.aspx?LicNum=${encodeURIComponent(license)}`;
}
