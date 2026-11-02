# contractorlicenselookup.org

An independent guide to checking a contractor’s license with the official board in each US state.

Astro static site, served by Cloudflare Workers static assets.

```sh
npm install
npm run dev      # http://localhost:4321
npm test         # checks the state data (Node 22.18+)
npm run build    # static site in dist/
npm run deploy   # build + wrangler deploy
```

## Adding or updating a state

State guides live in `src/data/states.ts`; each one gets a page at `/<slug>`.

- Check every fact against the licensing board’s own website or the state’s
  statutes, and list those pages in `sources`.
- Set `lastChecked` to the date you checked. `npm test` fails once a guide is
  more than about a year old, so out-of-date guides can’t go unnoticed.
- Add a state only when it has been checked this way. A missing state is
  better than a wrong one.

## Deploying

In Cloudflare → Workers → Create → connect this repository:

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |

Then add `contractorlicenselookup.org` as a custom domain on the Worker.
