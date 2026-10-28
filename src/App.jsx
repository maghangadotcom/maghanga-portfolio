import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import media from './media.js';
import CaseDialog from './CaseDialog.jsx';

const NAV_LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#capabilities', label: 'Capabilities' },
  { href: '#process', label: 'Process' },
  { href: '#about', label: 'About' },
];

const CAPABILITY_LABELS = [
  'Shopify Plus',
  'Liquid & Online Store 2.0',
  'Metaobjects & Shopify Functions',
  'Research & testing',
];

const WORDMARKS = [
  { name: 'Supply', url: 'https://supply.co/' },
  { name: 'Blu Atlas', url: 'https://bluatlas.com/' },
  { name: 'Fifth Ray', url: 'https://fifthray.co.uk/' },
  { name: 'TechnoRV', url: 'https://technorv.com/' },
  { name: 'Stryx', url: 'https://www.stryx.com/' },
];

const CASES = [
  {
    id: 'supply',
    title: 'Supply',
    summary: 'Online Store 2.0 development, reusable Liquid sections and Rebuy upsell flows.',
    tags: ['Online Store 2.0', 'Custom Liquid', 'Rebuy'],
    role: 'Shopify Developer & CRO Specialist, 2021–2023. I worked with growth, media and creative teams on storefront development, performance and CRO implementation.',
    context: 'The work covered theme architecture, page performance and the components used to build campaign landing pages and buying flows.',
    built: [
      'Rebuilt the storefront for Online Store 2.0.',
      'Developed native Liquid sections to replace third-party page-builder components.',
      'Built landing pages to support paid traffic.',
      'Implemented Rebuy upsell and cross-sell flows.',
      'Addressed performance issues on product and collection pages and supported storefront experiments.',
    ],
    gallery: [
      { type: 'browser', img: 'sup-lp-comparison', cap: 'Campaign landing page with a product comparison section.' },
      { type: 'browser', img: 'sup-progress-rebuycart', cap: 'Rebuy cart drawer with a progress bar and product recommendations.' },
      { type: 'phone', img: 'sup-checkout-upsell-mobile', cap: 'Supply checkout upsell interface on mobile.' },
      { type: 'phone', img: 'sup-quiz-lander-mobile', cap: 'Mobile landing page introducing the product quiz.' },
    ],
  },
  {
    id: 'fifthray',
    title: 'Fifth Ray',
    summary: 'Customer review research, product-page development and a native Liquid cart drawer.',
    tags: ['Customer research', 'Product pages', 'Cart development'],
    role: 'Shopify CRO Developer, contract, February–August 2026.',
    context: 'My work combined analytics investigation, customer research and development of the product-page and cart experience.',
    built: [
      'Investigated an observed 51% difference between GA4 and Shopify reporting and rebuilt the analytics implementation.',
      'Analysed 849+ customer reviews to create a customer-language bank for product-page content and the test roadmap.',
      'Rebuilt the product page above the fold and the variant selection module.',
      'Replaced a third-party cart app with a native Liquid cart drawer to address paid-social traffic failures in in-app browsers.',
    ],
    research: '849+ customer reviews analysed',
    gallery: [],
  },
  {
    id: 'bluatlas',
    title: 'Blu Atlas',
    summary: 'Custom product and collection sections, subscription interfaces and cart features.',
    tags: ['Custom sections', 'Subscriptions', 'Cart development'],
    role: 'I developed product and collection sections, subscription interfaces and cart features.',
    context: 'Storefront development for a men’s grooming and skincare brand on Shopify Plus with a broad catalogue and a subscription programme.',
    built: [
      'Rebuilt hero and collection templates, product-page information and trust blocks, and a product comparison section.',
      'Developed a native subscription widget.',
      'Built a custom cart drawer with a free-shipping progress bar, alongside embedded and popup upsell interfaces.',
    ],
    gallery: [
      { type: 'browser', img: 'blu-hero', cap: 'Custom homepage hero section.' },
      { type: 'browser', img: 'blu-product-meta', cap: 'Product information and trust content on the product page.' },
      { type: 'browser', img: 'blu-vs-everyone', cap: 'Product comparison section.' },
      { type: 'browser', img: 'blu-subscription-widget', cap: 'Product subscription selection interface.' },
      { type: 'phone', img: 'blu-cart-progress-mobile', cap: 'Cart drawer and free-shipping progress display on mobile.' },
      { type: 'phone', img: 'blu-popup-upsell-mobile', cap: 'Mobile product upsell interface.' },
    ],
  },
  {
    id: 'benevolence',
    title: 'Benevolence LA',
    summary: 'Cart drawer and Rebuy upsell implementation.',
    tags: ['Cart development', 'Rebuy', 'Custom Liquid'],
    role: 'I built a custom cart drawer with a Rebuy upsell and cross-sell module.',
    context: 'CRO and storefront development for a meaningful-gifting jewellery brand on Shopify. The cart work brought relevant product recommendations into the buying flow.',
    built: [
      'Developed a custom Liquid cart drawer.',
      'Implemented a Rebuy-powered upsell and cross-sell module for the brand’s gifting products and bundles.',
    ],
    gallery: [
      { type: 'browser', img: 'bla-cart-upsell', cap: 'Cart drawer with the Rebuy upsell module.' },
    ],
  },
  {
    id: 'shopdeck',
    title: 'ShopDeck',
    summary: 'Theme architecture, AJAX cart and navigation development.',
    tags: ['Theme architecture', 'AJAX cart', 'Navigation'],
    role: 'I worked on theme architecture, cart interactions, navigation and performance investigation.',
    context: 'Storefront engineering focused on a maintainable theme, cart interactions and navigation.',
    built: [
      'Rebuilt theme architecture and developed a custom mega menu.',
      'Built an AJAX cart with a fetch-based add-to-cart flow.',
      'Profiled storefront performance and investigated Core Web Vitals using browser debugging tools.',
    ],
    gallery: [
      { type: 'browser', img: 'shopdeck-theme', cap: 'ShopDeck theme architecture and development workspace.' },
      { type: 'browser', img: 'shopdeck-menu', cap: 'Custom mega menu navigation.' },
      { type: 'browser', img: 'shopdeck-fetch-cart', cap: 'Fetch-based AJAX cart implementation.' },
      { type: 'browser', img: 'shopdeck-cart', cap: 'Custom cart drawer interface.' },
      { type: 'browser', img: 'shopdeck-performance', cap: 'Storefront performance inspection.' },
      { type: 'browser', img: 'shopdeck-debug', cap: 'Browser debugging during storefront development.' },
    ],
  },
  {
    id: 'technorv',
    title: 'TechnoRV',
    summary: 'Cart promotion display and discount-state updates.',
    tags: ['Cart promotions', 'Discount display', 'Custom Liquid'],
    role: 'I worked on the storefront display of promotions and cart discount states.',
    context: 'Storefront development for a specialist RV technology and accessories retailer on Shopify. The work focused on how promotions appeared in the cart.',
    built: [
      'Developed Liquid presentation for cart promotions and applied discount information.',
      'Updated the displayed discount states as cart contents changed.',
    ],
    gallery: [
      { type: 'browser', img: 'technorv-cart-discounts', cap: 'Cart interface displaying promotions and applied discount states.' },
    ],
  },
];

const CAPABILITIES = [
  {
    title: 'Shopify storefront development',
    body: 'Custom Liquid sections, product and collection templates, landing pages and cart experiences built for maintainability.',
  },
  {
    title: 'CRO research and implementation',
    body: 'Customer review research, test roadmaps, analytics investigation and the development work needed to implement and evaluate storefront changes.',
  },
  {
    title: 'Subscriptions and merchandising',
    body: 'Subscription interfaces, bundle builders, upsell flows and the cart behaviour that connects them.',
  },
];

const PROCESS_STEPS = [
  { title: 'Understand the problem', body: 'I review the storefront, available analytics and customer feedback to identify the friction worth investigating.' },
  { title: 'Define the change', body: 'I turn the findings into a clear implementation brief, with a hypothesis and a measurement plan where testing is appropriate.' },
  { title: 'Build and check', body: 'I implement the change, review the important customer flows and check behaviour across devices.' },
  { title: 'Evaluate and iterate', body: 'I review the available evidence, document what we learned and agree the next step with the team.' },
];

const CASE_IDS = new Set(CASES.map((study) => study.id));
const LOCATION_EVENT = 'portfolio:location';

// The server snapshot is deliberately closed. URL state is read only after hydration.
function subscribeToLocation(callback) {
  window.addEventListener('popstate', callback);
  window.addEventListener(LOCATION_EVENT, callback);
  return () => {
    window.removeEventListener('popstate', callback);
    window.removeEventListener(LOCATION_EVENT, callback);
  };
}

function getCaseSnapshot() {
  const id = new URLSearchParams(window.location.search).get('case');
  return CASE_IDS.has(id) ? id : null;
}

function getServerCaseSnapshot() { return null; }

function ResumeLink({ className = '' }) {
  return <a className={className} href="/Thomas_Maghanga_Resume.pdf" download="Thomas_Maghanga_Resume.pdf">Download resume</a>;
}

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (event) => {
      if (!headerRef.current?.contains(event.target)) setMenuOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="nav" ref={headerRef}>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="container nav-inner">
        <a className="logo" href="#top" aria-label="Thomas Maghanga, back to top">
          <span className="logo-dot" aria-hidden="true" />
          <span>Thomas Maghanga</span>
        </a>
        <nav className={`nav-links${menuOpen ? ' is-open' : ''}`} id="primary-navigation" aria-label="Primary navigation">
          {NAV_LINKS.map((link) => <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>)}
        </nav>
        <a className="btn btn-primary nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>Contact me</a>
        <button className="menu-toggle" type="button" aria-controls="primary-navigation" aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(!menuOpen)} ref={toggleRef}>
          <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
        </button>
      </div>
    </header>
  );
}

function Hero() {
  const hero = media['sup-lp-comparison'];
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">Thomas Maghanga · Nairobi, Kenya (UTC+3).</p>
            <h1 id="hero-title">Shopify Plus Developer <span>&amp; CRO Specialist</span></h1>
            <p className="hero-sub">I help DTC brands improve product pages, carts and subscription flows. I combine customer research, Shopify development and CRO implementation.</p>
            <p className="hiring-line">Open to remote in-house roles and ongoing contracts.</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#work">View selected work <span aria-hidden="true">↗</span></a>
              <ResumeLink className="btn btn-outline" />
            </div>
          </div>
          <figure className="hero-visual">
            <div className="screenshot-frame">
              <img src={hero.src} width={hero.w} height={hero.h} alt="Supply campaign landing page with product comparison content." fetchPriority="high" decoding="async" />
            </div>
            <figcaption>Supply: selected storefront work.</figcaption>
          </figure>
        </div>
        <ul className="capability-labels" aria-label="Core capabilities">
          {CAPABILITY_LABELS.map((label) => <li key={label}>{label}</li>)}
        </ul>
      </div>
    </section>
  );
}

function ProjectExperience() {
  return (
    <section className="project-experience" aria-labelledby="experience-title">
      <div className="container">
        <h2 id="experience-title">Selected project experience</h2>
        <ul className="wordmarks">
          {WORDMARKS.map((brand) => <li key={brand.name}><a href={brand.url} target="_blank" rel="noopener noreferrer">{brand.name}</a></li>)}
        </ul>
        <p>Storefront development and CRO implementation since 2021.</p>
      </div>
    </section>
  );
}

function Cases({ onOpen }) {
  return (
    <section className="cases" id="work" aria-labelledby="work-title">
      <div className="container">
        <div className="section-head">
          <span className="kicker">Selected work</span>
          <h2 id="work-title" tabIndex={-1}>Selected Shopify work</h2>
          <p>A closer look at the storefront features I built, the problems they addressed and my role in each project.</p>
        </div>
        <div className="case-grid">
          {CASES.map((study, index) => {
            const preview = media[study.gallery[0]?.img];
            return (
              <article className={`case-card${index < 2 ? ' featured' : ''}`} key={study.id}>
                {preview ? (
                  <div className="case-preview">
                    <img src={preview.src} width={preview.w} height={preview.h} alt={`${study.title}: ${study.gallery[0].cap}`} loading="lazy" decoding="async" />
                  </div>
                ) : (
                  <div className="case-research">
                    <span className="eyebrow">Customer research</span>
                    <p><strong>849+</strong> customer reviews analysed</p>
                  </div>
                )}
                <div className="case-card-copy">
                  <h3>{study.title}</h3>
                  <p>{study.summary}</p>
                  <ul className="tags" aria-label={`${study.title} capabilities`}>
                    {study.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                  <a className="case-open" href={`?case=${study.id}#work`} onClick={(event) => onOpen(event, study.id)} aria-label={`Read ${study.title} case study`}>
                    Read case study <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section id="capabilities" aria-labelledby="capabilities-title">
      <div className="container">
        <div className="section-head">
          <span className="kicker">Capabilities</span>
          <h2 id="capabilities-title">What I can help with</h2>
        </div>
        <div className="capabilities-grid">
          {CAPABILITIES.map((capability, index) => (
            <article className="capability-card" key={capability.title}>
              <span className="card-number" aria-hidden="true">0{index + 1}</span>
              <h3>{capability.title}</h3>
              <p>{capability.body}</p>
            </article>
          ))}
        </div>
        <dl className="skill-groups">
          <div><dt>Development</dt><dd>Liquid, JavaScript, HTML, CSS, Online Store 2.0, metaobjects and Shopify Functions.</dd></div>
          <div><dt>APIs and workflow</dt><dd>Storefront API, Cart API, Shopify Subscriptions API and Git.</dd></div>
          <div><dt>CRO tools</dt><dd>GA4, Shopify Analytics, Intelligems, Rebuy and Replo.</dd></div>
        </dl>
        <a className="text-link" href="https://github.com/maghangadotcom/shopify-cro-toolkit" target="_blank" rel="noopener noreferrer">View my Shopify CRO Toolkit <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="process" id="process" aria-labelledby="process-title">
      <div className="container">
        <div className="section-head">
          <span className="kicker">Process</span>
          <h2 id="process-title">How I work</h2>
        </div>
        <ol className="process-grid">
          {PROCESS_STEPS.map((step, index) => (
            <li key={step.title}>
              <span className="card-number" aria-hidden="true">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="container about-grid">
        <figure className="portrait">
          <img src={media.portrait.src} width={media.portrait.w} height={media.portrait.h} alt="Thomas Maghanga, Shopify Plus developer and CRO specialist." loading="lazy" decoding="async" />
          <figcaption>Thomas Maghanga · Nairobi, UTC+3</figcaption>
        </figure>
        <div className="about-copy">
          <span className="kicker">About</span>
          <h2 id="about-title">About Thomas</h2>
          <p>I’m Thomas Maghanga, a Shopify Plus developer and CRO specialist based in Nairobi. Since 2021, I’ve worked on DTC storefronts, bringing customer research, development and experimentation together.</p>
          <p>I work with growth, media and creative teams to turn storefront problems into clear development tasks. My focus is maintainable code, usable buying flows and careful measurement.</p>
          <ul className="experience-list" aria-label="Professional experience">
            <li><span>Fifth Ray</span><p>Shopify CRO Developer · Contract<br /><time>February–August 2026</time></p></li>
            <li><span>Foundry Brands</span><p>Shopify Developer<br /><time>2023–2025</time></p></li>
            <li><span>Supply Co</span><p>Shopify Developer &amp; CRO Specialist<br /><time>2021–2023</time></p></li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="container contact-inner">
        <span className="kicker">Let’s talk</span>
        <h2 id="contact-title">Discuss a role or project</h2>
        <p>Looking for a Shopify developer who can also implement CRO work? Tell me about your team, storefront and what you need built.</p>
        <p className="availability">Based in Nairobi, Kenya (UTC+3). Available for a full workday when required, with a preferred 3–4 hours of daily team overlap.</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="mailto:maghangamail@gmail.com">Email Thomas <span aria-hidden="true">↗</span></a>
          <ResumeLink className="btn btn-outline" />
        </div>
        <div className="contact-links">
          <a href="https://www.linkedin.com/in/thomas-maghanga/" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
          <a href="https://github.com/maghangadotcom" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const openCase = useSyncExternalStore(subscribeToLocation, getCaseSnapshot, getServerCaseSnapshot);

  const onOpen = (event, id) => {
    // Preserve normal link behaviour for new tabs and modified clicks.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    event.currentTarget.focus();
    const url = new URL(window.location.href);
    url.searchParams.set('case', id);
    url.hash = 'work';
    window.history.pushState({ ...window.history.state, portfolioCase: id }, '', url);
    window.dispatchEvent(new Event(LOCATION_EVENT));
  };

  const onClose = () => {
    if (window.history.state?.portfolioCase === openCase) {
      // A case opened here has a portfolio entry directly behind it.
      window.history.back();
    } else {
      // Direct entries must close onto this portfolio, never leave the site.
      const url = new URL(window.location.href);
      url.searchParams.delete('case');
      window.history.replaceState(window.history.state, '', url);
      window.dispatchEvent(new Event(LOCATION_EVENT));
    }
  };

  return (
    <>
      <Nav />
      <main id="main">
        <div id="top" />
        <Hero />
        <ProjectExperience />
        <Cases onOpen={onOpen} />
        <Capabilities />
        <Process />
        <About />
        <Contact />
      </main>
      <footer className="foot">
        <div className="container">
          <span>© Thomas Maghanga</span>
          <span>Shopify Plus Developer &amp; CRO Specialist</span>
        </div>
      </footer>
      <CaseDialog study={CASES.find((study) => study.id === openCase) ?? null} onClose={onClose} />
    </>
  );
}
