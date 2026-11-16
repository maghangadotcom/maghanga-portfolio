import storefront from "./storefront.js";
import offers from "./offers.js";
import quality from "./quality.js";
import research from "./research.js";

export const pillars = [
  {
    id: "storefront",
    title: "Storefronts your team can maintain",
    short: "Storefront development",
    description:
      "Implement reusable Liquid sections, product templates and metaobject-driven content with clear editor controls and empty states.",
    symbol: "01",
    work: "supply",
  },
  {
    id: "offers",
    title: "Clear offers. Reliable buying flows.",
    short: "Offers, cart & checkout",
    description:
      "Connect variant selection, subscription state and cart interactions across the theme and app integrations.",
    symbol: "02",
    work: "bluatlas",
  },
  {
    id: "quality",
    title: "Speed and usability, together",
    short: "Speed & accessibility",
    description:
      "Profile bottlenecks, implement accessible interactions and verify mobile journeys before a controlled release.",
    symbol: "03",
    work: "shopdeck",
  },
  {
    id: "research",
    title: "Research before the redesign",
    short: "Research & measurement",
    description:
      "Turn research into hypotheses, instrument the journey, implement experiment variants and interpret the evidence.",
    symbol: "04",
    work: "fifthray",
  },
];
export const guides = [...storefront, ...offers, ...quality, ...research];
export const guideHref = (guide) => `/guides/${guide.slug}/`;
