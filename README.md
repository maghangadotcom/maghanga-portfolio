# Maghanga Portfolio

A showcase portfolio for Thomas Maghanga, a Shopify Developer specializing in high-performance storefronts, conversion optimization, and custom theme development.

## Live Demo

Check out the live version here: [https://maghanga-portfolio.vercel.app/](https://maghanga-portfolio.vercel.app/)

## Tech Stack

This project is built with a lean, performance-focused stack:

-   **[React 19](https://react.dev/)**: The latest version of the library for web and native user interfaces.
-   **[Vite](https://vitejs.dev/)**: Next Generation Frontend Tooling for fast development and build speeds.
-   **Hand-written CSS**: A single dark/mint design system (`src/styles.css` + `src/craft.css`). No CSS framework, no runtime style dependencies.
-   **Build-time SSG prerender**: The app is rendered to static HTML at build time (`scripts/prerender.js`) and hydrated on the client, so content is in the markup on first paint.
-   **[sharp](https://sharp.pixelplumbing.com/)** (dev only): Generates sized WebP from the source PNGs (`scripts/optimize-images.mjs`) for fast, low-CLS images.

## Features

-   **Case Study Overlays**: Six brands, each opening a full diagnosis (context, friction, hypothesis, what shipped, result) with device-framed screenshot galleries.
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

Ensure you have Node.js installed on your machine.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/maghangadotcom/maghanga-portfolio.git
    cd maghanga-portfolio
    ```

2.  Install dependencies:
    ```bash
    npm install
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

### Linting

To run the linter:

```bash
npm run lint
```

## License

All rights reserved.
