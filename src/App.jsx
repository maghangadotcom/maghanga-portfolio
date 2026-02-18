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
const Hero = () => <section>Hero</section>;
const Problem = () => <section>Problem</section>;
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
