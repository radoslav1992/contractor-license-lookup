import { test } from 'node:test';
import assert from 'node:assert/strict';
import { STATES, stateBySlug } from '../src/data/states.ts';

const DAY = 24 * 60 * 60 * 1000;
// A guide must be re-checked against its sources at least this often.
const MAX_AGE_DAYS = 400;

test('every state has a unique slug and code', () => {
  const slugs = STATES.map((s) => s.slug);
  const codes = STATES.map((s) => s.code);
  assert.equal(new Set(slugs).size, slugs.length);
  assert.equal(new Set(codes).size, codes.length);
  for (const s of STATES) {
    assert.match(s.slug, /^[a-z]+(-[a-z]+)*$/, s.slug);
    assert.match(s.code, /^[A-Z]{2}$/, s.code);
    assert.equal(stateBySlug(s.slug), s);
  }
});

test('all 50 states and DC are covered', () => {
  // The home page says so; this keeps that claim true.
  assert.equal(STATES.length, 51);
});

test('every guide is complete', () => {
  for (const s of STATES) {
    assert.ok(s.summary.length > 80, `${s.slug}: summary`);
    // One line on the state list, and short enough for a search-result description.
    assert.ok(s.short.length >= 40 && s.short.length <= 100 && s.short.endsWith('.'), `${s.slug}: short`);
    assert.ok(s.boards.length > 0, `${s.slug}: boards`);
    assert.ok(s.whenRequired.length > 0, `${s.slug}: whenRequired`);
    assert.ok(s.howToCheck.length >= 3, `${s.slug}: howToCheck`);
    assert.ok(s.faq.length >= 2, `${s.slug}: faq`);
    assert.ok(s.sources.length >= 2, `${s.slug}: sources`);
    assert.ok(['state', 'state-and-local', 'local-only'].includes(s.generalContractors), `${s.slug}: generalContractors`);
    for (const f of s.faq) assert.ok(f.q.endsWith('?') && f.a.length > 20, `${s.slug}: faq "${f.q}"`);
  }
});

test('every link is an absolute https URL', () => {
  for (const s of STATES) {
    const urls = [
      ...s.boards.flatMap((b) => [b.lookupUrl, b.website]),
      ...s.sources.map((x) => x.url),
    ];
    for (const u of urls) {
      const parsed = new URL(u);
      assert.equal(parsed.protocol, 'https:', `${s.slug}: ${u}`);
    }
  }
});

test('no guide goes more than a year without being re-checked', () => {
  for (const s of STATES) {
    assert.match(s.lastChecked, /^\d{4}-\d{2}-\d{2}$/, s.slug);
    const checked = Date.parse(`${s.lastChecked}T00:00:00Z`);
    assert.ok(checked <= Date.now() + DAY, `${s.slug}: lastChecked is in the future`);
    const age = (Date.now() - checked) / DAY;
    assert.ok(age <= MAX_AGE_DAYS, `${s.slug}: last checked ${Math.round(age)} days ago; re-check its sources`);
  }
});

test('"a" or "an" matches the state name', async () => {
  const { article } = await import('../src/data/states.ts');
  assert.equal(article('Illinois'), 'an');
  assert.equal(article('Ohio'), 'an');
  assert.equal(article('Utah'), 'a');
  assert.equal(article('Texas'), 'a');
});
