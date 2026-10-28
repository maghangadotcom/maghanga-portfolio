import { guides, pillars } from "./content/index.js";
import { cases } from "./cases.js";

export const SITE_ORIGIN = "https://maghanga.com";
const PERSON_ID = `${SITE_ORIGIN}/about/#thomas`;
const SOCIAL_IMAGE = `${SITE_ORIGIN}/media/fifthray-product-page.webp`;
const person = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Thomas Maghanga",
  url: `${SITE_ORIGIN}/about/`,
  jobTitle: "Shopify Plus Developer & CRO Specialist",
  email: "mailto:thomas@maghanga.com",
  sameAs: [
    "https://github.com/maghangadotcom",
    "https://www.linkedin.com/in/thomas-maghanga/",
  ],
};

export function normalizePath(value = "/") {
  const pathname = value.split(/[?#]/)[0] || "/";
  if (pathname === "/404.html") return pathname;
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

function breadcrumb(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, route], index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: `${SITE_ORIGIN}${route}`,
    })),
  };
}

function meta(route, title, description, schema = [], extra = {}) {
  return {
    title,
    description,
    canonical: `${SITE_ORIGIN}${route}`,
    robots: "index, follow",
    ogType: "website",
    image: SOCIAL_IMAGE,
    imageAlt:
      "Selected Fifth Ray storefront work from Thomas Maghanga’s Shopify portfolio.",
    schema: { "@context": "https://schema.org", "@graph": schema },
    ...extra,
  };
}

export function getRoutes() {
  return [
    "/",
    "/work/",
    ...cases.map((study) => `/work/${study.id}/`),
    "/lab/",
    "/guides/",
    ...pillars.map((pillar) => `/guides/topics/${pillar.id}/`),
    ...guides.map((guide) => `/guides/${guide.slug}/`),
    "/about/",
    "/404.html",
  ];
}

export function getPageMeta(value = "/") {
  const route = normalizePath(value);
  if (route === "/") {
    return meta(
      route,
      "Thomas Maghanga | Shopify Plus Developer & CRO Specialist",
      "Merchant-focused Shopify development and CRO: explore Thomas Maghanga’s storefront work, practical guides and interactive lab. Open to remote roles and contracts.",
      [
        person,
        {
          "@type": "WebSite",
          name: "Thomas Maghanga",
          url: `${SITE_ORIGIN}/`,
          inLanguage: "en",
          publisher: { "@id": PERSON_ID },
        },
      ],
    );
  }
  if (route === "/work/") {
    return meta(
      route,
      "Shopify development & CRO work | Thomas Maghanga",
      "Explore selected Shopify storefront projects: Thomas Maghanga’s exact contribution, implementation details and original screens from product pages, carts and subscriptions.",
      [
        breadcrumb([
          ["Home", "/"],
          ["Work", route],
        ]),
      ],
    );
  }
  const study = cases.find((item) => route === `/work/${item.id}/`);
  if (study) {
    return meta(
      route,
      `${study.title}: Shopify implementation case study | Thomas Maghanga`,
      `${study.summary} See Thomas Maghanga’s role, implementation scope and selected project screens.`,
      [
        breadcrumb([
          ["Home", "/"],
          ["Work", "/work/"],
          [study.title, route],
        ]),
      ],
    );
  }
  if (route === "/lab/") {
    return meta(
      route,
      "Shopify CRO Lab: learn through examples | Thomas Maghanga",
      "Explore buying decisions, research and test planning in an interactive Shopify CRO Lab. Clearly labelled teaching examples connect merchant questions to implementation.",
      [
        breadcrumb([
          ["Home", "/"],
          ["CRO Lab", route],
        ]),
      ],
    );
  }
  if (route === "/guides/") {
    return meta(
      route,
      "Shopify customization & full-stack CRO guides | Thomas Maghanga",
      "Practical Shopify guides for merchants: editable storefronts, carts and offers, technical quality, customer research and trustworthy measurement. With implementation and QA steps.",
      [
        breadcrumb([
          ["Home", "/"],
          ["Guides", route],
        ]),
      ],
    );
  }
  const pillar = pillars.find((item) => route === `/guides/topics/${item.id}/`);
  if (pillar) {
    return meta(
      route,
      `${pillar.short || pillar.title} guides | Thomas Maghanga`,
      pillar.description,
      [
        breadcrumb([
          ["Home", "/"],
          ["Guides", "/guides/"],
          [pillar.short || pillar.title, route],
        ]),
      ],
    );
  }
  const guide = guides.find((item) => route === `/guides/${item.slug}/`);
  if (guide) {
    const topic = pillars.find((item) => item.id === guide.pillar);
    return meta(
      route,
      `${guide.title} | Thomas Maghanga`,
      guide.description,
      [
        {
          "@type": "BlogPosting",
          "@id": `${SITE_ORIGIN}${route}#article`,
          mainEntityOfPage: `${SITE_ORIGIN}${route}`,
          headline: guide.title,
          description: guide.description,
          author: person,
          ...(guide.publishedDate
            ? { datePublished: guide.publishedDate }
            : {}),
          dateModified: guide.date,
          inLanguage: "en",
          articleSection: topic?.short || topic?.title || guide.pillar,
          citation: guide.sources.map((source) => source.url),
        },
        breadcrumb([
          ["Home", "/"],
          ["Guides", "/guides/"],
          ...(topic
            ? [[topic.short || topic.title, `/guides/topics/${topic.id}/`]]
            : []),
          [guide.title, route],
        ]),
      ],
      {
        ogType: "article",
        image: `${SITE_ORIGIN}/media/portrait.webp`,
        imageAlt: "Thomas Maghanga, Shopify Plus developer and CRO specialist.",
      },
    );
  }
  if (route === "/about/") {
    return meta(
      route,
      "About & hiring Thomas Maghanga | Shopify Developer",
      "Meet Thomas Maghanga, a Nairobi-based Shopify Plus developer and CRO specialist. View experience, download a resume and discuss remote in-house roles or ongoing contracts.",
      [
        person,
        breadcrumb([
          ["Home", "/"],
          ["About & contact", route],
        ]),
      ],
    );
  }
  return meta(
    "/404.html",
    "Page not found | Thomas Maghanga",
    "This page could not be found. Explore Thomas Maghanga’s Shopify work, merchant guides, CRO Lab or contact details.",
    [],
    { robots: "noindex, follow" },
  );
}
