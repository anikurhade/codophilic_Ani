import Link from "next/link";
const posts = [
  { slug: "designing-useful-ai", title: "Designing AI that knows when to help", category: "Engineering / Tech", date: "June 24, 2024", excerpt: "A practical note on building agentic interfaces that feel clear, grounded, and human." },
  { slug: "systems-and-curiosity", title: "Systems, curiosity, and the long way around", category: "Life / Thoughts", date: "May 18, 2024", excerpt: "What legacy systems taught me about patience, craft, and asking better questions." },
];
export default function BlogIndex() {
  return <main className="blog-page"><Link className="blog-back mono" href="/">← Back home</Link><p className="eyebrow">TECH &amp; LIFE / NOTES</p><h1>Ideas in<br /><em>progress.</em></h1><div className="post-list">{posts.map((post) => <Link className="post-card" href={`/blog/${post.slug}`} key={post.slug}><span className="mono">{post.category} · {post.date}</span><h2>{post.title}</h2><p>{post.excerpt}</p><span className="accent">Read article ↗</span></Link>)}</div></main>;
}
