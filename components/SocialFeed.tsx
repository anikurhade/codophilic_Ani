const updates = [
  { date: "06.24", type: "BUILD LOG", text: "Exploring how agentic workflows can make internal data products more useful without adding more noise." },
  { date: "05.24", type: "MILESTONE", text: "Deepening my work on PRISM: platform architecture, reliability, and the small decisions that make systems last." },
  { date: "04.24", type: "THOUGHT", text: "The best AI interfaces do not feel like magic. They feel like a thoughtful colleague who knows when to help." },
];
export default function SocialFeed() {
  return <section className="section social-feed" id="insights"><div className="section-head"><div><p className="eyebrow">04 / insights feed</p><h2>Notes from<br /><em>the field.</em></h2></div><p>Recent thoughts, build logs, and useful observations — presented as a local feed ready to connect to a social API.</p></div><div className="feed-grid">{updates.map((update) => <article className="feed-card" key={update.date}><div><span className="mono">{update.date}</span><span className="feed-type">{update.type}</span></div><p>{update.text}</p><a href="https://www.linkedin.com/in/anikurhade/" target="_blank" rel="noreferrer">Read on LinkedIn ↗</a></article>)}</div></section>;
}
