# Maghanga Portfolio

A portfolio for Thomas Maghanga, a Shopify Plus Developer & CRO Specialist, covering documented storefront development and CRO implementation since 2021.

**[View live portfolio](https://maghanga.com/) · [Download résumé](https://maghanga.com/Thomas_Maghanga_Resume.pdf) · [Contact](mailto:maghangamail@gmail.com)**

Open to remote in-house roles and ongoing contracts. Based in Nairobi, Kenya (UTC+3), available for a full workday when required with a preferred 3–4 hours of daily team overlap.

## Selected Shopify work

Start with the case studies for the problem, my role, implementation details and screenshots:

| Case study | Work documented |
| --- | --- |
| [Supply](https://maghanga.com/?case=supply#work) | Online Store 2.0 development, reusable Liquid sections, campaign landing pages and Rebuy upsell flows |
| [Fifth Ray](https://maghanga.com/?case=fifthray#work) | Customer review research, product-page development, analytics investigation and a native Liquid cart drawer |
| [Blu Atlas](https://maghanga.com/?case=bluatlas#work) | Product and collection sections, subscription interfaces and cart features |

These are descriptions of my contribution, not claims of measured conversion lift. The repository contains the portfolio website, not the client stores' source code.

For an inspectable personal implementation, try the [Shopify CRO Lab](https://shopify-cro-lab.vercel.app/) and review its [source, tests and integration limits](https://github.com/maghangadotcom/shopify-cro-toolkit). It is an educational simulation, separate from the client work above.

## About this repository

A React portfolio that makes case studies shareable and keeps key content available in the initial HTML. The [case-study content and routing](src/App.jsx), [dialog behaviour](src/CaseDialog.jsx) and [prerender script](scripts/prerender.js) are available to inspect.

## Tech Stack

This project is built with a lean, performance-focused stack:

-   **[React 19](https://react.dev/)**: Component-based UI with client hydration.
-   **[Vite](https://vitejs.dev/)**: Next Generation Frontend Tooling for fast development and build speeds.
-   **Hand-written CSS**: A single dark/mint design system (`src/styles.css` + `src/craft.css`). No CSS framework, no runtime style dependencies.
-   **Build-time SSG prerender**: The app is rendered to static HTML at build time (`scripts/prerender.js`) and hydrated on the client, so content is in the markup on first paint.
-   **[sharp](https://sharp.pixelplumbing.com/)** (dev only): Generates sized WebP from the source PNGs (`scripts/optimize-images.mjs`) for fast, low-CLS images.

## Features

-   **Shareable case studies**: Six documented projects, with context, role, implementation details and real screenshot galleries where available. Links such as `/?case=supply#work` open accessible dialogs after hydration and support browser history.
-   **Downloadable résumé**: The two-page `public/Thomas_Maghanga_Resume.pdf` is available as a same-origin download.
-   **Content on first paint**: Prerendered HTML means fast LCP and no blank-screen flash in in-app browsers; CSS-driven animation keeps the main thread light.
-   **Responsive, mobile-first**: 44px+ touch targets, single-column reflow, `prefers-reduced-motion` support throughout.

## How the build works

`npm run build` runs three steps in order:

1.  `scripts/optimize-images.mjs` — emits WebP into `public/media` and writes `src/media.js` (dimensions for explicit `width`/`height`).
2.  `vite build` (client) then `vite build --ssr` (server bundle).
3.  `scripts/prerender.js` — renders `<App/>` to HTML and injects it into `dist/index.html`.

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

Preview the production build with `npm run preview`. Confirm the homepage is present in `dist/index.html`, then check direct case links, Back/Forward, keyboard focus, mobile layouts and the résumé download.

## Checks and release workflow

The `portfolio-checks` GitHub Actions job runs installation, lint and the complete production build on pushes to `development` and pull requests into `development` or `main`.

Work is prepared on `development` and reviewed in a pull request into `main`. Verify Vercel's Production branch and domain mapping before pushing. Approved releases use a regular merge commit; keep `development` and fast-forward it to `main` after release. Deployment to the Hostinger custom domain is a separate step from publishing the GitHub branches.

### Linting

To run the linter:

```bash
npm run lint
```

## License

All rights reserved.
