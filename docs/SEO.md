# Crawlable content and route checks

The React/Vite application is rendered at build time for every route returned by
`getRoutes()` in `src/seo.js`. Each route has its own HTML document in `dist`,
including the guide body, links and page-specific head tags. The browser hydrates
that same page. Search discovery does not depend on running the client app.

## Adding or maintaining a guide

1. Add a complete guide to its pillar module in `src/content/` and include it in
   the content index. Keep its slug stable once published.
2. Give it a distinct title and description that accurately describe its question.
3. Link primary references in `sources`, use real related-guide slugs, and keep
   educational examples distinct from client evidence.
4. Use `date` for the visible review date and structured-data modified date.
   Add `publishedDate` only when the first public publication date is known;
   review time is not assumed to be first publication. Update the review date
   after a substantive revision or source review.
5. Run `npm run build`, then `node scripts/verify-site.mjs`.

The build generates `/sitemap.xml` and `/robots.txt` from the public route set.
It excludes `/404.html` from the sitemap and marks the missing-page document
`noindex, follow`. Canonicals always use `https://maghanga.com`, including in a
preview build, so preview URLs do not become a competing canonical site.

`BlogPosting` data describes only the visible educational article, its named site
author and listed references. It does not add review, FAQ, conversion-lift or
client-outcome claims. Case studies use breadcrumb data without pretending to be
measured experiments. Social previews reuse the portfolio's existing images.

## What verification proves

`scripts/verify-site.mjs` checks every generated page for an actual main body and
one h1, unique correct title/description, canonical and social tags, parseable
structured data, substantial rendered guide content, internal destinations and
fragment IDs, local images/scripts/styles/resume, sitemap coverage and the
missing-page configuration. It checks files in the shipping build rather than a
client-side navigation mock.

The Vercel configuration enables clean URLs and trailing slashes with no wildcard
rewrite to the home page. A deployed preview still needs HTTP checks: a known
guide must return 200, its missing-slash form must redirect to its canonical path,
and an unknown path must return a 404 response with the missing-page content.
Vite's development server may use an HTML fallback, so it cannot establish the
deployed 404 status. Preserve existing root anchors and `?case=` entry links when
changing navigation.

Useful source references:

- [Vercel static configuration](https://vercel.com/docs/project-configuration/vercel-json)
- [Google article structured data](https://developers.google.com/search/docs/appearance/structured-data/article)
- [Google canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)

These measures make pages understandable and discoverable. They do not guarantee
indexing, rich results or a search ranking.
