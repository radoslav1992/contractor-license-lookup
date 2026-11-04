#!/usr/bin/env node
// Downloads CSLB's free statewide License Master file and writes the search
// index for /california into public/data/ca/.
//
//   npm run data:ca                 download, then build the index
//   npm run data:ca -- --from FILE  build from a CSV you already have
//
// CSLB's server sometimes drops the connection mid-download, so the script
// retries, keeps the last good download in .cache/cslb/, and falls back to it
// (up to MAX_CACHE_AGE_DAYS old) rather than publish an empty search.

import https from 'node:https';
import { mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { gunzipSync, gzipSync } from 'node:zlib';
import { MIN_LICENSES, buildCaData, parseCsv } from '../src/lib/ca-build.ts';

const PORTAL = 'https://www.cslb.ca.gov/OnlineServices/DataPortal/ContractorList';
const USER_AGENT = 'Mozilla/5.0 (compatible; contractorlicenselookup.org)';
const CACHE_DIR = '.cache/cslb';
const CACHE_FILE = join(CACHE_DIR, 'MasterLicenseData.csv.gz');
const CACHE_DATE = join(CACHE_DIR, 'downloaded.txt');
const OUT_DIR = 'public/data/ca';
const MAX_CACHE_AGE_DAYS = 21;
const ATTEMPTS = 4;
/** Cloudflare's free plan serves at most 20,000 files per site. */
const MAX_FILES = 18_000;

const today = () => new Date().toISOString().slice(0, 10);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * A plain HTTPS request. CSLB's firewall turns away Node's built-in fetch
 * (which adds browser-style headers) with a 503, so send only what we set.
 */
function httpsRequest(url, { method = 'GET', headers = {}, body } = {}) {
  return new Promise((resolve, reject) => {
    const req = https.request(new URL(url), { method, headers, timeout: 10 * 60 * 1000 }, async (res) => {
      try {
        const chunks = [];
        // Rejects if the server closes the connection before the end.
        for await (const chunk of res) chunks.push(chunk);
        resolve({ status: res.statusCode ?? 0, statusText: res.statusMessage ?? '', headers: res.headers, body: Buffer.concat(chunks) });
      } catch (err) {
        reject(new Error(`connection dropped: ${err.message}`));
      }
    });
    req.on('timeout', () => req.destroy(new Error('timed out')));
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

/** The portal is an ASP.NET form: load it, choose "License Master", then press "CSV". */
async function downloadMaster() {
  const cookies = new Map();
  const request = async (form, step, url = PORTAL, hops = 0) => {
    const body = form ? new URLSearchParams(form).toString() : undefined;
    const headers = { 'User-Agent': USER_AGENT, Accept: '*/*' };
    if (cookies.size) headers.Cookie = [...cookies].map(([k, v]) => `${k}=${v}`).join('; ');
    if (body) {
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
      headers['Content-Length'] = Buffer.byteLength(body);
    }
    const res = await httpsRequest(url, { method: body ? 'POST' : 'GET', headers, body });
    for (const c of [res.headers['set-cookie'] ?? []].flat()) {
      const [pair] = c.split(';');
      const eq = pair.indexOf('=');
      cookies.set(pair.slice(0, eq).trim(), pair.slice(eq + 1).trim());
    }
    // The CSV button answers with a redirect to the file itself.
    if ([301, 302, 303, 307].includes(res.status) && res.headers.location && hops < 3) {
      const next = new URL(res.headers.location, url).href;
      console.log(`CSLB redirected "${step}" to ${next}`);
      return request(undefined, step, next, hops + 1);
    }
    if (res.status !== 200) {
      const retry = res.headers['retry-after'];
      throw new Error(`CSLB answered ${res.status} ${res.statusText} at step "${step}"${retry ? ` (retry after ${retry})` : ''}`);
    }
    return res;
  };
  const hidden = (html) => {
    const fields = {};
    for (const m of html.matchAll(/<input type="hidden" name="([^"]+)" id="[^"]*" value="([^"]*)"/g)) {
      fields[m[1]] = m[2].replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
    }
    return fields;
  };
  const postBack = (html, target, step) =>
    request({ ...hidden(html), __EVENTTARGET: target, __EVENTARGUMENT: '', ctl00$MainContent$ddlStatus: 'M' }, step);

  const form = (await request(undefined, 'open the data portal')).body.toString('utf8');
  const chosen = (await postBack(form, 'ctl00$MainContent$ddlStatus', 'choose License Master')).body.toString('utf8');
  const res = await postBack(chosen, 'ctl00$MainContent$lbMasterCSV', 'download the CSV');
  // Judge the file by its content: CSLB sometimes leaves out the content type,
  // and sometimes answers with an empty body or an HTML page.
  const text = res.body.toString('utf8').replace(/^\uFEFF/, '');
  if (!text.startsWith('LicenseNo,')) {
    const type = String(res.headers['content-type'] ?? 'no content type');
    const start = text.slice(0, 80).replace(/\s+/g, ' ');
    throw new Error(`expected the License Master CSV, got ${res.body.length} bytes of ${type}${start ? `: "${start}"` : ''}`);
  }
  return text;
}

function check(rows) {
  const licenses = rows.length - 1;
  if (licenses < MIN_LICENSES) throw new Error(`only ${licenses} licenses in the file; expected at least ${MIN_LICENSES}`);
  return rows;
}

async function freshOrCached() {
  let lastError;
  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    try {
      const text = await downloadMaster();
      const rows = check(parseCsv(text));
      await mkdir(CACHE_DIR, { recursive: true });
      await writeFile(CACHE_FILE, gzipSync(text));
      await writeFile(CACHE_DATE, today());
      console.log(`Downloaded ${rows.length - 1} licenses from CSLB.`);
      return { rows, asOf: today() };
    } catch (err) {
      lastError = err;
      console.warn(`Download attempt ${attempt} of ${ATTEMPTS} failed: ${err.message}`);
      if (attempt < ATTEMPTS) await sleep(60_000 * attempt);
    }
  }
  const cachedOn = await readFile(CACHE_DATE, 'utf8').then((s) => s.trim(), () => null);
  if (!cachedOn) throw new Error(`could not download the CSLB file and there is no earlier copy: ${lastError?.message}`);
  const ageDays = (Date.parse(today()) - Date.parse(cachedOn)) / 86_400_000;
  if (ageDays > MAX_CACHE_AGE_DAYS) {
    throw new Error(`could not download the CSLB file, and the last copy (${cachedOn}) is ${ageDays} days old`);
  }
  console.warn(`::warning::Using the CSLB file downloaded on ${cachedOn}; today's download failed.`);
  return { rows: check(parseCsv(gunzipSync(await readFile(CACHE_FILE)).toString('utf8'))), asOf: cachedOn };
}

async function main() {
  const fromIndex = process.argv.indexOf('--from');
  const { rows, asOf } =
    fromIndex > -1
      ? { rows: parseCsv((await readFile(process.argv[fromIndex + 1], 'utf8')).replace(/^﻿/, '')), asOf: today() }
      : await freshOrCached();

  const { files, stats } = buildCaData(rows, asOf);
  if (files.size > MAX_FILES) throw new Error(`${files.size} files is too many for Cloudflare; widen the index keys`);

  await rm(OUT_DIR, { recursive: true, force: true });
  for (const [path, value] of files) {
    const target = join(OUT_DIR, path);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, JSON.stringify(value));
  }
  const size = await stat(join(OUT_DIR, `name/${stats.biggestNameFile[0]}.json`)).then((s) => s.size, () => 0);
  console.log(
    `Wrote ${files.size} files to ${OUT_DIR} for ${stats.licenses} licenses (as of ${asOf}): ` +
      `${stats.licenseFiles} license files, ${stats.nameFiles} name files; ` +
      `largest name file "${stats.biggestNameFile[0]}" has ${stats.biggestNameFile[1]} entries (${Math.round(size / 1024)} KB).`,
  );
}

main().catch((err) => {
  console.error(`California data: ${err.message}`);
  process.exit(1);
});
