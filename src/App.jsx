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
const Process = () => <section>Process</section>;
const Work = () => <section>Work</section>;
const CompoundingEffect = () => <section>Compounding Effect</section>;
const TechStack = () => <section>Tech Stack</section>;
const About = () => <section>About</section>;
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
