/** Check the shipping HTML, rather than relying on client-side route rendering. */
import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const { getRoutes, getPageMeta } = await import(
  pathToFileURL(path.join(root, "dist-ssr", "entry-server.js"))
);
const routes = getRoutes();
const origin = "https://maghanga.com";
const failures = [];
const pages = new Map();
const titles = new Set();
const descriptions = new Set();
let localLinks = 0;
let localAssets = 0;

const decode = (value) =>
  value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
const count = (text, pattern) => [...text.matchAll(pattern)].length;
const textOf = (html) =>
  decode(
    html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " "),
  ).trim();
const diskPath = (route) =>
  route === "/404.html"
    ? path.join(dist, "404.html")
    : path.join(dist, route.slice(1), "index.html");
const normalize = (route) =>
  route === "/404.html" || route.endsWith("/") ? route : `${route}/`;
const check = (condition, message) => {
  if (!condition) failures.push(message);
};

function attributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map(
      (match) => [match[1].toLowerCase(), decode(match[2] ?? match[3])],
    ),
  );
}

for (const route of routes) {
  try {
    const html = await fs.readFile(diskPath(route), "utf8");
    pages.set(route, html);
    const expected = getPageMeta(route);
    const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] || "";
    const title = decode(head.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "");
    const metas = [...head.matchAll(/<meta\b[^>]*>/gi)].map((match) =>
      attributes(match[0]),
    );
    const descriptionsFound = metas.filter((tag) => tag.name === "description");
    const description = descriptionsFound[0]?.content;
    const canonicalTags = [...head.matchAll(/<link\b[^>]*>/gi)]
      .map((match) => attributes(match[0]))
      .filter((tag) => tag.rel === "canonical");
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || "";
    check(
      count(head, /<title>/gi) === 1 && title === expected.title,
      `${route}: one correct title`,
    );
    check(!titles.has(title), `${route}: duplicate title`);
    titles.add(title);
    check(
      descriptionsFound.length === 1 && description === expected.description,
      `${route}: one correct description`,
    );
    check(!descriptions.has(description), `${route}: duplicate description`);
    descriptions.add(description);
    check(
      canonicalTags.length === 1 &&
        canonicalTags[0].href === expected.canonical,
      `${route}: correct canonical`,
    );
    check(count(main, /<h1\b/gi) === 1, `${route}: exactly one rendered h1`);
    check(
      textOf(main).length > (route === "/404.html" ? 100 : 180),
      `${route}: crawlable main content missing`,
    );
    check(
      !/<!--(?:app-html|page-head)-->|\bundefined\b|\[object Object\]/.test(
        html,
      ),
      `${route}: unresolved content`,
    );
    check(
      metas.some(
        (tag) => tag.name === "robots" && tag.content === expected.robots,
      ),
      `${route}: robots policy`,
    );
    check(
      metas.some(
        (tag) =>
          tag.property === "og:url" && tag.content === expected.canonical,
      ),
      `${route}: social canonical`,
    );
    check(
      metas.some(
        (tag) => tag.property === "og:image" && tag.content?.startsWith(origin),
      ),
      `${route}: social image`,
    );
    const scripts = [
      ...html.matchAll(
        /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
      ),
    ];
    check(scripts.length === 1, `${route}: one structured-data payload`);
    for (const script of scripts) {
      const schema = JSON.parse(script[1]);
      check(
        schema["@context"] === "https://schema.org",
        `${route}: schema context`,
      );
      check(Array.isArray(schema["@graph"]), `${route}: schema graph`);
      check(
        !JSON.stringify(schema).match(/FAQPage|AggregateRating|Review"/),
        `${route}: unsupported rich-result schema`,
      );
      const article = schema["@graph"].find(
        (item) => item["@type"] === "BlogPosting",
      );
      if (expected.ogType === "article") {
        check(Boolean(article), `${route}: article schema missing`);
        check(
          article?.mainEntityOfPage === expected.canonical,
          `${route}: article URL`,
        );
        check(
          article?.headline ===
            expected.title.replace(/ \| Thomas Maghanga$/, ""),
          `${route}: article headline`,
        );
        check(Boolean(article?.dateModified), `${route}: article review date`);
        check(
          textOf(main).split(/\s+/).length >= 600,
          `${route}: incomplete article body`,
        );
      }
    }
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
    check(ids.length === new Set(ids).size, `${route}: duplicate IDs`);
  } catch (error) {
    failures.push(`${route}: ${error.message}`);
  }
}

for (const [route, html] of pages) {
  for (const match of html.matchAll(/<(a|img|script|link|source)\b[^>]*>/gi)) {
    const tag = attributes(match[0]);
    const source = match[1].toLowerCase();
    const reference = source === "a" || source === "link" ? tag.href : tag.src;
    if (!reference || /^(?:mailto:|tel:|data:|javascript:)/i.test(reference))
      continue;
    const url = new URL(reference, `${origin}${route}`);
    if (url.origin !== origin) continue;
    const targetRoute = normalize(url.pathname);
    if (pages.has(targetRoute)) {
      localLinks++;
      if (source === "a" && url.hash) {
        const id = decodeURIComponent(url.hash.slice(1));
        check(
          pages.get(targetRoute).includes(`id="${id}"`),
          `${route}: broken fragment ${reference}`,
        );
      }
    } else {
      localAssets++;
      try {
        const asset = path.resolve(
          dist,
          `.${decodeURIComponent(url.pathname)}`,
        );
        check(
          asset.startsWith(`${dist}${path.sep}`),
          `${route}: unsafe asset path`,
        );
        const status = await fs.stat(asset);
        check(status.isFile(), `${route}: missing file ${reference}`);
      } catch {
        failures.push(`${route}: broken local reference ${reference}`);
      }
    }
    if (source === "img") {
      check(
        "alt" in tag && Boolean(tag.width) && Boolean(tag.height),
        `${route}: image needs alt and dimensions ${reference}`,
      );
    }
  }
}

const sitemap = await fs.readFile(path.join(dist, "sitemap.xml"), "utf8");
const listed = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) =>
  decode(match[1]),
);
const expectedSitemap = routes
  .filter((route) => !getPageMeta(route).robots.includes("noindex"))
  .map((route) => getPageMeta(route).canonical);
check(listed.length === new Set(listed).size, "Sitemap: duplicate URLs");
try {
  assert.deepEqual(listed.sort(), expectedSitemap.sort());
} catch {
  failures.push("Sitemap: public route coverage mismatch");
}
const robots = await fs.readFile(path.join(dist, "robots.txt"), "utf8");
check(
  robots.includes("Sitemap: https://maghanga.com/sitemap.xml"),
  "Robots: sitemap reference missing",
);
check(
  robots.includes("Allow: /") && !robots.includes("Disallow: /\n"),
  "Robots: public pages unexpectedly blocked",
);
const config = JSON.parse(
  await fs.readFile(path.join(root, "vercel.json"), "utf8"),
);
check(
  config.cleanUrls === true && config.trailingSlash === true,
  "Hosting: canonical URL normalization missing",
);
check(
  !config.rewrites && !config.routes,
  "Hosting: review rewrites/routes for accidental soft 404s",
);
check(
  getPageMeta("/missing-page/").robots.includes("noindex"),
  "Unknown routes: fallback metadata must be noindex",
);
check(
  routes.filter((route) => getPageMeta(route).ogType === "article").length >=
    20,
  "Guides: fewer than 20 rendered articles",
);

// The prerendered fallback remains a complete, accessible static brand list.
const homepage = pages.get("/") || "";
const brandSection = homepage.match(/<section[^>]*class="brands wrap"[\s\S]*?<\/section>/)?.[0] || "";
const brandImages = [...brandSection.matchAll(/<img\b[^>]*>/g)].map((match) => attributes(match[0]));
const brandNames = ["Supply Razors", "Blu Atlas", "Fifth Ray", "Benevolence LA", "TechnoRV", "Stryx", "Brute Magnetics"];
check(brandImages.length === 7, "Marquee: seven original logos in the static fallback");
check(brandImages.every((img, index) => img.alt === brandNames[index] && img.src.startsWith("/brands/") && Number(img.width) > 0 && Number(img.height) > 0), "Marquee: names, local assets and intrinsic dimensions");
check(brandSection.includes('data-enhanced="false"'), "Marquee: no-JavaScript fallback stays static");
const stryx = await fs.readFile(path.join(dist, "brands/stryx.svg"), "utf8");
check(!/<(?:script|foreignObject|image)\b|\bon\w+\s*=|\b(?:href|xlink:href)\s*=/i.test(stryx), "Marquee: SVG contains no active or external content");

if (failures.length) {
  console.error(failures.map((failure) => `FAIL ${failure}`).join("\n"));
  process.exit(1);
}
console.log(
  `[verify] ${pages.size} rendered pages; unique metadata, structured data, ${localLinks} internal links, ${localAssets} asset references, sitemap and 404 configuration passed.`,
);
console.log(
  "[verify] HTTP status codes and redirect behavior still require a deployed preview check.",
);
