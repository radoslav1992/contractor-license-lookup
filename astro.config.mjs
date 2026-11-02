import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://contractorlicenselookup.org',
  // One URL per page: /california, never /california/. Pages are emitted as
  // california.html because Workers static assets serve /california/ from a
  // folder index and redirect the canonical /california to it otherwise.
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap()],
});
