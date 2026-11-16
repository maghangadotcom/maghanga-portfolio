import media from './media.js';

function Screen({ name, caption, eager = false }) {
  const img = media[name];
  if (!img) return null;
  return <figure className="story-screen"><a href={img.src} target="_blank" rel="noreferrer" aria-label={`Open full-size image: ${caption}`}><img src={img.src} width={img.w} height={img.h} alt={caption} loading={eager ? 'eager' : 'lazy'} decoding="async" /></a><figcaption>{caption} <span>Open image ↗</span></figcaption></figure>;
}

export default function CaseStory({ study }) {
  return <article className={`case-story story-${study.id}`}>
    <header className="wrap story-intro">
      <a className="text-link" href="/work/">← Selected work</a>
      <p className="eyebrow">{study.title} / SHOPIFY DEVELOPMENT & CRO</p>
      <h1>{study.headline}</h1>
      <p className="story-lead">{study.summary}</p>
      <p className="story-role"><strong>My contribution</strong>{study.role}</p>
      <nav className="story-nav" aria-label="Case study sections"><a href="#impact">Impact</a><a href="#approach">The work</a><a href="#collaboration">Working together</a></nav>
    </header>
    <section className="wrap story-impact" id="impact" aria-labelledby="impact-title">
      <h2 id="impact-title">What changed</h2>
      <dl className="story-metrics">{study.metrics.map(([value,label])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      <p className="story-evidence">{study.evidence}</p>
    </section>
    <div className="wrap story-context"><div><p className="eyebrow">THE STARTING POINT</p><h2>The business problem behind the build.</h2></div><p>{study.context}</p></div>
    <section className="wrap story-approach" id="approach" aria-label="Implementation and decisions">
      <ol className="story-flow" aria-label="Connected workstreams">{study.flow.map(item=><li key={item}>{item}</li>)}</ol>
      {study.chapters.map((chapter,index)=><section className="story-chapter" key={chapter.title}>
        <div className="story-chapter-copy"><span className="eyebrow">0{index+1} / THE WORK</span><h2>{chapter.title}</h2><p>{chapter.body}</p></div>
        <div className={chapter.secondImg ? 'story-paired' : ''}><Screen name={chapter.img} caption={chapter.cap}/>{chapter.secondImg && <Screen name={chapter.secondImg} caption={chapter.secondCap}/>}</div>
      </section>)}
    </section>
    <section className="wrap story-working" id="collaboration"><p className="eyebrow">HOW I WORK</p><h2>Ownership beyond the first release.</h2><p>{study.working}</p></section>
    <section className="wrap story-cta"><div><p className="eyebrow">FOR YOUR TEAM</p><h2>Need someone who can understand the problem and build the solution?</h2><p>Tell me about your storefront, the role and what you need to improve.</p></div><a className="button primary" href={`mailto:thomas@maghanga.com?subject=${encodeURIComponent('Shopify development opportunity — '+study.title+' case study')}`}>Discuss your project ↗</a></section>
  </article>;
}
