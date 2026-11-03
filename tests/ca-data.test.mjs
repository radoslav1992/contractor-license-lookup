import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildCaData, isoDate, licenseStatus, parseCsv, titleCase } from '../src/lib/ca-build.ts';
import { classLabel, licenseQuery, matchesQuery, normalizeClass, queryKey } from '../src/lib/ca-search.ts';

// Column layout of CSLB's MasterLicenseData.csv (November 2026). The rows are made up.
const HEADER = [
  'LicenseNo', 'LastUpdate', 'BusinessName', 'BUS-NAME-2', 'FullBusinessName', 'MailingAddress', 'City', 'State',
  'County', 'ZIPCode', 'country', 'BusinessPhone', 'BusinessType', 'IssueDate', 'ReissueDate', 'ExpirationDate',
  'InactivationDate', 'ReactivationDate', 'PendingSuspension', 'PendingClassRemoval', 'PendingClassReplace',
  'PrimaryStatus', 'SecondaryStatus', 'Classifications(s)', 'AsbestosReg', 'WorkersCompCoverageType',
  'WCInsuranceCompany', 'WCPolicyNumber', 'WCEffectiveDate', 'WCExpirationDate', 'WCCancellationDate', 'WCSuspendDate',
  'CBSuretyCompany', 'CBNumber', 'CBEffectiveDate', 'CBCancellationDate', 'CBAmount', 'WBSuretyCompany', 'WBNumber',
  'WBEffectiveDate', 'WBCancellationDate', 'WBAmount', 'DBSuretyCompany', 'DBNumber', 'DBEffectiveDate',
  'DBCancellationDate', 'DBAmount', 'DateRequired', 'DiscpCaseRegion', 'DBBondReason', 'DBCaseNo', 'NAME-TP-2',
];

function row(values) {
  return HEADER.map((h) => (h in values ? values[h] : ''));
}

const BASE = {
  LastUpdate: '10/01/2026', MailingAddress: '1 EXAMPLE ST', State: 'CA', ZIPCode: '90000', BusinessPhone: '5550100',
  IssueDate: '01/15/2010', ExpirationDate: '01/31/2028', PrimaryStatus: 'CLEAR', BusinessType: 'Corporation',
  WorkersCompCoverageType: 'Exempt', CBSuretyCompany: 'EXAMPLE SURETY CO', CBAmount: '25000', CBEffectiveDate: '01/01/2025',
};

const ROWS = [
  HEADER,
  row({ ...BASE, LicenseNo: '1000001', BusinessName: 'SUNNY SLOPE ROOFING INC', City: 'SAN LUIS OBISPO', County: 'San Luis Obispo', 'Classifications(s)': 'C39' }),
  row({ ...BASE, LicenseNo: '1000002', BusinessName: 'QUARTZ VALLEY BUILDERS', City: 'FRESNO', County: 'Fresno', 'Classifications(s)': 'B| C10', ExpirationDate: '06/30/2026' }),
  row({ ...BASE, LicenseNo: '1000003', BusinessName: 'ZEPHYR ELECTRIC', City: 'OAKLAND', County: 'Alameda', 'Classifications(s)': 'C-7| C10', PrimaryStatus: 'Contr Bond Susp' }),
  row({ ...BASE, LicenseNo: '0999004', BusinessName: 'KESTREL PLUMBING, "THE BEST"', City: 'CHICO', County: 'Butte', 'Classifications(s)': 'C36', InactivationDate: '03/01/2026' }),
  row({ ...BASE, LicenseNo: '1001006', BusinessName: 'BAYVIEW ELECTRIC', FullBusinessName: 'M EXAMPLE INC DBA BAYVIEW ELECTRIC', 'BUS-NAME-2': 'M EXAMPLE INC', City: 'NAPA', County: 'Napa', 'Classifications(s)': 'C10' }),
  row({ ...BASE, LicenseNo: '1001007', BusinessName: 'SAMPLE JOHN PAUL', FullBusinessName: 'JOHN PAUL SAMPLE', City: 'NAPA', County: 'Napa', BusinessType: 'Sole Owner', 'Classifications(s)': 'C33' }),
  row({
    ...BASE, LicenseNo: '1001005', BusinessName: 'JANE Q SAMPLE', FullBusinessName: 'SAMPLE HOME REPAIR', City: 'DAVIS',
    County: 'Yolo', BusinessType: 'Sole Owner', 'Classifications(s)': 'B', WorkersCompCoverageType: "Workers' Compensation Insurance",
    WCInsuranceCompany: 'EXAMPLE MUTUAL', WCExpirationDate: ' 07/01/2027',
  }),
];

const csv = ROWS.map((r) => r.map((v) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v)).join(',')).join('\r\n');

test('parseCsv handles quotes, commas and CRLF', () => {
  const rows = parseCsv(csv);
  assert.equal(rows.length, ROWS.length);
  assert.equal(rows[4][2], 'KESTREL PLUMBING, "THE BEST"');
  assert.deepEqual(parseCsv('a,"b\nc",d\r\n1,2,3'), [['a', 'b\nc', 'd'], ['1', '2', '3']]);
});

test('dates, cities and classifications are normalised', () => {
  assert.equal(isoDate('05/31/2027'), '2027-05-31');
  assert.equal(isoDate(' 07/01/2027'), '2027-07-01');
  assert.equal(isoDate(''), undefined);
  assert.equal(titleCase('SAN LUIS OBISPO'), 'San Luis Obispo');
  assert.equal(normalizeClass('C10'), 'C-10');
  assert.equal(normalizeClass(' C-7'), 'C-7');
  assert.equal(normalizeClass('B'), 'B');
  assert.equal(classLabel('C-39'), 'C-39 Roofing');
  assert.equal(classLabel('ZZ-1'), 'ZZ-1');
});

test('status: suspended, expired, inactive and active', () => {
  const asOf = '2026-11-03';
  assert.deepEqual(licenseStatus({ primary: 'Contr Bond Susp', asOf }), { st: 'S', why: 'Contr Bond Susp' });
  assert.deepEqual(licenseStatus({ primary: 'CLEAR', expires: '2026-06-30', asOf }), { st: 'E' });
  assert.deepEqual(licenseStatus({ primary: 'CLEAR', expires: '2028-01-31', inactivated: '2026-03-01', asOf }), { st: 'I' });
  assert.deepEqual(
    licenseStatus({ primary: 'CLEAR', expires: '2028-01-31', inactivated: '2025-03-01', reactivated: '2025-09-01', asOf }),
    { st: 'A' },
  );
  assert.deepEqual(licenseStatus({ primary: 'CLEAR', expires: '2028-01-31', asOf }), { st: 'A' });
});

test('buildCaData writes license and name files without addresses or phone numbers', () => {
  const { files, meta, stats } = buildCaData(parseCsv(csv), '2026-11-03');
  assert.equal(stats.licenses, 7);
  assert.equal(meta.count, 7);

  const shard = files.get('lic/1000.json');
  assert.deepEqual(Object.keys(shard).sort(), ['1000001', '1000002', '1000003']);
  const roofer = shard['1000001'];
  assert.equal(roofer.city, 'San Luis Obispo');
  assert.deepEqual(roofer.cls, ['C-39']);
  assert.equal(roofer.st, 'A');
  assert.deepEqual(roofer.bond, { co: 'EXAMPLE SURETY CO', amt: 25000, eff: '2025-01-01' });

  // Leading zeros are dropped, so "0999004" is found as 999004.
  assert.equal(files.get('lic/999.json')['999004'].st, 'I');
  assert.equal(files.get('lic/999.json')['999004'].inact, '2026-03-01');
  assert.equal(files.get('lic/1000.json')['1000002'].st, 'E');
  assert.equal(files.get('lic/1000.json')['1000003'].why, 'Contr Bond Susp');

  const sole = files.get('lic/1001.json')['1001005'];
  assert.equal(sole.nm, 'SAMPLE HOME REPAIR');
  assert.equal(sole.alt, 'JANE Q SAMPLE');
  // The full name is shown; names that only repeat its words are dropped.
  assert.equal(files.get('lic/1001.json')['1001006'].nm, 'M EXAMPLE INC DBA BAYVIEW ELECTRIC');
  assert.equal(files.get('lic/1001.json')['1001006'].alt, undefined);
  assert.equal(files.get('lic/1001.json')['1001007'].nm, 'JOHN PAUL SAMPLE');
  assert.equal(files.get('lic/1001.json')['1001007'].alt, undefined);
  assert.deepEqual(sole.wc, { t: "Workers' Compensation Insurance", co: 'EXAMPLE MUTUAL', exp: '2027-07-01' });

  const everything = JSON.stringify([...files.values()]);
  assert.ok(!everything.includes('EXAMPLE ST'), 'no street addresses');
  assert.ok(!everything.includes('5550100'), 'no phone numbers');
  assert.ok(!everything.includes('90000'), 'no ZIP codes');

  // A name is found by any of its specific words, including its other name.
  assert.ok(files.get('name/sun.json').some((e) => e[0] === '1000001'));
  assert.ok(files.get('name/roo.json').some((e) => e[0] === '1000001'));
  assert.ok(files.get('name/hom.json').some((e) => e[0] === '1001005'));
  assert.ok(!files.has('name/inc.json'), 'stop words are not index keys');
});

test('a layout change fails loudly', () => {
  const broken = parseCsv(csv).map((r) => r.slice(1));
  assert.throws(() => buildCaData(broken, '2026-11-03'), /layout changed/);
});

test('queries: license numbers, index keys and matching', () => {
  const heavy = new Set(['CONSTRUCTION', 'ROOFING']);
  assert.equal(licenseQuery('#1000001'), '1000001');
  assert.equal(licenseQuery(' 0999004 '), '999004');
  assert.equal(licenseQuery('kestrel'), null);
  assert.equal(queryKey('sunny slope roofing', heavy), 'sun');
  assert.equal(queryKey('kestrel construction', heavy), 'kes');
  assert.equal(queryKey('construction inc', heavy), null);
  assert.equal(queryKey('contractors inc', heavy), null);
  assert.ok(matchesQuery('SUNNY SLOPE ROOFING INC', 'sunny roof'));
  assert.ok(!matchesQuery('SUNNY SLOPE ROOFING INC', 'sunny plumbing'));
});
