# Maghanga Portfolio

A portfolio for Thomas Maghanga, a Shopify Plus Developer & CRO Specialist, covering documented storefront development and CRO implementation since 2021.

**[View live portfolio](https://maghanga.com/) · [Download résumé](https://maghanga.com/Thomas_Maghanga_Resume.pdf) · [Contact](mailto:thomas@maghanga.com)**

Open to remote in-house roles and ongoing contracts. Based in Nairobi, Kenya (UTC+3), available for a full workday when required with a preferred 3–4 hours of daily team overlap.

## Selected Shopify work

Start with the case studies for the problem, my role, implementation details and screenshots:

| Case study | Work documented |
| --- | --- |
| [Supply](https://maghanga.com/work/supply/) | Online Store 2.0 development, reusable Liquid sections, campaign landing pages and Rebuy upsell flows |
| [Fifth Ray](https://maghanga.com/work/fifthray/) | Customer review research, product-page development, analytics investigation and a native Liquid cart drawer |
| [Blu Atlas](https://maghanga.com/work/bluatlas/) | Product and collection sections, subscription interfaces and cart features |

These are descriptions of my contribution, not claims of measured conversion lift. The repository contains the portfolio website, not the client stores' source code.

For an inspectable personal implementation, try the [Shopify CRO Lab](https://shopify-cro-lab.vercel.app/) and review its [source, tests and integration limits](https://github.com/maghangadotcom/shopify-cro-toolkit). It is an educational simulation, separate from the client work above.

## About this repository

A hiring-first React portfolio with six case studies, an integrated CRO Lab discovery page, and 22 merchant guides across four topic pillars. The [case facts](src/cases.js), [page rendering](src/App.jsx), [guide content](src/content/index.js), [metadata](src/seo.js) and [prerender script](scripts/prerender.js) are available to inspect.

The redesign is prepared on `development` for review. Production publication remains a separate approved release. See [validation evidence](docs/PORTFOLIO-VALIDATION.md) and [SEO maintenance notes](docs/SEO.md).

## Tech Stack

This project is built with a lean, performance-focused stack:

-   **[React 19](https://react.dev/)**: Component-based UI with client hydration.
-   **[Vite](https://vitejs.dev/)**: Next Generation Frontend Tooling for fast development and build speeds.
-   **Hand-written CSS**: A warm editorial design system in `src/styles.css`, with native keyboard-friendly controls and reduced-motion styles. No CSS framework or runtime style dependency.
-   **Build-time SSG prerender**: The app is rendered to static HTML at build time (`scripts/prerender.js`) and hydrated on the client, so content is in the markup on first paint.
-   **[sharp](https://sharp.pixelplumbing.com/)** (dev only): Generates sized WebP from the source PNGs (`scripts/optimize-images.mjs`) for fast, low-CLS images.

## Features

-   **Shareable case studies**: Six directly rendered project pages with context, exact role, implementation scope and real screenshot galleries. Historical `/?case=supply#work` links still open the accessible dialog.
-   **Downloadable résumé**: The two-page `public/Thomas_Maghanga_Resume.pdf` is available as a same-origin download.
-   **Crawlable content**: All 38 routes ship their main content in the initial HTML, with unique metadata, canonical URLs, honest Article/Breadcrumb structured data, sitemap, robots and a 404 document. This does not guarantee performance scores, indexing or rankings.
-   **Merchant guide library**: 22 substantial articles with practical implementation handoffs, limitations, QA checklists, primary references and related reading. The searchable library and four pillar routes connect the material.
-   **CRO Lab**: Clearly labelled fictional teaching examples support the client portfolio. Both repositories and live experiences are retained.
-   **Responsive layouts**: Single-column mobile reflow, visible keyboard focus, native controls and `prefers-reduced-motion` support. Six page types were checked at 320, 390, 768 and 1440 pixels.

## How the build works

`npm run build` runs three steps in order:

1.  `scripts/optimize-images.mjs` — emits WebP into `public/media` and writes `src/media.js` (dimensions for explicit `width`/`height`).
2.  `vite build` (client) then `vite build --ssr` (server bundle).
3.  `scripts/prerender.js` — renders each route to its own HTML document, injects its metadata and generates the sitemap, robots and missing-page document.

`npm run dev` runs the optimizer (`predev`) then the Vite dev server.

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

Use Node.js 24, matching the CI workflow and the configured Vercel runtime.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/maghangadotcom/maghanga-portfolio.git
    cd maghanga-portfolio
    ```

2.  Install dependencies:
    ```bash
    npm ci
    ```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal) to view it in the browser.

### Build

To build the project for production:

```bash
npm run build
```

This will generate a `dist` folder with the optimized assets ready for deployment.

Run `npm run verify` after building, then preview with `npm run preview`. The verifier checks every generated page, unique metadata, schema, local links, fragments, assets and sitemap coverage. Also check keyboard focus, menu/search controls, direct guide/case links, historical query links and the résumé download. A hosted preview must still confirm real HTTP 200/404 responses and trailing-slash redirects.

## Checks and release workflow

The `portfolio-checks` GitHub Actions job runs installation, lint, the complete production build and shipping-HTML verification on pushes to `development` and pull requests into `development` or `main`.

Work is prepared on `development` and reviewed in a pull request into `main`. Verify Vercel's Production branch and domain mapping before pushing. Approved releases use a regular merge commit; keep `development` and fast-forward it to `main` after release. Keep the existing hosting protections and custom-domain configuration unchanged during review.

### Linting

To run the linter:

```bash
npm run lint
```

## License

All rights reserved.
