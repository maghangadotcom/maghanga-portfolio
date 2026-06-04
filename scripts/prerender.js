/**
 * SSG prerender. Runs after the client build and the SSR build.
 * Renders <App/> to static HTML and injects it into dist/index.html,
 * so the page ships content in the markup on first paint (then hydrates).
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const templatePath = path.join(root, 'dist', 'index.html');
const serverEntry = pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href;

const { render } = await import(serverEntry);
const template = await fs.readFile(templatePath, 'utf-8');

if (!template.includes('<!--app-html-->')) {
  throw new Error('dist/index.html is missing the <!--app-html--> placeholder');
}

const html = template.replace('<!--app-html-->', render());
await fs.writeFile(templatePath, html);
console.log('[prerender] injected static app HTML into dist/index.html');
