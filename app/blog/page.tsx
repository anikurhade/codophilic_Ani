import Link from "next/link";
import { blogArticles } from "@/content/blogs";

export default function BlogIndex() {
  return (
    <main className="blog-page">
      <Link className="blog-back mono" href="/">← Back home</Link>
      <p className="eyebrow">TECH &amp; LIFE / NOTES</p>
      <h1>Ideas in<br /><em>progress.</em></h1>
      <div className="post-list prose prose-zinc dark:prose-invert max-w-none">
        {blogArticles.map((post) => (
          <Link className="post-card" href={`/blog/${post.slug}`} key={post.slug}>
            <span className="mono">{post.category} · {post.date} · {post.readTime}</span>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            <span className="accent">Read article ↗</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
