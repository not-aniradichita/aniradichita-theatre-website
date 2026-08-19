import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

// All client-side routes defined in src/App.tsx.
// The site is a React SPA, but for static hosting each route needs its own
// real HTML entry point so that visiting/refreshing/sharing a URL like
// "/about" loads directly instead of 404-ing.
const routes = [
  'about',
  'services',
  'works',
  'events',
  'studio',
  'blogs',
  'contact',
];

// After Vite writes the built index.html, copy it to <route>/index.html for
// every route, and to 404.html as a SPA fallback for hosts (e.g. GitHub Pages)
// that serve 404.html for unknown paths.
function multiPagePlugin(outDir: string): Plugin {
  return {
    name: 'emit-per-route-pages',
    apply: 'build',
    closeBundle() {
      const root = resolve(process.cwd(), outDir);
      const indexHtml = readFileSync(resolve(root, 'index.html'), 'utf-8');

      for (const route of routes) {
        const dir = resolve(root, route);
        mkdirSync(dir, { recursive: true });
        writeFileSync(resolve(dir, 'index.html'), indexHtml);
      }

      // SPA fallback for direct hits to unknown/nested paths.
      copyFileSync(resolve(root, 'index.html'), resolve(root, '404.html'));

      const pages = ['/', ...routes.map((r) => `/${r}`)];
      // eslint-disable-next-line no-console
      console.log(`\n[emit-per-route-pages] wrote ${pages.length} pages + 404.html:`);
      // eslint-disable-next-line no-console
      console.log('  ' + pages.join('  '));
    },
  };
}

const OUT_DIR = 'docs';

export default defineConfig({
  // Served from the root of a custom domain (aniradichita.com), so base = '/'.
  base: '/',
  plugins: [react(), multiPagePlugin(OUT_DIR)],
  build: {
    outDir: OUT_DIR,
    emptyOutDir: true,
  },
  server: {
    port: 4173,
  },
});
