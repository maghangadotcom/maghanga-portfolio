import React from 'react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-bg-primary/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <a href="#" className="text-2xl font-bold text-text-primary">TM</a>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#process" className="text-text-secondary hover:text-text-primary transition-colors">Process</a>
            <a href="#work" className="text-text-secondary hover:text-text-primary transition-colors">Work</a>
            <a href="#results" className="text-text-secondary hover:text-text-primary transition-colors">Results</a>
            <a href="#contact" className="text-text-secondary hover:text-text-primary transition-colors">Contact</a>
          </div>
          <a href="mailto:maghangamail@gmail.com" className="hidden md:block bg-accent-primary text-bg-primary font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity">
            Let's Talk
          </a>
          <div className="md:hidden">
            {/* Mobile menu button */}
          </div>
        </div>
      </div>
    </nav>
  );
};
const Hero = () => {
  return (
    <section id="hero" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div className="text-left">
            <span className="inline-block bg-accent-primary/10 text-accent-primary text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4">
              Fullstack Shopify CRO Developer
            </span>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              I find the revenue your Shopify store is leaving on the table.
            </h1>
            <p className="text-lg text-text-secondary mb-8">
              I bridge code and conversion for 7-9 figure DTC brands - building what the data says will sell, not what looks good in a pitch deck. 4+ years across 10+ brands.
            </p>
            <div className="flex space-x-4">
              <a href="#work" className="bg-accent-primary text-bg-primary font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity">
                See my work ↓
              </a>
              <a href="#process" className="bg-transparent border border-border-subtle text-text-primary font-bold py-3 px-6 rounded-lg hover:bg-border-subtle transition-colors">
                My process
              </a>
            </div>
          </div>
          {/* Right Column */}
          <div>
            {/* PDP Wireframe */}
            <div className="bg-bg-secondary p-8 rounded-lg border border-border-subtle">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-danger rounded-full"></div>
                <div className="w-3 h-3 bg-accent-tertiary rounded-full"></div>
                <div className="w-3 h-3 bg-success rounded-full"></div>
              </div>
              <div className="bg-bg-card p-6 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-1 bg-bg-card-hover h-32 rounded-md"></div>
                  <div className="col-span-1 space-y-2">
                    <div className="bg-bg-card-hover h-6 rounded-md"></div>
                    <div className="bg-bg-card-hover h-12 rounded-md"></div>
                    <div className="bg-accent-primary h-10 rounded-md"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Stats Bar */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-accent-primary font-mono">10+</p>
            <p className="text-text-muted uppercase text-sm tracking-wider">Brands built</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-accent-primary font-mono">4+</p>
            <p className="text-text-muted uppercase text-sm tracking-wider">Years in DTC</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-accent-primary font-mono">38%</p>
            <p className="text-text-muted uppercase text-sm tracking-wider">CVR lift (YoY)</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-accent-primary font-mono">~16%</p>
            <p className="text-text-muted uppercase text-sm tracking-wider">Revenue from upsells</p>
          </div>
        </div>
      </div>
    </section>
  );
};
const Problem = () => {
  return (
    <section id="problem" className="py-20 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">Sound familiar?</h2>
        <p className="text-lg text-text-secondary max-w-3xl mx-auto mb-12">
          These are the revenue killers I find in almost every store I audit.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-bg-card p-8 rounded-lg border border-border-subtle text-left">
            <h3 className="text-xl font-bold mb-4">Your PDP works hard. Your checkout doesn't.</h3>
            <p className="text-text-secondary">
              You're driving qualified traffic to a product page, but something between the Add to Cart button and the order confirmation is bleeding revenue. For one brand I audited, that gap was 89.6% - nearly double the industry standard.
            </p>
          </div>
          {/* Card 2 */}
          <div className="bg-bg-card p-8 rounded-lg border border-border-subtle text-left">
            <h3 className="text-xl font-bold mb-4">Your data is lying to you.</h3>
            <p className="text-text-secondary">
              You're making decisions based on numbers you think are right. I've found 51% discrepancies between GA4 and Shopify reporting on a live store - which means every test, every insight and every strategy built on that data was compromised.
            </p>
          </div>
          {/* Card 3 */}
          <div className="bg-bg-card p-8 rounded-lg border border-border-subtle text-left">
            <h3 className="text-xl font-bold mb-4">Your apps are eating your speed.</h3>
            <p className="text-text-secondary">
              Every third-party app adds JavaScript, network requests and render-blocking resources. I've seen stores where replacing three heavy apps with custom Liquid cut load times by 35% - and the conversion lift followed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
const Process = () => {
  const [activeStep, setActiveStep] = React.useState(1);

  const steps = [
    {
      id: 1,
      title: "Audit",
      content: "I start with the data. GA4 funnels, heatmaps, session recordings, review mining. I read what your customers are actually saying - not what you think they're saying. I mined 849+ reviews for one brand to build a customer language bank that informed every test.",
    },
    {
      id: 2,
      title: "Hypothesize",
      content: "Every change starts as a hypothesis with a measurable outcome. I build testing roadmaps prioritized by revenue impact, not by what's easiest. The PDP gets tested first because that's where buying decisions happen.",
    },
    {
      id: 3,
      title: "Build & Test",
      content: "Here's where I'm different - I don't hand off a wireframe to a developer. I write the Liquid, the JavaScript and the CSS myself. That means tests ship faster, run cleaner and I understand exactly what's being measured.",
    },
    {
      id: 4,
      title: "Analyze & Ship",
      content: "Winners get implemented. Losers get documented. Both make the next test smarter. I track CVR lift, revenue impact and statistical confidence on every experiment.",
    },
  ];

  return (
    <section id="process" className="py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">How I work.</h2>
        <p className="text-lg text-text-secondary max-w-3xl mx-auto mb-12">
          A repeatable system, not a guessing game.
        </p>
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`p-8 rounded-lg border cursor-pointer ${
                activeStep === step.id ? 'bg-bg-card border-border-accent' : 'bg-bg-secondary border-border-subtle'
              }`}
              onClick={() => setActiveStep(step.id)}
            >
              <h3 className="text-xl font-bold mb-4">{step.title}</h3>
            </div>
          ))}
        </div>
        <div className="mt-12 text-left bg-bg-secondary p-8 rounded-lg border border-border-subtle min-h-[150px]">
          <p className="text-text-secondary">{steps.find(step => step.id === activeStep).content}</p>
        </div>
      </div>
    </section>
  );
};
const Work = () => {
  const caseStudies = [
    {
      title: "Supply.co",
      cvrLift: "+38%",
      revenue: "+16% of annual (upsells)",
      description: "Two years as the primary CRO technical resource. Built Rebuy-powered upsell flows, optimized PDPs from heatmap data and improved site speed by 35%. The conversion lift compounded across the entire funnel.",
    },
    {
      title: "Fifth Ray",
      funnelLeak: "89.6%",
      reviewsMined: "849+",
      description: "Inherited a store with broken analytics, a 51% data discrepancy and a checkout drop-off nearly double the industry benchmark. Built the measurement foundation first - because if you can't measure it, you can't test it. Now running structured A/B tests on Intelligems.",
    },
    {
      title: "Foundry Brands",
      stores: "10+",
      speed: "+35% improvement",
      description: "Rebuilt theme architecture across a portfolio of 7-9 figure stores. Replaced heavy third-party apps with lean custom Liquid, built subscription flows and bundle systems and created modular section libraries that let marketing ship without developer bottleneck.",
    },
  ];

  const tools = [
    "Shopify Liquid", "GA4", "GTM", "Intelligems", "Microsoft Clarity", "Hotjar", "Klaviyo", "Rebuy", "Skio", "Recharge", "Figma", "Shopify Flow", "Elevar", "JavaScript", "HTML/CSS", "OS 2.0", "MetaFields", "Git/GitHub"
  ];

  const CaseStudyCard = ({ study }) => (
    <div className="bg-bg-card p-8 rounded-lg border border-border-subtle text-left">
      <h3 className="text-xl font-bold mb-4">{study.title}</h3>
      <div className="flex space-x-4 mb-4">
        {study.cvrLift && <p className="text-accent-primary font-mono">{study.cvrLift} CVR LIFT</p>}
        {study.revenue && <p className="text-accent-primary font-mono">{study.revenue}</p>}
        {study.funnelLeak && <p className="text-accent-primary font-mono">{study.funnelLeak} FUNNEL LEAK</p>}
        {study.reviewsMined && <p className="text-accent-primary font-mono">{study.reviewsMined} REVIEWS MINED</p>}
        {study.stores && <p className="text-accent-primary font-mono">{study.stores} STORES</p>}
        {study.speed && <p className="text-accent-primary font-mono">{study.speed}</p>}
      </div>
      <p className="text-text-secondary">{study.description}</p>
    </div>
  );

  return (
    <section id="work" className="py-20 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">The numbers speak.</h2>
        <p className="text-lg text-text-secondary max-w-3xl mx-auto mb-12">
          Real results from real stores. Not vanity metrics.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={index} study={study} />
          ))}
        </div>
        <div className="mt-20 overflow-x-hidden">
          <div className="flex animate-scroll">
            {tools.map((tool, index) => (
              <span key={index} className="mx-4 text-text-muted whitespace-nowrap">{tool}</span>
            ))}
            {tools.map((tool, index) => (
              <span key={index} className="mx-4 text-text-muted whitespace-nowrap">{tool}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
const CompoundingEffect = () => {
  const milestones = [
    {
      month: "Month 1",
      title: "Fix the foundation",
      description: "Analytics audit. Baseline metrics. First A/B test ships. If we can't measure it, we're guessing.",
    },
    {
      month: "Month 2",
      title: "Find the first winner",
      description: "PDP tests based on real user behavior. Cart and checkout friction removed. Upsell flows optimized.",
    },
    {
      month: "Month 3",
      title: "Expand and iterate",
      description: "Re-test winners for further lift. Homepage and collection page optimization. Landing page development.",
    },
    {
      month: "Month 4+",
      title: "Continuous engine",
      description: "Repeatable CRO system in place. Testing roadmap, documentation and reporting cadence. Every month gets better.",
    },
  ];

  return (
    <section id="results" className="py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">CRO compounds.</h2>
        <p className="text-lg text-text-secondary max-w-3xl mx-auto mb-12">
          Each winning test stacks on the last. Month 6 you isn't competing with month 1 you.
        </p>
        {/* Chart */}
        <div className="bg-bg-secondary p-8 rounded-lg border border-border-subtle mb-12">
          <svg width="100%" height="300" viewBox="0 0 800 300">
            <line x1="0" y1="250" x2="800" y2="250" stroke="#4A5568" strokeDasharray="4" />
            <path d="M 0 250 Q 200 150, 400 100 T 800 50" stroke="#00e5a0" fill="none" strokeWidth="2" />
          </svg>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {milestones.map((milestone, index) => (
            <div key={index} className="bg-bg-card p-8 rounded-lg border border-border-subtle text-left">
              <h3 className="text-xl font-bold mb-4">{milestone.title}</h3>
              <p className="text-text-secondary">{milestone.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
const TechStack = () => {
  const stacks = [
    {
      title: "Research & Analytics",
      tools: ["GA4", "Google Tag Manager", "Microsoft Clarity", "Hotjar", "Elevar", "Shopify Analytics", "Review Mining", "Customer Surveys"],
    },
    {
      title: "Testing & Implementation",
      tools: ["Intelligems", "Shopify Liquid", "JavaScript", "HTML/CSS", "OS 2.0", "Web Components", "AJAX", "MetaFields/MetaObjects", "Core Web Vitals (LCP, CLS, INP)"],
    },
    {
      title: "Commerce & Retention",
      tools: ["Klaviyo", "Rebuy", "Skio", "Recharge", "Shopify Flow", "Shopify Functions", "Customer Accounts API", "Subscription Architecture", "Bundle Builders"],
    },
  ];

  return (
    <section id="tech-stack" className="py-20 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">What I work with.</h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto mb-12">
            The full stack - from data collection to test deployment.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {stacks.map((stack, index) => (
            <div key={index} className="bg-bg-card p-8 rounded-lg border border-border-subtle">
              <h3 className="text-xl font-bold mb-4">{stack.title}</h3>
              <ul className="space-y-2">
                {stack.tools.map((tool, i) => (
                  <li key={i} className="text-text-secondary">{tool}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-center text-text-muted mt-12">
          I also leverage AI and agentic workflows to accelerate research, automate repetitive analysis and ship faster. Tools are only as good as the thinking behind them.
        </p>
      </div>
    </section>
  );
};
const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-8">How I think about this work.</h2>
        <div className="space-y-6 text-lg text-text-secondary">
          <p>
            I work like an internal builder, not a ticket-taker. I'm comfortable owning technical decisions, collaborating across teams and shipping fixes while stores are live - often across multiple time zones.
          </p>
          <p>
            I think in commercial terms - trust, friction, perceived value and how decisions on the storefront impact ROAS. Every pixel serves a function in the revenue engine or it doesn't belong.
          </p>
          <p>
            I prioritize clarity, performance and maintainability because Shopify stores don't get second chances under traffic. The work I ship today shouldn't become technical debt tomorrow.
          </p>
        </div>
      </div>
    </section>
  );
};
const Contact = () => <section>Contact</section>;

function App() {
  return (
    <div className="bg-bg-primary">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Process />
        <Work />
        <CompoundingEffect />
        <TechStack />
        <About />
        <Contact />
      </main>
    </div>
  );
}

export default App;
