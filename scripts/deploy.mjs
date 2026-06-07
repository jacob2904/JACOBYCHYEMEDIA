#!/usr/bin/env node
/**
 * Copies the production Angular build into the `mediakit/` folder that
 * GitHub Pages serves at https://jacobychye.com/mediakit/, and writes a
 * 404.html SPA fallback so client-side routes (future follower features)
 * deep-link correctly.
 *
 * Run via: npm run deploy
 */
import { cp, rm, copyFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = resolve(root, 'dist/jacobmedia/browser');
const dest = resolve(root, 'mediakit');

if (!existsSync(src)) {
  console.error(`✗ Build output not found at ${src}. Run "npm run build:prod" first.`);
  process.exit(1);
}

await rm(dest, { recursive: true, force: true });
await mkdir(dest, { recursive: true });
await cp(src, dest, { recursive: true });

// SPA fallback: GitHub Pages serves 404.html for unknown paths; making it a
// copy of index.html lets Angular's router resolve deep links.
await copyFile(resolve(dest, 'index.html'), resolve(dest, '404.html'));

console.log(`✓ Deployed build → ${dest}`);
console.log('  Commit & push the repo to publish to https://jacobychye.com/mediakit/');
