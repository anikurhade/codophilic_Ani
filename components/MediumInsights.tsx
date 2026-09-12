const posts = [
  { title: "Decoding Agentic Usecases in Production", date: "Aug 2026", read: "5 min", snippet: "Breaking down LangGraph cycles, supervisor agents, and memory persistence in plain English." },
  { title: "Enterprise Reality vs. GenAI Hype", date: "Jul 2026", read: "7 min", snippet: "Notes from the AWS Summit: what companies are actually deploying vs. what is marketing noise." },
  { title: "Pacing the 24km", date: "Apr 2026", read: "4 min", snippet: "How endurance running rewires an engineer's brain for complex problem-solving." },
];

export default function MediumInsights() {
  return <section className="section medium-insights" id="insights"><div className="section-head"><div><p className="eyebrow">05 / medium insights</p><h2>Notes from<br /><em>the edge.</em></h2></div><p>Engineering, systems, and the life lessons that make the work more durable.</p></div><div className="medium-grid">{posts.map((post) => <article className="medium-card" key={post.title}><div className="medium-overlay" /><div className="medium-meta mono"><span>{post.date}</span><span>{post.read}</span></div><h3>{post.title}</h3><p>{post.snippet}</p><a href="/blog">Read insight ↗</a></article>)}</div></section>;
}
