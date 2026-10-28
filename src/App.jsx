import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import media from "./media.js";
import { cases } from "./cases.js";
import { guides, pillars, guideHref } from "./content/index.js";
import CaseDialog from "./CaseDialog.jsx";

const LAB = "https://shopify-cro-lab.vercel.app/";
const SOURCE = "https://github.com/maghangadotcom/shopify-cro-toolkit";
const RESUME = "/Thomas_Maghanga_Resume.pdf";
const CASE_IDS = new Set(cases.map((study) => study.id));
function subscribe(callback) {
  window.addEventListener("popstate", callback);
  return () => window.removeEventListener("popstate", callback);
}
function caseSnapshot() {
  const id = new URLSearchParams(window.location.search).get("case");
  return CASE_IDS.has(id) ? id : null;
}
function closedSnapshot() {
  return null;
}
function Arrow() {
  return <span aria-hidden="true">↗</span>;
}
function Resume({ className = "button secondary" }) {
  return (
    <a className={className} href={RESUME} download>
      Download résumé <span aria-hidden="true">↓</span>
    </a>
  );
}
function Picture({ name, alt, priority = false, className = "" }) {
  const img = media[name];
  return img ? (
    <img
      className={className}
      src={img.src}
      width={img.w}
      height={img.h}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
    />
  ) : null;
}
function Pill({ children }) {
  return <span className="pill">{children}</span>;
}
function Breadcrumbs({ items }) {
  return (
    <nav className="breadcrumbs wrap" aria-label="Breadcrumb">
      <a href="/">Home</a>
      {items.map((item) => (
        <span key={item.label}>
          <span aria-hidden="true">/</span>
          {item.href ? (
            <a href={item.href}>{item.label}</a>
          ) : (
            <span aria-current="page">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

function Header({ path }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const toggle = useRef(null);
  useEffect(() => {
    if (!open) return;
    const dismiss = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    const escape = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="availability-bar">
        <span className="status-dot" /> Open to remote in-house roles & ongoing
        contracts{" "}
        <a href="/about/#availability">
          Working together <Arrow />
        </a>
      </div>
      <header className="header wrap" ref={ref}>
        <a className="wordmark" href="/" aria-label="Thomas Maghanga home">
          maghanga<span>/</span>
          <small>SHOPIFY DEVELOPMENT + CRO</small>
        </a>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-controls="primary-nav"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? "Close ×" : "Menu +"}
        </button>
        <nav
          id="primary-nav"
          className={open ? "primary-nav open" : "primary-nav"}
          aria-label="Primary navigation"
        >
          {[
            ["/work/", "Work"],
            ["/#capabilities", "Expertise"],
            ["/#process", "How I work"],
            ["/guides/", "Guides"],
            ["/about/", "About"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              aria-current={path.startsWith(href) ? "page" : undefined}
            >
              {label}
            </a>
          ))}
          <a
            className="nav-contact"
            href="/#contact"
            onClick={() => setOpen(false)}
          >
            Let’s talk <Arrow />
          </a>
        </nav>
      </header>
    </>
  );
}
function Heading({ kicker, title, description, href, link }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{kicker}</p>
        <h2 tabIndex={-1}>{title}</h2>
      </div>
      <div>
        {description && <p>{description}</p>}
        {href && (
          <a className="text-link" href={href}>
            {link} <Arrow />
          </a>
        )}
      </div>
    </div>
  );
}
function Hero() {
  return (
    <section className="hero wrap" id="top" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">
          THOMAS MAGHANGA · SHOPIFY PLUS DEVELOPER & CRO SPECIALIST
        </p>
        <h1 id="hero-title">
          Shopify Plus
          <br />
          Developer{" "}
          <em>
            &<br />
            CRO Specialist.
          </em>
        </h1>
        <p className="hero-intro">
          I turn customer questions into storefront work your team can ship:
          clearer product pages, dependable carts and maintainable Shopify
          customizations.
        </p>
        <div className="actions">
          <a className="button" href="/work/">
            Explore my work <Arrow />
          </a>
          <Resume className="text-link" />
        </div>
        <p className="hero-note">
          Storefront experience since 2021 · Nairobi, UTC+3 · Remote
        </p>
      </div>
      <div className="hero-proof">
        <div className="proof-head">
          <span className="eyebrow">INSIDE THE WORK</span>
          <span>01 / Fifth Ray</span>
        </div>
        <div className="hero-screen">
          <Picture
            name="fifthray-product-page"
            alt="Fifth Ray product page showing quantity, subscription and one-time purchase choices."
            priority
          />
        </div>
        <div className="proof-foot">
          <div>
            <p>Research that reaches the storefront.</p>
            <span>Product page + native Liquid cart development</span>
          </div>
          <a href="/work/fifthray/" aria-label="Explore Fifth Ray case study">
            <Arrow />
          </a>
        </div>
        <div className="hero-stamp">
          <span>Since</span>
          <strong>2021</strong>
          <span>Building for DTC</span>
        </div>
      </div>
    </section>
  );
}
function Brands() {
  return (
    <section className="brands wrap" aria-label="Selected project experience">
      <p>SELECTED PROJECT EXPERIENCE</p>
      <div>
        {["Supply", "Blu Atlas", "Fifth Ray", "TechnoRV", "Stryx"].map(
          (name) => (
            <span key={name}>{name}</span>
          ),
        )}
      </div>
    </section>
  );
}
function Capabilities() {
  return (
    <section className="section wrap" id="capabilities">
      <Heading
        kicker="WHAT YOUR STORE NEEDS NEXT"
        title={
          <>
            From “something feels off”
            <br />
            to a change you can ship.
          </>
        }
        description="I connect the customer problem to the development work, so research and implementation move together."
      />
      <div className="service-grid">
        {[
          [
            "01",
            "Make the product easier to choose.",
            "Product-page content, comparison sections and variant selectors that answer real buying questions.",
            "Custom Liquid · Online Store 2.0 · Metaobjects",
            "storefront",
          ],
          [
            "02",
            "Make the buying flow dependable.",
            "Subscription interfaces, cart drawers and optional upsells with clear prices and useful error states.",
            "Subscriptions · Cart development · Shopify Functions",
            "offers",
          ],
          [
            "03",
            "Know what deserves another iteration.",
            "Review research, analytics investigation and measurement plans that separate evidence from assumptions.",
            "Customer research · GA4 · QA & experimentation",
            "research",
          ],
        ].map(([n, t, p, s, id]) => (
          <article className="service" key={n}>
            <span className="number">{n}</span>
            <h3>{t}</h3>
            <p>{p}</p>
            <small>{s}</small>
            <a className="text-link" href={`/guides/topics/${id}/`}>
              Explore the approach <Arrow />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
function WorkCards({ limit }) {
  return (
    <div className="work-grid">
      {cases.slice(0, limit ?? cases.length).map((study, i) => (
        <article className={`work-card work-${study.id}`} key={study.id}>
          <a
            className="work-image"
            href={`/work/${study.id}/`}
            tabIndex={-1}
            aria-hidden="true"
          >
            <span className="image-index">SELECTED WORK / 0{i + 1}</span>
            <Picture name={study.gallery[0].img} alt="" />
          </a>
          <div className="work-copy">
            <div className="work-title">
              <h3>
                <a href={`/work/${study.id}/`}>{study.title}</a>
              </h3>
              <Arrow />
            </div>
            <p>{study.summary}</p>
            <div className="tags">
              {study.tags.map((tag) => (
                <Pill key={tag}>{tag}</Pill>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
function WorkSection() {
  return (
    <section className="section work-section" id="work">
      <div className="wrap">
        <Heading
          kicker="SELECTED WORK"
          title="Real storefronts. Specific contributions."
          description="The context, my role and selected screens from Shopify development and CRO implementation."
          href="/work/"
          link="View all selected work"
        />
        <WorkCards limit={3} />
      </div>
    </section>
  );
}
const LESSONS = [
  {
    id: "price",
    label: "“Why does it cost that much?”",
    before: "Premium coffee. $24 for 250 g.",
    after:
      "$24 for 250 g. At 15 g per cup, that is about 16.7 cups — approximately $1.44 per cup. Your recipe may differ.",
    question:
      "Before publishing: are the pack size, price and serving assumptions accurate?",
    guide: "price-justification-product-expertise",
    source:
      "https://frictionless-commerce.com/blog/increase-conversions-with-price-justification/",
    credit: "Rishi Rawat’s price justification teaching",
  },
  {
    id: "proof",
    label: "“Can I believe this claim?”",
    before: "The best coffee, chosen by experts.",
    after:
      "Here is the sourcing information to check, the roasting decision to explain and the evidence a merchant would need before making this claim.",
    question:
      "Before publishing: can someone verify the source, date and scope of the evidence?",
    guide: "honest-product-comparisons",
    source: "https://frictionless-commerce.com/blog/demonstrate-expertise/",
    credit: "Rishi Rawat’s expertise teaching",
  },
  {
    id: "plan",
    label: "“Am I signing up for anything?”",
    before: "Get your coffee for less.",
    after:
      "One-time purchase or subscription? Show the full amount due now, the delivery frequency, future charge and how to manage the plan before adding to cart.",
    question:
      "Before publishing: does the cart and checkout preserve the shopper’s explicit choice?",
    guide: "shopify-subscription-selector",
    source:
      "https://shopify.dev/docs/storefronts/themes/pricing-payments/subscriptions/add-subscriptions-to-your-theme",
    credit: "Shopify’s selling-plan documentation",
  },
];
function LabExercise() {
  const [choice, setChoice] = useState("price");
  const [improved, setImproved] = useState(false);
  const lesson = LESSONS.find((item) => item.id === choice);
  return (
    <div className="lab-exercise">
      <div className="exercise-top">
        <span className="eyebrow">TRY A SHOPPER QUESTION</span>
        <span className="demo-label">Fictional coffee example</span>
      </div>
      <fieldset className="question-list">
        <legend className="sr-only">Choose a shopper question</legend>
        {LESSONS.map((item) => (
          <label key={item.id} className={choice === item.id ? "selected" : ""}>
            <input
              type="radio"
              name="lesson"
              value={item.id}
              checked={choice === item.id}
              onChange={() => {
                setChoice(item.id);
                setImproved(false);
              }}
            />
            {item.label}
            <span aria-hidden="true">→</span>
          </label>
        ))}
      </fieldset>
      <fieldset className="comparison-switch">
        <legend>Compare the explanation</legend>
        <label>
          <input
            type="radio"
            name="explanation"
            checked={!improved}
            onChange={() => setImproved(false)}
          />
          Before
        </label>
        <label>
          <input
            type="radio"
            name="explanation"
            checked={improved}
            onChange={() => setImproved(true)}
          />
          Possible improvement
        </label>
      </fieldset>
      <div className="example-copy" aria-live="polite">
        <p>{improved ? lesson.after : lesson.before}</p>
      </div>
      <p className="exercise-question">{lesson.question}</p>
      <p className="source-note">
        Educational interpretation of{" "}
        <a href={lesson.source}>{lesson.credit}</a>. No customer results are
        measured here.
      </p>
    </div>
  );
}
function LabFeature({ full = false }) {
  return (
    <section className={`lab-feature ${full ? "full" : ""}`} id="cro-lab">
      <div className="wrap lab-grid">
        <div className="lab-copy">
          <p className="eyebrow">THE SHOPIFY CRO LAB</p>
          <h2>
            Read the idea.
            <br />
            <em>Try the difference.</em>
          </h2>
          <p>
            A hands-on place to explore clearer buying experiences before
            changing your store. Seven merchant lessons, a fictional storefront
            and a draft test plan.
          </p>
          <p className="lab-limit">
            All commerce is simulated. There is no real checkout, analytics
            connection or measured conversion lift.
          </p>
          <div className="actions">
            <a className="button light" href={LAB}>
              Open the interactive Lab <Arrow />
            </a>
            {!full && (
              <a className="light-link" href="/lab/">
                What’s inside <Arrow />
              </a>
            )}
          </div>
        </div>
        <LabExercise />
      </div>
    </section>
  );
}
function GuideCard({ guide, index }) {
  const pillar = pillars.find((p) => p.id === guide.pillar);
  return (
    <article className="guide-card">
      <div className="guide-card-meta">
        <span>{pillar.short}</span>
        <span>{String(index + 1).padStart(2, "0")}</span>
      </div>
      <h3>
        <a href={guideHref(guide)}>{guide.title}</a>
      </h3>
      <p>{guide.description}</p>
      <div className="guide-card-foot">
        <span>{guide.readingMinutes} min read</span>
        <a href={guideHref(guide)} aria-label={`Read ${guide.title}`}>
          <Arrow />
        </a>
      </div>
    </article>
  );
}
function Pillars({ active }) {
  return (
    <div className="pillar-grid">
      {pillars.map((pillar) => (
        <a
          className={`pillar-card ${active === pillar.id ? "active" : ""}`}
          href={`/guides/topics/${pillar.id}/`}
          key={pillar.id}
        >
          <span className="number">
            {pillar.symbol} <Arrow />
          </span>
          <h3>{pillar.title}</h3>
          <p>{pillar.description}</p>
          <small>
            {guides.filter((guide) => guide.pillar === pillar.id).length}{" "}
            practical guides
          </small>
        </a>
      ))}
    </div>
  );
}
function GuidesFeature() {
  return (
    <section className="section wrap">
      <Heading
        kicker="HOW I THINK THROUGH THE WORK"
        title="A practical guide behind each decision."
        description="Explore implementation briefs, research methods and QA checklists. Useful for your next project — and a closer look at how I approach the work."
        href="/guides/"
        link={`Explore all ${guides.length} guides`}
      />
      <div className="guide-grid home-guides">
        {guides
          .filter((g) => [0, 6, 12, 17].includes(guides.indexOf(g)))
          .map((guide, i) => (
            <GuideCard key={guide.slug} guide={guide} index={i} />
          ))}
      </div>
    </section>
  );
}
function LabProof() {
  return (
    <section className="lab-proof">
      <div className="wrap lab-proof-grid">
        <div>
          <p className="eyebrow">SUPPORTING IMPLEMENTATION EVIDENCE</p>
          <h2>
            Explore the decisions.
            <br />
            <em>Try the implementation.</em>
          </h2>
        </div>
        <div>
          <p>
            The Shopify CRO Lab connects seven merchant lessons to an
            interactive, fictional buying journey and a test plan. Explore the
            behavior and inspect the source behind it.
          </p>
          <p className="lab-proof-note">
            Educational demo · Simulated commerce · No conversion lift claimed
          </p>
          <div className="actions">
            <a className="text-link" href="/lab/">
              Inside the CRO Lab <Arrow />
            </a>
            <a className="text-link" href={SOURCE}>
              View source <Arrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="section process-section" id="process">
      <div className="wrap">
        <Heading
          kicker="HOW I WORK"
          title="One connected process."
          description="A good release needs a customer reason, clear implementation and a way to check what happened."
        />
        <ol className="process-grid">
          {[
            [
              "Understand",
              "Review the storefront, available analytics and customer feedback.",
            ],
            [
              "Define",
              "Agree the problem, scope, hypothesis and measurement plan.",
            ],
            [
              "Build & check",
              "Implement the change and check the important customer journeys.",
            ],
            [
              "Learn",
              "Review evidence, document limitations and choose the next step.",
            ],
          ].map(([t, p], i) => (
            <li key={t}>
              <span className="number">0{i + 1}</span>
              <h3>{t}</h3>
              <p>{p}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
function AboutPreview() {
  return (
    <section className="section wrap about-preview" id="about">
      <Picture name="portrait" alt="Thomas Maghanga" />
      <div>
        <p className="eyebrow">THE PERSON BEHIND THE WORK</p>
        <h2>A developer who stays curious about the customer.</h2>
        <p>
          I’m Thomas, based in Nairobi. Since 2021, I’ve worked with DTC teams
          on Shopify storefronts, bringing customer research, development and
          experimentation together.
        </p>
        <a className="text-link" href="/about/">
          About me & working together <Arrow />
        </a>
      </div>
      <div className="hiring-note">
        <span className="status-dot" />
        <p>Hiring for your team?</p>
        <span>Open to remote in-house roles and ongoing contracts.</span>
        <Resume className="text-link" />
      </div>
    </section>
  );
}
function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="wrap contact-grid">
        <div>
          <p className="eyebrow">YOUR NEXT STOREFRONT IMPROVEMENT</p>
          <h2>
            Let’s make the
            <br />
            <em>next change count.</em>
          </h2>
        </div>
        <div>
          <p>
            Tell me about your storefront, the problem you’re seeing and the
            team you’re building. We can start with a focused project or discuss
            a longer-term role.
          </p>
          <a className="button" href="mailto:thomas@maghanga.com">
            Email Thomas <Arrow />
          </a>
          <p className="contact-small">
            Nairobi, Kenya · UTC+3
            <br />
            Full workday availability, with a preferred 3–4 hours of daily team
            overlap.
          </p>
        </div>
      </div>
    </section>
  );
}
function Footer() {
  return (
    <footer className="footer wrap">
      <div>
        <a className="wordmark" href="/">
          maghanga<span>/</span>
        </a>
        <p>
          Shopify Plus development.
          <br />
          Customer research. Careful implementation.
        </p>
      </div>
      <nav aria-label="Footer navigation">
        <a href="/work/">Selected work</a>
        <a href="/lab/">CRO Lab</a>
        <a href="/guides/">Merchant guides</a>
        <a href="/about/">About & availability</a>
      </nav>
      <div className="footer-links">
        <a href="mailto:thomas@maghanga.com">thomas@maghanga.com</a>
        <a href="https://www.linkedin.com/in/thomas-maghanga/">
          LinkedIn <Arrow />
        </a>
        <a href="https://github.com/maghangadotcom">
          GitHub <Arrow />
        </a>
        <Resume className="text-link" />
      </div>
      <p className="copyright">
        © Thomas Maghanga · Built with care in Nairobi.
      </p>
    </footer>
  );
}
function PageIntro({ kicker, title, children }) {
  return (
    <header className="page-intro wrap">
      <p className="eyebrow">{kicker}</p>
      <h1>{title}</h1>
      {children && <div className="page-intro-copy">{children}</div>}
    </header>
  );
}
function WorkPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Selected work" }]} />
      <PageIntro
        kicker="SELECTED SHOPIFY WORK"
        title={
          <>
            The context.
            <br />
            <em>The contribution.</em>
          </>
        }
      >
        <p>
          A closer look at the storefront features I built, the problems they
          addressed and my role in each project.
        </p>
      </PageIntro>
      <section className="wrap section work-page">
        <WorkCards />
      </section>
      <Contact />
    </>
  );
}
function CasePage({ study }) {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Selected work", href: "/work/" },
          { label: study.title },
        ]}
      />
      <PageIntro kicker="SELECTED PROJECT" title={study.title}>
        <p>{study.summary}</p>
        <div className="tags">
          {study.tags.map((tag) => (
            <Pill key={tag}>{tag}</Pill>
          ))}
        </div>
      </PageIntro>
      <div className="wrap case-detail">
        <aside>
          <p className="eyebrow">MY ROLE</p>
          <p>{study.role}</p>
          <a className="text-link" href="/#contact">
            Discuss similar needs <Arrow />
          </a>
          <p className="evidence-note">
            This case study documents the work and selected screens. It does not
            claim a measured conversion lift.
          </p>
        </aside>
        <article>
          <section>
            <h2>Context</h2>
            <p>{study.context}</p>
          </section>
          <section>
            <h2>What I built</h2>
            <ul className="built-list">
              {study.built.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          {study.research && (
            <p className="research-callout">{study.research}</p>
          )}
          <section>
            <h2>Selected screens</h2>
            <div className="case-gallery">
              {study.gallery.map((screen) => (
                <figure
                  key={screen.img}
                  className={`case-screen case-screen-${screen.type}`}
                >
                  <Picture
                    name={screen.img}
                    alt={`${study.title}: ${screen.cap}`}
                  />
                  <figcaption>{screen.cap}</figcaption>
                </figure>
              ))}
            </div>
          </section>
          <a className="text-link" href="/work/">
            ← All selected work
          </a>
        </article>
      </div>
      <section className="section wrap">
        <Heading
          kicker="CONTINUE EXPLORING"
          title="Practical guidance for your team."
          description="Educational articles are separate from the client work above."
        />
        <div className="guide-grid">
          {guides
            .filter(
              (g) =>
                g.pillar ===
                (study.id === "fifthray"
                  ? "research"
                  : study.id === "shopdeck"
                    ? "quality"
                    : study.id === "bluatlas"
                      ? "offers"
                      : "storefront"),
            )
            .slice(0, 3)
            .map((guide, i) => (
              <GuideCard key={guide.slug} guide={guide} index={i} />
            ))}
        </div>
      </section>
      <Contact />
    </>
  );
}
function GuidesPage({ pillar }) {
  const [query, setQuery] = useState("");
  const base = pillar ? guides.filter((g) => g.pillar === pillar.id) : guides;
  const terms = query
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .map((term) => (term.length > 3 ? term.replace(/s$/, "") : term));
  const filtered = base.filter((guide) => {
    const topic = pillars.find((item) => item.id === guide.pillar);
    const searchable =
      `${guide.title} ${guide.description} ${topic.short}`.toLowerCase();
    return terms.every((term) => searchable.includes(term));
  });
  return (
    <>
      <Breadcrumbs
        items={
          pillar
            ? [{ label: "Guides", href: "/guides/" }, { label: pillar.short }]
            : [{ label: "Guides" }]
        }
      />
      <PageIntro
        kicker="THE MERCHANT’S FIELD NOTES"
        title={
          pillar ? (
            pillar.title
          ) : (
            <>
              Make the next
              <br />
              <em>decision clearer.</em>
            </>
          )
        }
      >
        <p>
          {pillar
            ? pillar.description
            : `${guides.length} practical guides to Shopify customization and full-stack CRO. Customer questions, implementation decisions and checks you can take to your team.`}
        </p>
      </PageIntro>
      <section className="wrap guide-library">
        <Pillars active={pillar?.id} />
        <div className="library-toolbar">
          <div>
            <label htmlFor="guide-search">Find a guide</label>
            <input
              id="guide-search"
              type="search"
              placeholder="Try cart, subscriptions or research"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <p role="status">
            {filtered.length} {filtered.length === 1 ? "guide" : "guides"}
            {query ? ` matching “${query}”` : " to explore"}
            {pillar && (
              <>
                {" "}
                · <a href="/guides/">All topics</a>
              </>
            )}
          </p>
        </div>
        <div className="guide-grid">
          {filtered.map((guide, i) => (
            <GuideCard key={guide.slug} guide={guide} index={i} />
          ))}
        </div>
        {!filtered.length && (
          <p className="empty-results">
            No guides match yet. Try a broader term such as “cart” or clear the
            search.
          </p>
        )}
        <div className="editorial-note">
          <h2>Useful before you open the theme editor.</h2>
          <p>
            These articles explain decisions, practical handoffs and QA. They
            are educational guidance, not proof that an idea will increase
            sales. Check current Shopify plan eligibility and validate any
            implementation in your own store.
          </p>
          <a className="text-link" href="/lab/">
            Practice with the CRO Lab <Arrow />
          </a>
        </div>
      </section>
      <Contact />
    </>
  );
}
function GuidePage({ guide }) {
  const pillar = pillars.find((p) => p.id === guide.pillar);
  const selected = guide.related
    .map((slug) => guides.find((g) => g.slug === slug))
    .filter(Boolean);
  const related = [
    ...selected,
    ...guides.filter(
      (g) =>
        g.pillar === guide.pillar &&
        g.slug !== guide.slug &&
        !selected.includes(g),
    ),
  ].slice(0, 3);
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Guides", href: "/guides/" },
          { label: pillar.short, href: `/guides/topics/${pillar.id}/` },
          { label: guide.title },
        ]}
      />
      <header className="article-header wrap">
        <a className="eyebrow" href={`/guides/topics/${pillar.id}/`}>
          {pillar.short}
        </a>
        <h1>{guide.title}</h1>
        <p className="article-deck">{guide.description}</p>
        <div className="article-byline">
          <Picture name="avatar" alt="" />
          <p>
            By <a href="/about/">Thomas Maghanga</a>
            <span>
              Reviewed <time dateTime={guide.date}>28 October 2026</time> ·{" "}
              {guide.readingMinutes} min read
            </span>
          </p>
          <Pill>Merchant guide</Pill>
        </div>
      </header>
      <div className="article-layout wrap">
        <aside className="article-toc">
          <nav aria-label="In this guide">
            <h2>In this guide</h2>
            {guide.sections.map((s) => (
              <a key={s.id} href={`#${s.id}`}>
                {s.title}
              </a>
            ))}
            <a href="#sources">Sources & further reading</a>
          </nav>
          <a className="text-link" href="/lab/">
            Try the CRO Lab <Arrow />
          </a>
        </aside>
        <article className="article-body">
          <div className="article-intro">
            {guide.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          {guide.sections.map((s) => (
            <section key={s.id} id={s.id}>
              <h2>{s.title}</h2>
              {s.paragraphs?.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {s.steps && (
                <ol>
                  {s.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              )}
              {s.code && (
                <figure className="code-example">
                  <figcaption>
                    {s.codeLabel ||
                      "Illustrative example — validate in a development store before use."}
                  </figcaption>
                  <pre>
                    <code>{s.code}</code>
                  </pre>
                </figure>
              )}
              {s.checklist && (
                <div className="qa-checklist">
                  <h3>Checks to take to your team</h3>
                  <ul>
                    {s.checklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          ))}
          <aside className="article-takeaway">
            <p className="eyebrow">TAKE THIS INTO THE NEXT CONVERSATION</p>
            <p>{guide.takeaway}</p>
          </aside>
          <section id="sources" className="article-sources">
            <h2>Sources & further reading</h2>
            <p>
              Primary documentation and credited teaching used for this guide.
              Platform details can change; confirm the current documentation
              before implementation.
            </p>
            <ul>
              {guide.sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url}>
                    {source.label} <Arrow />
                  </a>
                </li>
              ))}
            </ul>
          </section>
          <aside className="article-next">
            <h2>Need help turning the brief into a storefront change?</h2>
            <p>
              I combine Shopify development, customer research and CRO
              implementation. Tell me what your team needs to investigate or
              build.
            </p>
            <a className="button" href="mailto:thomas@maghanga.com">
              Discuss your project <Arrow />
            </a>
            <a className="text-link" href={`/work/${pillar.work}/`}>
              Explore selected client work <Arrow />
            </a>
            <small>
              Client case studies document specific contributions. This guide is
              educational.
            </small>
          </aside>
        </article>
      </div>
      <section className="section wrap">
        <Heading
          kicker="KEEP THE THREAD GOING"
          title="Related guides"
          href={`/guides/topics/${pillar.id}/`}
          link={`Explore ${pillar.short.toLowerCase()}`}
        />
        <div className="guide-grid">
          {related.map((g, i) => (
            <GuideCard key={g.slug} guide={g} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
function LabPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "CRO Lab" }]} />
      <PageIntro
        kicker="LEARN BY DOING"
        title={
          <>
            A small idea.
            <br />
            <em>A clearer experience.</em>
          </>
        }
      >
        <p>
          The CRO Lab brings research ideas into a working educational
          storefront. Use it to practice asking better questions, then take a
          considered brief to your team.
        </p>
      </PageIntro>
      <LabFeature full />
      <section className="section wrap">
        <Heading
          kicker="WHAT YOU CAN EXPLORE"
          title="From explanation to interaction."
        />
        <div className="lab-paths">
          <article>
            <span className="number">01</span>
            <h3>Merchant lessons</h3>
            <p>
              Explore seven shopper questions. Compare an original explanation
              with a possible improvement, see what evidence to gather and draft
              a test plan.
            </p>
            <a className="text-link" href={`${LAB}#improvements`}>
              Explore improvements <Arrow />
            </a>
          </article>
          <article>
            <span className="number">02</span>
            <h3>A fictional buying journey</h3>
            <p>
              Switch to Shopper preview inside the Lab to try the FORM & FIELD
              coffee page, voluntary subscriptions, larger bags and a one-time
              scoop offer.
            </p>
            <a className="text-link" href={LAB}>
              Open the Lab <Arrow />
            </a>
          </article>
          <article>
            <span className="number">03</span>
            <h3>The implementation evidence</h3>
            <p>
              Optional developer details connect interactions to source code and
              a validation plan. The separate Liquid examples still need Shopify
              development-store validation.
            </p>
            <a
              className="text-link"
              href={`${SOURCE}/blob/main/docs/TESTING-GUIDE.md`}
            >
              Read the testing guide <Arrow />
            </a>
          </article>
        </div>
        <div className="editorial-note">
          <h2>Good teaching names its sources.</h2>
          <p>
            The Lab’s merchant lessons interpret ideas from Rishi Rawat /
            Frictionless Commerce and customer-review research discussed by
            Lorenzo Carreri. The Lab links the original sources beside each
            lesson. These are independent educational interpretations, with no
            endorsement implied.
          </p>
          <a className="text-link" href={SOURCE}>
            Explore the source repository <Arrow />
          </a>
        </div>
      </section>
      <GuidesFeature />
      <Contact />
    </>
  );
}
function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "About" }]} />
      <PageIntro
        kicker="THOMAS MAGHANGA"
        title={
          <>
            The build matters.
            <br />
            <em>So does the reason.</em>
          </>
        }
      >
        <p>
          Shopify Plus Developer & CRO Specialist. Based in Nairobi, working
          with DTC teams remotely.
        </p>
      </PageIntro>
      <section className="section wrap about-page" id="thomas">
        <Picture
          name="portrait"
          alt="Thomas Maghanga, Shopify Plus developer and CRO specialist"
        />
        <div>
          <h2>Customer questions are part of the development brief.</h2>
          <p>
            Since 2021, I’ve worked on DTC storefronts, bringing customer
            research, development and experimentation together. I work with
            growth, media and creative teams to turn storefront problems into
            clear development tasks.
          </p>
          <p>
            My focus is maintainable code, usable buying flows and careful
            measurement. That means looking at the question behind a page
            change, checking the important journeys and documenting what the
            evidence can support.
          </p>
          <dl className="experience-list">
            <div>
              <dt>Fifth Ray</dt>
              <dd>
                Shopify CRO Developer · Contract
                <span>February–August 2026</span>
              </dd>
            </div>
            <div>
              <dt>Foundry Brands</dt>
              <dd>
                Shopify Developer<span>2023–2025</span>
              </dd>
            </div>
            <div>
              <dt>Supply Co</dt>
              <dd>
                Shopify Developer & CRO Specialist<span>2021–2023</span>
              </dd>
            </div>
          </dl>
          <Resume />
          <a className="text-link" href="/work/">
            See the work in context <Arrow />
          </a>
        </div>
      </section>
      <section
        className="implementation-details wrap"
        aria-label="Implementation detail"
      >
        <details>
          <summary>
            Shopify, APIs and the CRO workflow <span aria-hidden="true">+</span>
          </summary>
          <dl>
            <div>
              <dt>Storefront development</dt>
              <dd>
                Liquid, JavaScript, HTML, CSS, Online Store 2.0, metaobjects and
                Shopify Functions.
              </dd>
            </div>
            <div>
              <dt>APIs and workflow</dt>
              <dd>
                Storefront API, Cart API, Shopify Subscriptions API and Git.
              </dd>
            </div>
            <div>
              <dt>Research and implementation tools</dt>
              <dd>GA4, Shopify Analytics, Intelligems, Rebuy and Replo.</dd>
            </div>
          </dl>
          <p>
            These are overall capabilities. Each case study separately
            identifies my contribution to that project.
          </p>
        </details>
      </section>
      <section className="section process-section" id="availability">
        <div className="wrap availability-grid">
          <div>
            <p className="eyebrow">WORKING TOGETHER</p>
            <h2>
              A clear role.
              <br />A connected workflow.
            </h2>
            <p>Open to remote in-house roles and ongoing contracts.</p>
          </div>
          <div>
            <h3>For a merchant or growth team</h3>
            <p>
              Bring a product-page, cart, subscription or storefront problem. We
              can define the scope, implementation and checks together.
            </p>
            <h3>For a hiring manager</h3>
            <p>
              Explore the client case studies for my exact contribution, the
              public CRO Lab for implementation evidence and my résumé for
              professional experience.
            </p>
            <p>
              Nairobi, Kenya (UTC+3). Available for a full workday when
              required, with a preferred 3–4 hours of daily team overlap.
            </p>
            <a className="text-link" href="mailto:thomas@maghanga.com">
              Start a conversation <Arrow />
            </a>
          </div>
        </div>
      </section>
      <Process />
      <Contact />
    </>
  );
}
function NotFound() {
  return (
    <section className="wrap not-found">
      <p className="eyebrow">404 · PAGE NOT FOUND</p>
      <h1>
        This path doesn’t
        <br />
        <em>lead to a page.</em>
      </h1>
      <p>
        The page may have moved. Explore the guides or head back to the selected
        work.
      </p>
      <div className="actions">
        <a className="button" href="/">
          Back home <Arrow />
        </a>
        <a className="text-link" href="/guides/">
          Browse guides <Arrow />
        </a>
      </div>
    </section>
  );
}
export default function App({ path = "/" }) {
  const normalized = path === "/" ? "/" : `${path.replace(/\/+$/, "")}/`;
  const openCase = useSyncExternalStore(
    subscribe,
    caseSnapshot,
    closedSnapshot,
  );
  const closeCase = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("case");
    window.history.replaceState(null, "", url);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };
  let page;
  if (normalized === "/")
    page = (
      <>
        <Hero />
        <Brands />
        <WorkSection />
        <Capabilities />
        <Process />
        <LabProof />
        <GuidesFeature />
        <AboutPreview />
        <Contact />
      </>
    );
  else if (normalized === "/work/") page = <WorkPage />;
  else if (normalized === "/lab/") page = <LabPage />;
  else if (normalized === "/guides/") page = <GuidesPage />;
  else if (normalized === "/about/") page = <AboutPage />;
  else if (normalized.startsWith("/work/")) {
    const study = cases.find((s) => `/work/${s.id}/` === normalized);
    page = study ? <CasePage study={study} /> : <NotFound />;
  } else if (normalized.startsWith("/guides/topics/")) {
    const pillar = pillars.find(
      (p) => `/guides/topics/${p.id}/` === normalized,
    );
    page = pillar ? <GuidesPage pillar={pillar} /> : <NotFound />;
  } else {
    const guide = guides.find((g) => guideHref(g) === normalized);
    page = guide ? <GuidePage guide={guide} /> : <NotFound />;
  }
  return (
    <>
      <Header path={normalized} />
      <main id="main">{page}</main>
      <Footer />
      <CaseDialog
        study={cases.find((s) => s.id === openCase) ?? null}
        onClose={closeCase}
      />
    </>
  );
}
