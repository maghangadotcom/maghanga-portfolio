import { useState, useEffect, useRef } from 'react';
import media from './media.js';

/* ============================================================
   Data
   ============================================================ */

const NAV_LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#process', label: 'Process' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

const STATS = [
  { num: '+38%', label: 'CVR lift', src: 'Supply PDP tests' },
  { num: '35%', label: 'Faster load', src: 'OS 2.0 rebuild' },
  { num: '~16%', label: 'Of annual revenue', src: 'Upsells at Supply' },
  { num: '10+', label: 'DTC brands', src: '4+ years building' },
];

const WORDMARKS = [
  { name: 'Supply', url: 'https://supply.co/' },
  { name: 'Blu Atlas', url: 'https://bluatlas.com/' },
  { name: 'Benevolence LA', url: 'https://benevolencela.com' },
  { name: 'Fifth Ray', url: 'https://fifthray.co.uk/' },
  { name: 'Brute Magnetics', url: 'https://brutemagnetics.com/' },
  { name: 'TechnoRV', url: 'https://technorv.com/' },
  { name: 'Stryx', url: 'https://www.stryx.com/' },
  { name: 'Craft & Kin', url: 'https://craftandkin.co/' },
];

const GAP_ROWS = [
  { n: '01', body: <>Most devs stop at the build.</> },
  { n: '02', body: <>Most CRO people cannot ship code.</> },
  { n: '03', accent: true, body: <>I do the <b>full loop</b>, so you do not lose a week turning a strategy deck into dev tickets.</> },
];

const PROBLEMS = [
  { h: 'Your PDP works hard, your checkout does not.', body: <>Qualified traffic, but something between Add to Cart and confirmation bleeds revenue. For one brand the gap was <span className="stat-inline">89.6%</span>, nearly double the standard.</> },
  { h: 'Your data is lying to you.', body: <>I have found <span className="stat-inline">51%</span> discrepancies between GA4 and Shopify on a live store, which means every test built on it was compromised.</> },
  { h: 'Your apps are eating your speed.', body: <>Replacing three heavy apps with custom Liquid cut load times <span className="stat-inline">35%</span> on one store, and the conversion lift followed.</> },
];

const PROCESS_STEPS = [
  { idx: '01', title: 'Audit', body: <>I start with the data. GA4 funnels, heatmaps, session recordings, review mining. I read what your customers are actually saying, not what you think they are saying. I mined <span className="em">849+ reviews</span> for one brand to build a customer language bank that informed every test.</> },
  { idx: '02', title: 'Hypothesize', body: <>Every change starts as a hypothesis with a measurable outcome. I build testing roadmaps prioritized by revenue impact, not by what is easiest. The PDP gets tested first because that is where buying decisions happen.</> },
  { idx: '03', title: 'Build and Test', body: <><span className="em">I do not hand off a wireframe to a developer, I write the Liquid, the JavaScript and the CSS myself.</span> That means tests ship faster, run cleaner and I understand exactly what is being measured.</> },
  { idx: '04', title: 'Analyze and Ship', body: <>Winners get implemented. Losers get documented. Both make the next test smarter. I track CVR lift, revenue impact and statistical confidence on every experiment.</> },
];

const TIMELINE = [
  { month: 'Month 1', h: 'Fix the foundation', p: 'Analytics audit. Baseline metrics. First A/B test ships. If we cannot measure it, we are guessing.' },
  { month: 'Month 2', h: 'Find the first winner', p: 'PDP tests based on real user behavior. Cart and checkout friction removed. Upsell flows optimized.' },
  { month: 'Month 3', h: 'Expand and iterate', p: 'Re-test winners for further lift. Homepage and collection page optimization. Landing page development.' },
  { month: 'Month 4+', h: 'Continuous engine', p: 'Repeatable CRO system in place. Testing roadmap, documentation and reporting cadence. Every month gets better.' },
];

const STACKS = [
  { h: 'Research and Analytics', items: ['GA4', 'Google Tag Manager', 'Microsoft Clarity', 'Hotjar', 'Elevar', 'Shopify Analytics', 'Review Mining', 'Customer Surveys'] },
  { h: 'Testing and Implementation', items: ['Intelligems', 'Shopify Liquid', 'JavaScript', 'HTML / CSS', 'OS 2.0', 'Web Components', 'AJAX', 'MetaFields / MetaObjects', 'Core Web Vitals'] },
  { h: 'Commerce and Retention', items: ['Klaviyo', 'Rebuy', 'Skio', 'Recharge', 'Shopify Flow', 'Shopify Functions', 'Customer Accounts API', 'Subscription Architecture', 'Bundle Builders'] },
];

const TOOLS = ['Shopify Liquid', 'GA4', 'GTM', 'Intelligems', 'Microsoft Clarity', 'Hotjar', 'Klaviyo', 'Rebuy', 'Skio', 'Recharge', 'Shopify Flow', 'Elevar', 'JavaScript', 'OS 2.0', 'MetaFields', 'Git'];

/* Case studies — `chips` use {b, text}; `gallery` entries reference keys in src/media.js */
const CASES = [
  {
    id: 'supply',
    tag: 'Foundry portfolio brand',
    title: 'Supply',
    chips: [
      { b: '+38%', text: 'CVR on PDP tests' },
      { b: '35%', text: 'faster load' },
      { b: '~16%', text: 'of annual revenue from upsells' },
    ],
    blocks: [
      ['Context', 'Two years as primary CRO technical resource on Supply, the single-edge razor brand. Owned the storefront end to end, from the OS 2.0 rebuild to the upsell architecture.'],
      ['The friction', 'A legacy Impulse theme with slow load and a bulky codebase, plus a page-builder stack that bloated every campaign page. Speed was bleeding conversion and the team could not ship landing pages fast enough to test.'],
      ['The hypothesis', 'Strip the bloat, rebuild on native Liquid, and the speed gain plus a real testing surface compound across the funnel.'],
      ['What I shipped', 'Rebuilt on OS 2.0 and cut load time 35%. Replaced page-builder pages with native Liquid sections, built a modular section library so marketing could ship without a dev bottleneck, and built Rebuy-powered upsell and cross-sell flows. Ran a structured A/B program off heatmap and session data.'],
      ['The result', '38% CVR lift across the PDP tests, upsells driving roughly 16% of annual revenue, and a 35% faster store underneath it.'],
    ],
    takeaway: 'Speed is not a vanity metric. It is the floor every other test stands on. Fix it first and the wins compound.',
    gallery: [
      { type: 'browser', img: 'sup-lp-comparison', cap: 'Landing page comparison' },
      { type: 'browser', img: 'sup-checkout-upsell-mobile', cap: 'Checkout upsell' },
      { type: 'browser', img: 'sup-progress-rebuycart', cap: 'Rebuy cart, progress bar' },
      { type: 'phone', img: 'sup-quiz-lander-mobile', cap: 'Quiz lander, mobile' },
      { type: 'phone', img: 'sup-review-slider', cap: 'Review slider' },
      { type: 'phone', img: 'sup-testimonial-carousel-mobile', cap: 'Testimonial carousel, mobile' },
    ],
    proof: 'loom',
  },
  {
    id: 'bluatlas',
    tag: "Shopify Plus / men's grooming",
    title: 'Blu Atlas',
    chips: [
      { text: 'OS 2.0 theme rebuild' },
      { text: 'Subscription + bundle flows' },
      { text: 'Custom cart drawer' },
    ],
    blocks: [
      ['Context', "Storefront engineering for Blu Atlas, a men's grooming and skincare brand on Shopify Plus with a deep catalog and a subscription program."],
      ['The friction', 'A wide catalog meant heavy collection and product templates, app-driven subscription and upsell widgets fighting each other, and a cart that felt bolted on. Each added weight and a point of failure in in-app browsers.'],
      ['The hypothesis', 'Move the revenue-critical surfaces, PDP, cart and subscription, into native Liquid so they load fast, behave predictably and can be tested without app lock-in.'],
      ['What I shipped', 'Rebuilt the hero and collection templates, the PDP meta and trust blocks, a comparison section and a native subscription widget. Built a custom cart drawer with a progress bar toward free shipping, plus embedded and popup upsells driven by Liquid rather than a third-party builder.'],
      ['The result', 'A faster, self-contained storefront where the merchandising team could ship sections without a developer, and the subscription and upsell logic lived in the theme instead of a stack of apps.'],
    ],
    takeaway: 'On a big catalog the win is not one clever page. It is a section system the team can run themselves without re-bloating the store.',
    gallery: [
      { type: 'browser', img: 'blu-hero', cap: 'Hero rebuild' },
      { type: 'browser', img: 'blu-product-meta', cap: 'PDP meta and trust' },
      { type: 'browser', img: 'blu-vs-everyone', cap: 'Comparison section' },
      { type: 'browser', img: 'blu-subscription-widget', cap: 'Subscription widget' },
      { type: 'phone', img: 'blu-cart-progress-mobile', cap: 'Cart progress, mobile' },
      { type: 'browser', img: 'blu-popup-upsell-mobile', cap: 'Popup upsell' },
    ],
    proof: 'loom',
  },
  {
    id: 'benevolence',
    tag: 'DTC / jewelry',
    title: 'Benevolence LA',
    chips: [
      { text: 'Cart upsell drawer' },
      { text: 'Rebuy cross-sell' },
      { text: 'Custom Liquid, no app bloat' },
    ],
    blocks: [
      ['Context', 'CRO and front-end work for Benevolence LA, a meaningful-gifting jewelry brand on Shopify.'],
      ['The friction', 'The cart was a pass-through. Customers added one item and left, with no moment that raised average order value or surfaced a relevant add-on.'],
      ['The hypothesis', 'The cart is the highest-intent surface in the store. A well-built upsell there lifts AOV without touching acquisition spend.'],
      ['What I shipped', "Built a custom cart drawer with a Rebuy-powered upsell and cross-sell module, tuned to the brand's gifting bundles, in native Liquid so it stayed fast and on-brand."],
      ['The result', 'A cart that does merchandising work instead of just holding items, with the upsell logic owned in the theme.'],
    ],
    takeaway: 'Acquisition gets expensive. The cart is free real estate, and most stores waste it.',
    gallery: [
      { type: 'browser', img: 'bla-cart-upsell', cap: 'Cart upsell drawer' },
    ],
    proof: 'loom',
  },
  {
    id: 'fifthray',
    tag: 'Contract, completed',
    title: 'Fifth Ray',
    chips: [
      { b: '849+', text: 'reviews mined' },
      { b: '51%', text: 'data gap closed' },
      { text: 'Intelligems A/B program' },
    ],
    blocks: [
      ['Context', 'UK gut-health supplement brand on Shopify with Skio for subscriptions. Came in on contract to own CRO and theme work, and inherited a store that could not be trusted to measure itself.'],
      ['The friction', 'GA4 and Shopify disagreed by 51%, so every test and decision built on that data was already compromised. Checkout was dropping nearly double the industry benchmark with no visibility into why.'],
      ['The hypothesis', 'You cannot optimize what you cannot measure. Fix the measurement foundation first, then the tests mean something.'],
      ['What I shipped', 'Rebuilt the analytics layer so GA4 and Shopify reconciled, then mined 849+ reviews into a language bank that fed the test roadmap. Rebuilt the PDP above the fold and the variant module, with mandatory frequency selection before add-to-cart to stop accidental subscriptions and the cancellations they triggered. Replaced a third-party cart app with a native cart drawer to kill script conflicts in in-app browsers, where most paid social traffic lands.'],
      ['The result', 'A store that finally measured itself honestly, running structured A/B tests in Intelligems against revenue per session.'],
    ],
    takeaway: 'The flashy win is a CVR number. The real win is a brand that can tell whether a test actually worked. I built that.',
    gallery: [],
    proof: 'redacted',
  },
  {
    id: 'shopdeck',
    tag: 'Theme architecture + performance',
    title: 'ShopDeck',
    chips: [
      { text: 'Core Web Vitals rebuild' },
      { text: 'AJAX cart engineering' },
      { text: 'Custom mega menu' },
    ],
    blocks: [
      ['Context', 'Theme architecture and performance engineering on ShopDeck, where the brief was a fast, maintainable storefront rather than another app-stacked theme.'],
      ['The friction', 'Render-blocking scripts, a slow cart and Core Web Vitals that were dragging both ranking and conversion. The kind of problems that do not show up in a pretty mockup but show up in revenue.'],
      ['The hypothesis', 'Engineer the storefront like an application, lean JavaScript, an AJAX cart, a hand-built menu, and the performance numbers and conversion follow.'],
      ['What I shipped', 'Rebuilt the theme architecture, a custom mega menu and an AJAX cart with a fetch-based add flow, then profiled and tuned Core Web Vitals with proper debugging tooling rather than guesswork.'],
      ['The result', 'A storefront that loads fast, carts without a full reload and is debuggable, so the next change does not regress the last one.'],
    ],
    takeaway: 'Performance is engineering, not a plugin. You earn it in the code and you keep it with tooling.',
    gallery: [
      { type: 'browser', img: 'shopdeck-theme', cap: 'Theme architecture' },
      { type: 'browser', img: 'shopdeck-menu', cap: 'Custom mega menu' },
      { type: 'browser', img: 'shopdeck-fetch-cart', cap: 'AJAX fetch cart' },
      { type: 'browser', img: 'shopdeck-cart', cap: 'Cart drawer' },
      { type: 'browser', img: 'shopdeck-performance', cap: 'Core Web Vitals' },
      { type: 'browser', img: 'shopdeck-debug', cap: 'Debug tooling' },
    ],
    proof: 'loom',
  },
  {
    id: 'technorv',
    tag: 'RV tech and accessories',
    title: 'TechnoRV',
    chips: [
      { text: 'Cart-level discount logic' },
      { text: 'Custom Liquid' },
      { text: 'Promo automation' },
    ],
    blocks: [
      ['Context', 'Front-end and promo engineering for TechnoRV, a specialist RV technology and accessories retailer on Shopify.'],
      ['The friction', 'Promotions and tiered discounts were hard to run cleanly at the cart level, which made campaigns fragile and easy to get wrong under traffic.'],
      ['The hypothesis', 'Discount and promo logic belongs in the cart, expressed in Liquid, so campaigns are predictable and do not depend on a brittle stack of apps.'],
      ['What I shipped', 'Built cart-level discount and promo logic in native Liquid, so tiered offers and campaign pricing render correctly and update in real time as the cart changes.'],
      ['The result', 'Campaigns that behave the same every time, with discount logic the team can reason about instead of trusting a black-box app.'],
    ],
    takeaway: 'When money math lives in an app you cannot see, you find the bug at the worst possible time. I put it in the code.',
    gallery: [
      { type: 'browser', img: 'technorv-cart-discounts', cap: 'Cart discount logic' },
    ],
    proof: 'loom',
  },
];

/* ============================================================
   Small building blocks
   ============================================================ */

function Chip({ b, text }) {
  return <span className="chip">{b ? <><b>{b}</b> {text}</> : text}</span>;
}

function Shot({ type, img, cap, title }) {
  const m = media[img];
  if (!m) return null;
  const imgEl = (
    <img src={m.src} width={m.w} height={m.h} alt={`${title}: ${cap}`} loading="lazy" decoding="async" />
  );
  return (
    <div className="shot">
      {type === 'phone' ? (
        <div className="device phone">{imgEl}</div>
      ) : (
        <div className="device browser">
          <div className="bar"><i></i><i></i><i></i><span className="ub"></span></div>
          <div className="frame-inner">{imgEl}</div>
        </div>
      )}
      <span className="cap">{cap}</span>
    </div>
  );
}

function LoomSlot() {
  return (
    <div className="loom-slot">
      <span className="play"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg></span>
      <span className="lt">60-second walkthrough</span>
      <span className="ls">Loom embed slot</span>
    </div>
  );
}

function RedactedChart() {
  return (
    <>
      <div className="gallery-label" style={{ marginTop: '28px' }}>Measurement gap, redacted</div>
      <div className="redacted-chart">
        <div className="rc-head">
          <span className="rc-title">GA4 vs Shopify, sessions</span>
          <span className="rc-gap">51% gap</span>
        </div>
        <svg width="100%" height="170" viewBox="0 0 520 170" preserveAspectRatio="none" role="img" aria-label="Redacted GA4 versus Shopify discrepancy">
          <line x1="0" y1="150" x2="520" y2="150" stroke="#1e293b" />
          <polygon points="0,60 520,40 520,118 0,132" fill="rgba(239,68,68,0.12)" />
          <polyline points="0,60 130,52 260,48 390,44 520,40" fill="none" stroke="#fbbf24" strokeWidth="2.5" />
          <polyline points="0,132 130,128 260,124 390,121 520,118" fill="none" stroke="#00e5a0" strokeWidth="2.5" />
          <rect x="408" y="20" width="92" height="16" rx="3" fill="#1e293b" />
          <rect x="408" y="122" width="92" height="16" rx="3" fill="#1e293b" />
        </svg>
        <div className="rc-legend">
          <span><i style={{ background: '#fbbf24' }}></i>GA4 reported</span>
          <span><i style={{ background: '#00e5a0' }}></i>Shopify actual</span>
          <span><i style={{ background: '#1e293b' }}></i>figures redacted</span>
        </div>
      </div>
    </>
  );
}

/* ============================================================
   Sections
   ============================================================ */

function Nav({ onToggleLab }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <div className="container nav-inner">
        <a href="#top" className="logo">
          <img className="nav-avatar" src={media.avatar.src} width={media.avatar.w} height={media.avatar.h} alt="Thomas Maghanga" />
          <span className="dot" onClick={(e) => { e.preventDefault(); onToggleLab(); }}></span>TM
        </a>
        <nav className="nav-links">
          {NAV_LINKS.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
        </nav>
        <div className="nav-cta">
          <a href="mailto:maghangamail@gmail.com" className="btn btn-primary">Let&apos;s talk</a>
          <button className="nav-toggle" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          </button>
        </div>
      </div>
      <div className={`mobile-menu${open ? ' open' : ''}`} id="mobile-menu">
        <div className="container">
          {NAV_LINKS.map((l) => <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>)}
          <a href="mailto:maghangamail@gmail.com" className="btn btn-primary" onClick={() => setOpen(false)}>Let&apos;s talk</a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const cvrRef = useRef(null);
  const variantRef = useRef(null);
  const atcRef = useRef(null);

  // Animated PDP motif: swap A/B variant and tick the CVR number. CSS handles
  // the pointer, the click pulse and the live dot — this only drives the text.
  useEffect(() => {
    const cvrEl = cvrRef.current, variantEl = variantRef.current, atcEl = atcRef.current;
    if (!cvrEl || !variantEl) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const variants = [
      { name: 'VARIANT A', cvr: 2.4, atc: 'Add to cart' },
      { name: 'VARIANT B', cvr: 3.3, atc: 'Add to cart - $48' },
    ];
    let vi = 0, shown = 2.4, tick = null;
    const tickTo = (target) => {
      const step = (target - shown) / 18;
      let n = 0;
      clearInterval(tick);
      tick = setInterval(() => {
        shown += step; n++;
        cvrEl.textContent = shown.toFixed(1) + '%';
        if (n >= 18) { shown = target; cvrEl.textContent = target.toFixed(1) + '%'; clearInterval(tick); }
      }, 28);
    };
    const swap = setInterval(() => {
      vi = (vi + 1) % variants.length;
      const v = variants[vi];
      variantEl.textContent = v.name;
      if (atcEl) atcEl.textContent = v.atc;
      tickTo(v.cvr);
    }, 3200);
    return () => { clearInterval(swap); clearInterval(tick); };
  }, []);

  return (
    <section className="hero">
      <div className="glow"></div>
      <div className="container">
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">Shopify Developer + CRO</span>
            <h1>I own Shopify CRO <span className="hl">end to end</span>. I diagnose the leak, ship the Liquid, run the test and report the lift.</h1>
            <p className="hero-sub">Most devs hand off to a CRO team once the build ships. I do both, so the person who finds the friction is the person who fixes it. 4+ years across 10+ DTC brands.</p>
            <div className="hero-actions">
              <a href="#work" className="btn btn-primary">See the work</a>
              <a href="#process" className="btn btn-outline">My process</a>
            </div>
          </div>

          <div className="hero-motif">
            <div className="motif" aria-hidden="true">
              <div className="motif-bar">
                <span className="d r"></span><span className="d y"></span><span className="d g"></span>
                <span className="url">pdp / running test <span className="motif-variant" ref={variantRef}>VARIANT A</span></span>
              </div>
              <div className="motif-screen">
                <svg className="motif-pointer" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5 2.5l15 7.4-6.2 1.9-2.3 6.2z" /></svg>
                <div className="motif-pdp">
                  <div className="motif-img"></div>
                  <div className="motif-detail">
                    <div className="motif-line w70"></div>
                    <div className="motif-price">$48.00</div>
                    <div className="motif-line"></div>
                    <div className="motif-line w40"></div>
                    <div className="motif-atc" ref={atcRef}>Add to cart</div>
                  </div>
                </div>
                <div className="motif-foot">
                  <span className="motif-metric">conversion rate</span>
                  <span className="motif-metric">live cvr <b className="motif-cvr" ref={cvrRef}>2.4%</b></span>
                </div>
              </div>
            </div>
          </div>

          <div className="stat-bar">
            {STATS.map((s) => (
              <div className="stat" key={s.label}>
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
                <div className="stat-src">{s.src}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Trust() {
  return (
    <section className="trust" style={{ padding: '56px 0' }}>
      <div className="container">
        <h3>Brands I have built and scaled.</h3>
        <div className="wordmarks reveal-group">
          {WORDMARKS.map((w) => (
            <a className="wordmark" key={w.name} href={w.url} target="_blank" rel="noopener noreferrer">{w.name}</a>
          ))}
        </div>
        <p className="trust-foot">4+ years / 7-8 figure DTC brands / Shopify and Shopify Plus</p>
      </div>
    </section>
  );
}

function Gap() {
  return (
    <section className="gap" id="gap">
      <div className="container">
        <div className="section-head">
          <span className="kicker">The gap</span>
          <h2>Build and CRO are usually two different people.</h2>
          <p>That handoff is where time and revenue go to die. I close it.</p>
        </div>
        <div className="gap-rows">
          {GAP_ROWS.map((r) => (
            <div className={`gap-row${r.accent ? ' accent' : ''}`} key={r.n}>
              <span className="gap-n">{r.n}</span>
              <p className="gap-st">{r.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="problem" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-head center reveal">
          <h2>Sound familiar?</h2>
          <p>The revenue killers I find in almost every store I audit.</p>
        </div>
        <div className="card-grid-3 reveal-group">
          {PROBLEMS.map((c) => (
            <div className="card" key={c.h}>
              <h3>{c.h}</h3>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section className="process" id="process">
      <div className="container">
        <div className="section-head reveal">
          <span className="kicker">Process</span>
          <h2>A repeatable system, not a guessing game.</h2>
          <p>Four steps. The same loop on every store, every test.</p>
        </div>
        <div className="process-steps reveal">
          {PROCESS_STEPS.map((s, i) => {
            const isOpen = i === openIndex;
            return (
              <div className={`pstep${isOpen ? ' open' : ''}`} key={s.idx}>
                <button className="pstep-head" aria-expanded={isOpen} onClick={() => setOpenIndex(isOpen ? -1 : i)}>
                  <span className="pstep-idx">{s.idx}</span>
                  <span className="pstep-title">{s.title}</span>
                  <span className="pstep-sign"></span>
                </button>
                <div className="pstep-body"><div className="pstep-body-inner"><div className="pstep-body-pad">{s.body}</div></div></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Cases({ onOpen }) {
  return (
    <section className="cases" id="work" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-head reveal">
          <span className="kicker">Case studies</span>
          <h2>Six brands. The full loop on each.</h2>
          <p>Open any one for the diagnosis, what I shipped and the proof.</p>
        </div>
        <div className="case-grid reveal-group">
          {CASES.map((c) => (
            <article className="case-card" key={c.id} onClick={() => onOpen(c.id)} role="button" tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(c.id); } }}>
              <span className="case-tag">{c.tag}</span>
              <h3>{c.title}</h3>
              <div className="case-chips">
                {c.chips.map((ch, i) => <Chip key={i} {...ch} />)}
              </div>
              <span className="case-open">Read the case <span className="arrow">&#8599;</span></span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Compounds() {
  return (
    <section className="compounds" id="results">
      <div className="glow"></div>
      <div className="container">
        <div className="section-head reveal">
          <span className="kicker">CRO compounds</span>
          <h2>Each winning test stacks on the last.</h2>
          <p>Month 6 you is not competing with month 1 you.</p>
        </div>
        <div className="compound-chart reveal">
          <div className="chart-head">
            <span className="ttl">Cumulative CVR lift</span>
            <span className="pk">compounds <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M9 7h8v8" /></svg></span>
          </div>
          <svg className="chart-svg" viewBox="0 0 800 300" role="img" aria-label="Compounding CRO lift curve from month one to month four and beyond">
            <defs>
              <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00e5a0" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#00e5a0" stopOpacity="0" />
              </linearGradient>
            </defs>
            <line x1="0" y1="260" x2="800" y2="260" stroke="#1e293b" strokeWidth="1" />
            <line x1="0" y1="170" x2="800" y2="170" stroke="#1e293b" strokeWidth="1" strokeDasharray="2 9" />
            <line x1="0" y1="90" x2="800" y2="90" stroke="#1e293b" strokeWidth="1" strokeDasharray="2 9" />
            <path className="draw-fill" d="M0 255 Q 130 235 266 206 T 533 118 T 800 40 L 800 280 L 0 280 Z" fill="url(#fill)" />
            <path className="draw-path" d="M0 255 Q 130 235 266 206 T 533 118 T 800 40" fill="none" stroke="#00e5a0" strokeWidth="3" strokeLinecap="round" />
            <circle className="chart-node" cx="0" cy="255" r="6" fill="#00e5a0" />
            <circle className="chart-node" cx="266" cy="206" r="6" fill="#00e5a0" />
            <circle className="chart-node" cx="533" cy="118" r="6" fill="#00e5a0" />
            <circle className="chart-node pulse" cx="800" cy="40" r="6" fill="#00e5a0" />
          </svg>
          <div className="chart-xaxis"><span>Month 1</span><span>Month 2</span><span>Month 3</span><span>Month 4+</span></div>
        </div>
        <div className="timeline reveal-group">
          {TIMELINE.map((t) => (
            <div className="tnode" key={t.month}>
              <div className="tmonth">{t.month}</div>
              <h3>{t.h}</h3>
              <p>{t.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {TOOLS.map((t, i) => <span key={`a-${i}`}>{t}</span>)}
        {TOOLS.map((t, i) => <span key={`b-${i}`}>{t}</span>)}
      </div>
    </div>
  );
}

function Stack() {
  return (
    <section className="stack" id="stack">
      <div className="container">
        <div className="section-head center reveal">
          <span className="kicker">Tech stack</span>
          <h2>The full stack, data collection to deployment.</h2>
        </div>
        <div className="stack-grid reveal-group">
          {STACKS.map((col) => (
            <div className="stack-col" key={col.h}>
              <h3>{col.h}</h3>
              <ul>{col.items.map((it) => <li key={it}>{it}</li>)}</ul>
            </div>
          ))}
        </div>
        <p className="stack-foot">I also leverage AI and agentic workflows to accelerate research, automate repetitive analysis and ship faster. Tools are only as good as the thinking behind them.</p>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about" id="about">
      <div className="container about-inner">
        <div className="about-lede-row reveal">
          <span className="about-tag">About</span>
          <p className="lede">How I think about this work.</p>
        </div>
        <div className="about-grid">
          <div className="portrait reveal">
            <img src={media.portrait.src} width={media.portrait.w} height={media.portrait.h} alt="Thomas Maghanga, Shopify CRO developer" loading="lazy" decoding="async" />
            <span className="portrait-cap"><b>Thomas Maghanga</b> / Nairobi, UTC+3</span>
          </div>
          <div className="about-copy reveal-group">
            <p>I work like an internal builder, not a ticket-taker. I own technical decisions, collaborate across teams and ship fixes while stores are live, often across multiple time zones.</p>
            <p>I think in commercial terms. <span className="em">Trust, friction, perceived value and how the storefront moves ROAS.</span> Every pixel serves a function in the revenue engine or it does not belong.</p>
            <p>I prioritize clarity, performance and maintainability because Shopify stores do not get second chances under traffic. The work I ship today should not become technical debt tomorrow.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="glow"></div>
      <div className="container contact-inner reveal">
        <h2>Let&apos;s build something that converts.</h2>
        <p className="contact-sub">Based in Nairobi, UTC+3. I work across UK and US timezones.</p>
        <a href="mailto:maghangamail@gmail.com" className="btn btn-primary">Get in touch</a>
        <div className="contact-links">
          <a href="https://www.linkedin.com/in/thomas-maghanga" target="_blank" rel="noopener noreferrer">LinkedIn &#8599;</a>
          <a href="https://github.com/maghangadotcom" target="_blank" rel="noopener noreferrer">GitHub &#8599;</a>
        </div>
      </div>
    </section>
  );
}

function CaseOverlay({ study, isOpen, onClose }) {
  return (
    <div className={`overlay${isOpen ? ' open' : ''}`} aria-hidden={!isOpen} role="dialog" aria-modal="true" aria-label={`${study.title} case study`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="overlay-panel">
        <div className="overlay-head">
          <div>
            <span className="case-tag">{study.tag}</span>
            <h3>{study.title}</h3>
          </div>
          <button className="overlay-close" aria-label="Close" onClick={onClose}>&#10005;</button>
        </div>
        <div className="overlay-body">
          <div className="overlay-chips">
            {study.chips.map((ch, i) => <Chip key={i} {...ch} />)}
          </div>

          {study.blocks.map(([label, body]) => (
            <div className="cs-block" key={label}>
              <span className="label">{label}</span>
              <p>{body}</p>
            </div>
          ))}
          <div className="cs-block takeaway">
            <span className="label">The takeaway</span>
            <p>{study.takeaway}</p>
          </div>

          {study.proof === 'redacted' ? (
            <>
              <div className="gallery-label">Proof <span className="hint">completed contract, may be under NDA</span></div>
              <LoomSlot />
              <RedactedChart />
            </>
          ) : (
            <>
              <div className="gallery-label">Selected screens <span className="hint">scroll &#8594;</span></div>
              <div className="gallery">
                {study.gallery.map((g) => <Shot key={g.img} {...g} title={study.title} />)}
              </div>
              <div className="gallery-label" style={{ marginTop: '28px' }}>Walkthrough</div>
              <LoomSlot />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   App
   ============================================================ */

export default function App() {
  const [openCase, setOpenCase] = useState(null);

  // Lock body scroll while an overlay is open, and close on Escape.
  useEffect(() => {
    if (!openCase) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setOpenCase(null); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [openCase]);

  // Stat counters tick up once on load (no layout shift — fixed-size, tabular nums).
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const els = Array.from(document.querySelectorAll('.stat-num'));
    if (!els.length) return;
    const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
    const animate = (el, raw) => {
      const m = raw.match(/^(\D*)(\d+(?:\.\d+)?)(\D*)$/);
      if (!m) return;
      const pre = m[1], target = parseFloat(m[2]), suf = m[3];
      const dec = (m[2].split('.')[1] || '').length;
      if (reduce) { el.textContent = pre + target.toFixed(dec) + suf; return; }
      const dur = 1000;
      let start = null;
      const step = (t) => {
        if (start === null) start = t;
        const p = clamp((t - start) / dur, 0, 1);
        const e = 1 - Math.pow(1 - p, 3);
        el.textContent = pre + (target * e).toFixed(dec) + suf;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = pre + target.toFixed(dec) + suf;
      };
      requestAnimationFrame(step);
    };
    const originals = els.map((el) => el.textContent.trim());
    els.forEach((el) => { el.textContent = el.textContent.replace(/[\d.]+/, '0'); });
    const id = setTimeout(() => els.forEach((el, i) => animate(el, originals[i])), 250);
    return () => clearTimeout(id);
  }, []);

  // Console easter egg for the curious dev (matches the original craft layer).
  useEffect(() => {
    try {
      console.log('%c> view-source: you found the lab.', 'color:#00e5a0;font-weight:700;font-size:13px;font-family:monospace');
      console.log('%cNo heavy frameworks here. Prerendered, CSS-driven, ships fast.\nIf you can read this, you know what good looks like. Let\'s talk: maghangamail@gmail.com', 'color:#94a3b8;font-size:12px;font-family:monospace');
      console.log('%cps - click the green dot in the logo.', 'color:#64748b;font-size:11px;font-family:monospace');
    } catch { /* console may be unavailable */ }
  }, []);

  const toggleLab = () => document.body.classList.toggle('lab');

  return (
    <>
      <Nav onToggleLab={toggleLab} />
      <main id="top">
        <Hero />
        <Trust />
        <Gap />
        <Problem />
        <Process />
        <Cases onOpen={setOpenCase} />
        <Compounds />
        <Marquee />
        <Stack />
        <About />
        <Contact />
      </main>

      <footer className="foot">
        <div className="container">
          <span className="fl">&copy; <span>{new Date().getFullYear()}</span> <b>Thomas Maghanga</b></span>
          <span className="fl">Shopify Developer + CRO</span>
        </div>
      </footer>

      {CASES.map((c) => (
        <CaseOverlay key={c.id} study={c} isOpen={openCase === c.id} onClose={() => setOpenCase(null)} />
      ))}

      <div className="lab-badge"><span className="dot" style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent)' }}></span> lab mode - wireframe overlay on</div>
    </>
  );
}
