import { defineConfig } from 'astro/config';
export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  site: process.env.PUBLIC_SITE_URL || 'https://heywunmi.com',
  // External assets allow a CSP without inline script or style exceptions.
  build: { inlineStylesheets: 'never' },
  vite: { build: { assetsInlineLimit: 0, sourcemap: false } },
});
