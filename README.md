# contractorlicenselookup.org

An independent guide to checking a contractor’s license with the official board in each US state.

Astro static site, served by Cloudflare Workers static assets.

```sh
npm install
npm run dev      # http://localhost:4321
npm test         # checks the state data and the California index builder (Node 22.18+)
npm run data:ca  # downloads CSLB's license file and builds the California search index
npm run build    # static site in dist/
```

## Adding or updating a state

State guides live in `src/data/states.ts`; each one gets a page at `/<slug>`.

- Check every fact against the licensing board’s own website or the state’s
  statutes, and list those pages in `sources`.
- Set `lastChecked` to the date you checked. `npm test` fails once a guide is
  more than about a year old, so out-of-date guides can’t go unnoticed.
- Add a state only when it has been checked this way. A missing state is
  better than a wrong one.

## California license search

`/california` has a search box over the Contractors State License Board's
free statewide License Master file
([CSLB Data Portal](https://www.cslb.ca.gov/OnlineServices/DataPortal/ContractorList)).

- `scripts/ca-data.mjs` downloads the CSV (about 78 MB, 244,000 licenses),
  and `src/lib/ca-build.ts` turns it into small JSON files in
  `public/data/ca/`: `lic/<n>.json` holds 1,000 license numbers each, and
  `name/<abc>.json` lists every license with a name word starting with those
  three letters. Words used by more than 2,500 licenses (CONSTRUCTION,
  ROOFING…) are not index keys, so no file gets too big.
- Published fields: license number, business name, city, county, business
  type, dates, status, classifications, contractor's bond and workers' comp.
  Street addresses, ZIP codes and phone numbers are left out on purpose:
  for sole owners these are often home details.
- CSLB's server sometimes drops the connection or answers 503. The script
  retries four times, then falls back to the last good download in
  `.cache/cslb/` if it is at most 21 days old. Otherwise it fails, so a
  broken download never replaces the live data with an empty search.
- `public/data/` and `.cache/` are not committed. Without the data, the page
  still builds and the search box points people to CSLB instead.
- To try it locally from a CSV you already have:
  `npm run data:ca -- --from MasterLicenseData.csv`.

## Deploying

`.github/workflows/deploy.yml` tests, downloads the California data, builds
and deploys with Wrangler on every push to `main`, every Monday and Thursday,
and on demand (Actions → Deploy → Run workflow). Pull requests run
`ci.yml` (tests and build only).

One-time setup:

1. Cloudflare → My Profile → API Tokens → Create Token → **Edit Cloudflare
   Workers** template, limited to your account. Copy the token.
2. GitHub → this repository → Settings → Secrets and variables → Actions →
   New repository secret: `CLOUDFLARE_API_TOKEN`.
3. Cloudflare → Workers → contractor-license-lookup → Settings → Builds →
   **Disconnect**. Cloudflare's own builds don't download the California
   data, so if they kept running they would deploy a site without it.

The Worker keeps its custom domain, `contractorlicenselookup.org`. GitHub
pauses scheduled workflows in public repositories after 60 days without a
commit; if that happens, re-enable the workflow under Actions → Deploy.
