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

import { mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { gunzipSync, gzipSync } from 'node:zlib';
import { MIN_LICENSES, buildCaData, parseCsv } from '../src/lib/ca-build.ts';

const PORTAL = 'https://www.cslb.ca.gov/OnlineServices/DataPortal/ContractorList';
const USER_AGENT = 'Mozilla/5.0 (compatible; contractorlicenselookup.org; weekly public data download)';
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

/** The portal is an ASP.NET form: load it, choose "License Master", then press "CSV". */
async function downloadMaster() {
  const cookies = new Map();
  const request = async (body, step) => {
    const res = await fetch(PORTAL, {
      method: body ? 'POST' : 'GET',
      body: body ? new URLSearchParams(body) : undefined,
      headers: {
        'User-Agent': USER_AGENT,
        Cookie: [...cookies].map(([k, v]) => `${k}=${v}`).join('; '),
        ...(body ? { 'Content-Type': 'application/x-www-form-urlencoded' } : {}),
      },
      signal: AbortSignal.timeout(10 * 60 * 1000),
    });
    for (const c of res.headers.getSetCookie()) {
      const [pair] = c.split(';');
      const eq = pair.indexOf('=');
      cookies.set(pair.slice(0, eq).trim(), pair.slice(eq + 1).trim());
    }
    if (!res.ok) {
      const retry = res.headers.get('retry-after');
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

  const form = await (await request(undefined, 'open the data portal')).text();
  const chosen = await (await postBack(form, 'ctl00$MainContent$ddlStatus', 'choose License Master')).text();
  const res = await postBack(chosen, 'ctl00$MainContent$lbMasterCSV', 'download the CSV');
  if (!/csv/i.test(res.headers.get('content-type') ?? '')) throw new Error(`expected a CSV, got ${res.headers.get('content-type')}`);
  return Buffer.from(await res.arrayBuffer()).toString('utf8').replace(/^﻿/, '');
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
