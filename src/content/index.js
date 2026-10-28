import storefront from './storefront.js';
import offers from './offers.js';
import quality from './quality.js';
import research from './research.js';

export const pillars = [
  { id: 'storefront', title: 'Storefronts your team can maintain', short: 'Storefront development', description: 'Build useful product pages, editable sections and content systems that your team can work with.', symbol: '01', work: 'supply' },
  { id: 'offers', title: 'Clear offers. Reliable buying flows.', short: 'Offers, cart & checkout', description: 'Help shoppers choose the right variant, understand subscriptions and move through a dependable cart.', symbol: '02', work: 'bluatlas' },
  { id: 'quality', title: 'Speed and usability, together', short: 'Speed & accessibility', description: 'Find performance bottlenecks, check mobile journeys and ship changes with a practical safety net.', symbol: '03', work: 'shopdeck' },
  { id: 'research', title: 'Research before the redesign', short: 'Research & measurement', description: 'Turn customer questions into testable changes, then check what the evidence actually supports.', symbol: '04', work: 'fifthray' },
];
export const guides = [...storefront, ...offers, ...quality, ...research];
export const guideHref = (guide) => `/guides/${guide.slug}/`;
