import Link from "next/link";
import { blogArticles, getArticleReadTime } from "@/content/blogs";

export default function MediumInsights() {
  return <section className="section medium-insights" id="insights"><div className="section-head"><div><p className="eyebrow">05 / medium insights</p><h2>Notes from<br /><em>the edge.</em></h2></div><p>Engineering, systems, and the life lessons that make the work more durable.</p></div><div className="medium-grid">{blogArticles.slice(2).map((post) => <Link className="medium-card" href={`/blog/${post.slug}`} key={post.slug}><div className="medium-overlay" /><div className="medium-meta mono"><span>{post.category}</span><span>{getArticleReadTime(post)} read</span></div><h3>{post.title}</h3><p>{post.excerpt}</p><span className="accent">Read article ↗</span></Link>)}</div></section>;
}
