/** Build-time rendering: every public content route ships its own HTML and head. */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const serverEntry = pathToFileURL(
  path.join(root, "dist-ssr", "entry-server.js"),
).href;

const { render, getRoutes, getPageMeta } = await import(serverEntry);
const template = await fs.readFile(path.join(dist, "index.html"), "utf8");

for (const marker of ["<!--app-html-->", "<!--page-head-->"]) {
  if (!template.includes(marker))
    throw new Error(`dist/index.html is missing ${marker}`);
}

function escapeHtml(value) {
  return String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character],
  );
}

function renderHead(page) {
  const attribute = escapeHtml;
  // Escaping '<' prevents a future content field from closing the JSON-LD script.
  const json = JSON.stringify(page.schema).replace(/</g, "\\u003c");
  return [
    `<title>${escapeHtml(page.title)}</title>`,
    `<meta name="description" content="${attribute(page.description)}" />`,
    `<meta name="robots" content="${attribute(page.robots)}" />`,
    `<link rel="canonical" href="${attribute(page.canonical)}" />`,
    `<meta property="og:type" content="${attribute(page.ogType)}" />`,
    '<meta property="og:site_name" content="Thomas Maghanga" />',
    `<meta property="og:url" content="${attribute(page.canonical)}" />`,
    `<meta property="og:title" content="${attribute(page.title)}" />`,
    `<meta property="og:description" content="${attribute(page.description)}" />`,
    `<meta property="og:image" content="${attribute(page.image)}" />`,
    `<meta property="og:image:alt" content="${attribute(page.imageAlt)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${attribute(page.title)}" />`,
    `<meta name="twitter:description" content="${attribute(page.description)}" />`,
    `<meta name="twitter:image" content="${attribute(page.image)}" />`,
    `<meta name="twitter:image:alt" content="${attribute(page.imageAlt)}" />`,
    `<script type="application/ld+json">${json}</script>`,
  ].join("\n    ");
}

const routes = getRoutes();
if (new Set(routes).size !== routes.length)
  throw new Error("Duplicate prerender routes");
for (const route of routes) {
  const destination =
    route === "/404.html"
      ? path.join(dist, "404.html")
      : path.join(dist, route.slice(1), "index.html");
  const body = render(route);
  if (!body || !body.includes("<main"))
    throw new Error(`Missing rendered page content: ${route}`);
  await fs.mkdir(path.dirname(destination), { recursive: true });
  const html = template
    .replace("<!--page-head-->", renderHead(getPageMeta(route)))
    .replace("<!--app-html-->", () => body);
  await fs.writeFile(destination, html);
}

const publicRoutes = routes.filter(
  (route) => !getPageMeta(route).robots.includes("noindex"),
);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${publicRoutes.map((route) => `  <url><loc>${escapeHtml(getPageMeta(route).canonical)}</loc></url>`).join("\n")}\n</urlset>\n`;
await fs.writeFile(path.join(dist, "sitemap.xml"), sitemap);
await fs.writeFile(
  path.join(dist, "robots.txt"),
  "User-agent: *\nAllow: /\n\nSitemap: https://maghanga.com/sitemap.xml\n",
);
console.log(
  `[prerender] rendered ${routes.length} routes, sitemap.xml and robots.txt`,
);
