import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  Code2,
  CheckCircle2,
  Minus,
  Plus,
  Search,
  ArrowUpRight
} from 'lucide-react';

import profPic from './assets/prof-pic.png';

// --- Configuration & Data ---

const PORTFOLIO_DATA = {
  name: "Thomas Maghanga",
  tagline: "Technical Strategy Meets Conversion Craftsmanship",
  about: {
    title: "Welcome",
    content: [
      "If you're reading this, you're probably a fellow builder who believes that a great story, thoughtful UX and a dash of daring can transform a business. I’m the engineer behind many of the direct‑to‑consumer experiences at Foundry Brands, helping household names sharpen their edge on Shopify.",
      "From upgrading razor brands that appeared on Shark Tank to launching AI‑driven personalisation tools, I’ve been an owner, decision‑maker and hands‑on coder every step of the way.",
      "Over the last few years I've led the rebuilds and growth experiments for brands like Supply, Blu Atlas, Benevolence LA, Brute Magnetics and TechnoRV."
    ],
    image: profPic
  },
  whyMe: [
    {
      title: "Owner-level involvement",
      description: "I’m not a contractor executing tickets. I lead discovery, prioritise roadmaps, write the code and test the results. The goal is to build what the business actually needs, not just what is easy to ship."
    },
    {
      title: "Evidence-driven design",
      description: "Heat-maps, user recordings, review mining and A/B tests inform every decision. If we add a progress bar to the cart, it's because we saw drop-off in analytics and validated the fix with split tests."
    },
    {
      title: "Infrastructure and tooling",
      description: "I set up GA4, GTM, Elevar, and server-side tracking to ensure our data is first-party, accurate and compliant. I also created internal tools like ShopDeck to speed up theme work."
    },
    {
      title: "Ecosystem know-how",
      description: "Beyond Shopify, I’ve migrated and troubleshot third-party systems like Klaviyo, Recharge, Rebuy and Skio. I understand their APIs to ensure seamless migrations."
    }
  ],
  caseStudies: [
    {
      id: "01",
      title: "Re-Architecting Supply on OS 2.0",
      context: "Supply’s site was running on an older theme with slow load times. We migrated to a modern OS 2.0 foundation without sacrificing conversion.",
      role: "Architect and lead developer. I built a custom OS 2.0 theme from scratch using Liquid and JSON sections.",
      metrics: [
        { label: "Page Speed", before: "3–4s FCP", after: "~1.2s FCP" },
        { label: "Conversion Rate", before: "2.5%", after: "3.4%" },
        { label: "AOV Growth", before: "$75", after: "$88" }
      ],
      highlights: [
        "Gamified cart progress bar rewards.",
        "Modular section architecture.",
        "Server-side tracking implementation."
      ],
      gallery: [
        "https://images.unsplash.com/photo-1626073766483-360e2d5392bc?q=80&w=1200",
        "https://images.unsplash.com/photo-1585914641050-fa9883c4e21c?q=80&w=1200",
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200",
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200",
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1200"
      ]
    },
    {
      id: "02",
      title: "Campaign Landing Pages (3–6% CVR)",
      context: "Supply needed high-converting landing pages for paid social. Drag-and-drop builders were too slow and bloated.",
      role: "Built custom high-performance templates in Liquid/JS. Focused on mobile-first speed and storytelling.",
      metrics: [
        { label: "CVR", before: "1.8%", after: "4.5% avg" },
        { label: "Load Time", before: "2.8s", after: "0.9s" }
      ],
      highlights: [
        "Rishi Rawat-style storytelling flow.",
        "Native Liquid for zero-latency loading.",
        "Integrated A/B testing widgets."
      ],
      gallery: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200",
        "https://images.unsplash.com/photo-1551288049-bbda48658a7d?q=80&w=1200",
        "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200",
        "https://images.unsplash.com/photo-1454165833767-1390e7490f0a?q=80&w=1200"
      ]
    },
    {
      id: "03",
      title: "Data-Driven Upsells & Cross-Sells",
      context: "Foundry Brands wanted to increase revenue without relying solely on new traffic acquisition.",
      role: "Implemented intelligent upsell logic using Rebuy APIs and custom Liquid cart drawers.",
      metrics: [
        { label: "Store CVR", before: "Baseline", after: "+38%" },
        { label: "Upsell Rev", before: "2%", after: "16% of total" }
      ],
      highlights: [
        "Review mining for customer objections.",
        "Dynamic shipping threshold calculation.",
        "Contextual 'Complete the Look' modules."
      ],
      gallery: [
        "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1200",
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200",
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200",
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200"
      ]
    },
    {
      id: "04",
      title: "AI-Driven Quiz Flow Personalisation",
      context: "Generic quiz apps felt limited. We needed a tailored experience to educate customers on complex skincare.",
      role: "Customized headless logic for Blu Atlas to auto-bundle products based on skin type.",
      metrics: [
        { label: "Quiz Completion", before: "0%", after: "71%" },
        { label: "Quiz CVR", before: "N/A", after: "8.4%" }
      ],
      highlights: [
        "Seamless Klaviyo data syncing.",
        "Interactive progress tracking.",
        "Zero-friction 'Add to Cart' from results."
      ],
      gallery: [
        "https://images.unsplash.com/photo-1551288049-bbda48658a7d?q=80&w=1200",
        "https://images.unsplash.com/photo-1454165833767-1390e7490f0a?q=80&w=1200",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200"
      ]
    },
    {
      id: "05",
      title: "Blu Atlas Performance Optimization",
      context: "Global scaling required ultra-fast global performance. The legacy site struggled with heavy assets and scripts.",
      role: "Cleaned up third-party script bloat and optimized image delivery pipelines.",
      metrics: [
        { label: "Lighthouse Score", before: "42", after: "94" },
        { label: "Bounce Rate", before: "58%", after: "41%" }
      ],
      highlights: [
        "Critical CSS path injection.",
        "Lazy-loading script manager.",
        "Modern WebP/AVIF delivery."
      ],
      gallery: [
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1200",
        "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1200",
        "https://images.unsplash.com/photo-1504868584819-f8e905263543?q=80&w=1200"
      ]
    },
    {
      id: "06",
      title: "TechnoRV Subscription Migration",
      context: "Migrating from Recharge to Skio to improve subscriber retention and lower management friction.",
      role: "Lead migration engineer. Managed API data transfer and custom subscriber dashboard dev.",
      metrics: [
        { label: "Churn Rate", before: "8.2%", after: "5.4%" },
        { label: "CS Tickets", before: "100/wk", after: "35/wk" }
      ],
      highlights: [
        "Zero-downtime migration.",
        "Custom customer portal logic.",
        "SMS-based management integration."
      ],
      gallery: [
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200",
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200",
        "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200"
      ]
    },
    {
      id: "07",
      title: "Benevolence LA Gift Personalization",
      context: "Holiday gifting is peak season. We needed a way to add personal messages and gift wrapping without custom apps.",
      role: "Built a native Liquid gifting engine that allows per-item messages and wrapping options.",
      metrics: [
        { label: "Gifting AOV", before: "$42", after: "$59" },
        { label: "Wrapping Uptake", before: "2%", after: "14%" }
      ],
      highlights: [
        "Per-item customization logic.",
        "Inventory-linked gift wrap variants.",
        "Mobile-optimized input UX."
      ],
      gallery: [
        "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=1200",
        "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1200",
        "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?q=80&w=1200"
      ]
    },
    {
      id: "08",
      title: "Foundry Internal 'ShopDeck' Tooling",
      context: "Managing multiple Shopify themes was becoming inefficient. Developers needed a way to sync sections across brands.",
      role: "Architected a custom CLI tool using Node.js to sync, deploy, and version control Liquid components.",
      metrics: [
        { label: "Dev Velocity", before: "1x", after: "3.5x" },
        { label: "Error Rate", before: "High", after: "Near Zero" }
      ],
      highlights: [
        "Cross-store component syncing.",
        "Automated regression testing.",
        "CI/CD pipeline for theme assets."
      ],
      gallery: [
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200",
        "https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=1200",
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200"
      ]
    }
  ]
};

// --- Components ---

const Marquee = () => {
  const brands = ['SUPPLY', 'BLU ATLAS', 'BENEVOLENCE LA', 'BRUTE MAGNETICS', 'TECHNORV', 'FOUNDRY BRANDS'];
  return (
    <div className="overflow-hidden border-y border-zinc-100 py-10 bg-white group">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex gap-20 items-center mx-10">
            {brands.map(brand => (
              <span key={brand} className="text-3xl font-black tracking-tighter text-zinc-300 hover:text-black transition-colors flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-[10px] text-zinc-400">LOGO</span>
                {brand}
              </span>
            ))}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

const ImageGallery = ({ images = [] }) => {
  const [cinemaImage, setCinemaImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const loopedImages = [...images, ...images, ...images];
  const offsetMultiplier = images.length;

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <>
      <div className="relative group w-full overflow-hidden py-4">
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
          style={{ transform: `translateX(calc(-${(currentIndex + offsetMultiplier) * (100 / 3)}%))` }}
        >
          {loopedImages.map((img, i) => (
            <div key={i} className="min-w-[100%] md:min-w-[33.333%] px-2">
              <div
                className="relative aspect-[4/5] md:aspect-square overflow-hidden rounded-2xl bg-zinc-100 cursor-zoom-in border border-zinc-100 group/item"
                onClick={() => { setCinemaImage(img); setZoomLevel(1); }}
              >
                <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur p-3 rounded-full shadow-xl translate-y-4 group-hover/item:translate-y-0 transition-transform">
                    <Search size={20} className="text-black" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-white/90 backdrop-blur-md rounded-full shadow-2xl border border-zinc-200 opacity-0 group-hover:opacity-100 transition-all hover:bg-black hover:text-white z-10"><ChevronLeft size={24} /></button>
        <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-white/90 backdrop-blur-md rounded-full shadow-2xl border border-zinc-200 opacity-0 group-hover:opacity-100 transition-all hover:bg-black hover:text-white z-10"><ChevronRight size={24} /></button>
        <div className="flex justify-center gap-2 mt-8">
          {images.map((_, i) => (
            <div key={i} className={`h-1.5 transition-all rounded-full ${currentIndex === i ? 'w-8 bg-[#b8ff00]' : 'w-2 bg-zinc-200'}`} />
          ))}
        </div>
      </div>

      {cinemaImage && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 animate-in fade-in duration-300">
          <button onClick={() => setCinemaImage(null)} className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors p-4"><X size={32} /></button>
          <div className="relative w-full h-full flex items-center justify-center p-8 overflow-hidden">
            <img src={cinemaImage} className="max-w-full max-h-full object-contain transition-transform duration-300 ease-out cursor-grab active:cursor-grabbing" style={{ transform: `scale(${zoomLevel})` }} alt="Enlarged view" />
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-white/10 backdrop-blur-xl border border-white/20 p-2 rounded-full px-6 shadow-2xl">
              <button onClick={() => setZoomLevel(prev => Math.max(0.5, prev - 0.25))} className="text-white hover:text-[#b8ff00] p-2"><Minus size={20} /></button>
              <span className="text-white font-mono font-bold text-xs min-w-[3rem] text-center">{Math.round(zoomLevel * 100)}%</span>
              <button onClick={() => setZoomLevel(prev => Math.min(3, prev + 0.25))} className="text-white hover:text-[#b8ff00] p-2"><Plus size={20} /></button>
              <div className="w-px h-4 bg-white/20" />
              <button onClick={() => setCinemaImage(null)} className="text-white/60 hover:text-white text-[10px] font-black uppercase tracking-widest">Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Navbar = ({ activePage, setActivePage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const links = [{ name: 'About Me', id: 'about' }, { name: 'Why Me', id: 'whyme' }, { name: 'Case Studies', id: 'casestudies' }];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="font-bold tracking-tighter text-xl cursor-pointer hover:opacity-70 transition-opacity flex items-center gap-2" onClick={() => setActivePage('about')}>
          <div className="w-6 h-6 bg-[#b8ff00] rounded-sm rotate-45" />
          THOMAS <span className="text-zinc-400 font-normal">MAGHANGA</span>
        </div>
        <div className="hidden md:flex gap-10">
          {links.map(link => (
            <button key={link.id} onClick={() => setActivePage(link.id)} className={`text-sm uppercase tracking-widest font-bold transition-all border-b-2 py-2 ${activePage === link.id ? 'border-[#b8ff00] text-black' : 'border-transparent text-zinc-400 hover:text-black'}`}>{link.name}</button>
          ))}
        </div>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X size={24} /> : <Menu size={24} />}</button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white border-b border-zinc-200 py-6 px-6 flex flex-col gap-4">
          {links.map(link => (
            <button key={link.id} onClick={() => { setActivePage(link.id); setIsOpen(false); }} className="text-lg font-bold text-left">{link.name}</button>
          ))}
        </div>
      )}
    </nav>
  );
};

const CaseStudyCard = ({ study, onSelect }) => (
  <div className="group relative bg-white border border-zinc-100 p-8 rounded-2xl hover:bg-zinc-50 transition-all cursor-pointer overflow-hidden flex flex-col min-h-[420px]" onClick={() => onSelect(study)}>
    <div className="absolute top-0 right-0 w-24 h-24 bg-[#b8ff00] translate-x-1/2 -translate-y-1/2 rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-500" />
    <div className="flex justify-between items-start mb-8">
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] bg-[#b8ff00] px-2 py-0.5 rounded-sm shadow-sm">0{study.id}</span>
      <ArrowUpRight className="text-zinc-300 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" size={24} />
    </div>
    <div className="flex-grow">
      <h3 className="text-3xl font-black mb-4 leading-[1.1] tracking-tighter uppercase">{study.title}</h3>
      <p className="text-zinc-500 line-clamp-3 text-sm leading-relaxed mb-8">{study.context}</p>
    </div>
    <div className="mt-auto pt-8 border-t border-zinc-100">
      <div className="flex flex-wrap gap-2">
        {study.metrics && study.metrics.slice(0, 2).map((m, i) => (
          <div key={i} className="flex flex-col">
            <span className="text-[8px] uppercase tracking-widest text-zinc-400 font-bold">{m.label}</span>
            <span className="text-sm font-black text-black">{m.after}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const CaseStudyModal = ({ study, onClose }) => {
  if (!study) return null;
  const metrics = study.metrics || [];
  const highlights = study.highlights || [];
  const gallery = study.gallery || [];

  return (
    <div className="fixed inset-0 z-[100] bg-white overflow-y-auto animate-in fade-in slide-in-from-bottom-8 duration-500 pb-20">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <button onClick={onClose} className="fixed top-6 right-6 p-4 bg-zinc-100/80 backdrop-blur rounded-full hover:bg-[#b8ff00] transition-all z-[110] group"><X size={24} className="group-hover:rotate-90 transition-transform" /></button>
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <span className="px-3 py-1 bg-black text-white text-[10px] font-black tracking-widest uppercase rounded-full">STUDY 0{study.id}</span>
            <div className="h-px bg-zinc-100 flex-grow" />
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-12 leading-[0.85] uppercase max-w-5xl">{study.title}</h1>
          <div className="grid md:grid-cols-2 gap-16 border-y border-zinc-100 py-16">
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#b8ff00] mb-6 bg-black w-fit px-3 py-1 rounded">The Challenge</h4>
              <p className="text-zinc-700 leading-snug text-2xl font-medium">{study.context}</p>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-6">Execution & Role</h4>
              <p className="text-zinc-500 leading-relaxed text-lg">{study.role}</p>
            </div>
          </div>
        </div>
        <div className="space-y-24">
          <div className="w-full">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-6 px-2">Visual Proof (Scrollable)</h4>
            <ImageGallery images={gallery} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {metrics.length > 0 && (
              <div className="bg-black text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#b8ff00]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#b8ff00] mb-10">Data Impact</h4>
                <div className="space-y-8">
                  {metrics.map((m, i) => (
                    <div key={i} className="group">
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">{m.label}</span>
                        <span className="text-xs text-zinc-600 font-mono italic">Prev: {m.before}</span>
                      </div>
                      <div className="text-5xl font-black flex items-center gap-3">
                        <span className="text-[#b8ff00]">↑</span>
                        {m.after}
                      </div>
                      <div className="h-1 bg-zinc-800 mt-4 rounded-full overflow-hidden">
                        <div className="h-full bg-[#b8ff00] w-3/4" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {highlights.length > 0 && (
              <div className="p-12 border-2 border-zinc-100 rounded-[3rem]">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-8">Technical Wins</h4>
                <ul className="space-y-8">
                  {highlights.map((h, i) => (
                    <li key={i} className="flex gap-6 items-start">
                      <div className="w-8 h-8 bg-zinc-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"><CheckCircle2 size={16} className="text-[#b8ff00]" /></div>
                      <span className="text-zinc-600 font-medium leading-snug text-lg">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="mt-40 pt-20 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col">
            <span className="text-[10px] font-black tracking-[0.5em] text-zinc-300 uppercase mb-2">Build Better</span>
            <span className="text-sm font-bold text-zinc-400">Next study available on request.</span>
          </div>
          <button onClick={onClose} className="group px-12 py-6 bg-black text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#b8ff00] hover:text-black transition-all flex items-center gap-4">Close Document <ArrowRight className="group-hover:translate-x-2 transition-transform" /></button>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activePage, setActivePage] = useState('about');
  const [selectedStudy, setSelectedStudy] = useState(null);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [activePage]);
  useEffect(() => { document.body.style.overflow = selectedStudy ? 'hidden' : 'unset'; }, [selectedStudy]);

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#b8ff00] selection:text-black antialiased">
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      <main className="pt-32 pb-24 max-w-7xl mx-auto px-6">
        {/* Page 1: About */}
        {activePage === 'about' && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex flex-col lg:flex-row gap-20 items-center lg:items-start">
              {/* Left Content Column */}
              <div className="lg:w-7/12 order-2 lg:order-1">
                <h1 className="text-7xl md:text-[9rem] font-black tracking-tighter mb-12 leading-[0.8] uppercase">
                  Technical <br /> Strategy <br /> <span className="text-[#b8ff00] stroke-black stroke-2" style={{ WebkitTextStroke: '3px black' }}>Meets</span> <br /> Conversion.
                </h1>

                <div className="space-y-8 text-2xl font-medium text-zinc-700 leading-[1.2] max-w-2xl">
                  {PORTFOLIO_DATA.about.content.map((p, i) => (
                    <p key={i} className={i === 0 ? "text-zinc-900 font-bold" : ""}>
                      {p}
                    </p>
                  ))}
                </div>

                <div className="mt-20 flex flex-wrap gap-6">
                  <button
                    onClick={() => setActivePage('casestudies')}
                    className="group px-12 py-8 bg-black text-white rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-4 hover:bg-[#b8ff00] hover:text-black transition-all shadow-xl"
                  >
                    See My Previous Work  <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </button>
                  <button onClick={() => window.location.href = 'mailto:neilmaghanga@proton.me'} className="w-full md:w-auto px-12 py-6 md:py-8 bg-white text-black border-2 border-black rounded-full font-black text-[10px] md:text-xs uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-[#b8ff00] hover:border-[#b8ff00] hover:text-black transition-all">
                    Book a Discovery Call <ArrowUpRight size={18} />
                  </button>
                </div>
              </div>

              {/* Right Media Column */}
              <div className="lg:w-5/12 order-1 lg:order-2">
                <div className="sticky top-32 flex flex-col items-center lg:items-end w-full">
                  <div className="relative inline-block">
                    <div className="w-full max-w-[340px] md:w-80 h-[480px] rounded-[3rem] overflow-hidden bg-zinc-100 border-2 border-zinc-100 shadow-2xl -rotate-2">
                      <img
                        src={PORTFOLIO_DATA.about.image}
                        className="w-full h-full object-cover grayscale brightness-110"
                        alt="Profile"
                      />
                    </div>
                    <div className="absolute -bottom-8 -left-8 bg-[#b8ff00] w-24 h-24 flex items-center justify-center rounded-3xl shadow-2xl rotate-12">
                      <Code2 size={40} className="text-black" />
                    </div>
                  </div>

                  <div className="mt-16 text-center lg:text-right space-y-6 max-w-[280px]">
                    <div className="flex items-center gap-3 text-[10px] font-black tracking-widest uppercase text-black bg-[#b8ff00] w-fit px-4 py-2 rounded-full mx-auto lg:ml-auto lg:mr-0">
                      <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      Currently Available
                    </div>
                    <p className="text-zinc-400 text-sm font-bold leading-relaxed uppercase tracking-tighter">
                      Building the future of e-commerce commerce from the ground up.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-20">
              <div className="mb-10 flex justify-between items-end border-b-2 border-zinc-100 pb-4">
                <span className="text-[10px] font-black tracking-[0.6em] text-zinc-300 uppercase">Some of the brands i've worked with:</span>
              </div>
              <Marquee />
            </div>
          </div>
        )}

        {/* Page 2: Why Me */}
        {activePage === 'whyme' && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="mb-24">
              <span className="text-[10px] font-black tracking-[0.6em] text-[#b8ff00] mb-6 block uppercase bg-black w-fit px-5 py-2 rounded-full">The Foundry Method</span>
              <h2 className="text-6xl md:text-[7rem] font-black tracking-tighter uppercase leading-[0.85]">
                Built for <br /> <span className="bg-[#b8ff00] px-4">Velocity.</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-10">
              {PORTFOLIO_DATA.whyMe.map((item, i) => (
                <div key={i} className="group p-12 bg-white border-2 border-zinc-100 rounded-[3rem] hover:border-black transition-all relative overflow-hidden">
                  <div className="absolute -top-4 -right-4 p-8 text-zinc-50 font-black text-[10rem] group-hover:text-[#b8ff00]/20 transition-colors leading-none -rotate-12 pointer-events-none select-none">0{i + 1}</div>
                  <div className="relative z-10">
                    <h3 className="text-3xl font-black mb-8 uppercase tracking-tighter leading-none">{item.title}</h3>
                    <p className="text-zinc-500 leading-relaxed text-xl font-medium">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-24 bg-zinc-900 text-white p-20 rounded-[4rem] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[#b8ff00]/5" />
              <div className="relative z-10 max-w-3xl">
                <h3 className="text-5xl md:text-7xl font-black tracking-tighter mb-10 leading-[0.9] uppercase">The Tech <br /> Foundation.</h3>
                <p className="text-zinc-400 text-2xl leading-relaxed mb-16 font-medium">I implement high-integrity tracking via server-side GTM and Elevar. Every pixel is validated. Every test is statistically significant. </p>
                <div className="flex flex-wrap gap-3">{['GA4', 'GTM', 'LIQUID', 'TYPESCRIPT', 'NODE.JS', 'TAILWIND', 'KLAVIYO', 'SKIO'].map(tag => (<span key={tag} className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black tracking-[0.2em]">{tag}</span>))}</div>
              </div>
            </div>
          </div>
        )}

        {/* Page 3: Case Studies */}
        {activePage === 'casestudies' && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
              <div className="max-w-4xl">
                <span className="text-[10px] font-black tracking-[0.6em] text-zinc-400 mb-6 block uppercase">Proof of Work</span>
                <h2 className="text-6xl md:text-[9rem] font-black tracking-tighter uppercase leading-[0.8] mb-8">Recent <br /> <span className="text-[#b8ff00] stroke-black stroke-2" style={{ WebkitTextStroke: '2px black' }}>Deployments.</span></h2>
                <p className="text-2xl text-zinc-400 font-medium leading-tight">A comprehensive deep dive into technical migrations, campaign logic, and modular architecture across 8 select projects.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{PORTFOLIO_DATA.caseStudies.map(study => (<CaseStudyCard key={study.id} study={study} onSelect={setSelectedStudy} />))}</div>
          </div>
        )}
      </main>

      <footer className="border-t-2 border-zinc-100 py-32 px-6 bg-zinc-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center rotate-12 mb-12"><div className="w-6 h-6 bg-[#b8ff00] rounded-sm -rotate-12" /></div>
          <div className="font-black tracking-tighter text-6xl md:text-8xl mb-12 uppercase">GET IN TOUCH</div>
          <a href="mailto:work@foundrydev.com" className="text-2xl md:text-5xl font-medium tracking-tight mb-20 hover:text-[#b8ff00] transition-colors underline decoration-2 underline-offset-8">neilmaghanga@proton.me</a>
          <div className="flex gap-16 font-black text-[10px] uppercase tracking-[0.4em] text-zinc-400 mb-20"><a href="#" className="hover:text-black transition-colors">Twitter</a><a href="#" className="hover:text-black transition-colors">LinkedIn</a><a href="#" className="hover:text-black transition-colors">Github</a></div>
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between w-full pt-12 border-t border-zinc-200">
            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">© 2025 / THOMAS MAGHANGA</span>
            <div className="flex gap-6"><div className="w-3 h-3 bg-[#b8ff00] rounded-full" /><div className="w-3 h-3 bg-black rounded-full" /><div className="w-3 h-3 bg-zinc-300 rounded-full" /></div>
            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">NAIROBI / REMOTE</span>
          </div>
        </div>
      </footer>

      <CaseStudyModal study={selectedStudy} onClose={() => setSelectedStudy(null)} />
    </div>
  );
}