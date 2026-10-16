"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { blogArticles, getArticleReadTime } from "@/content/blogs";
import { verses } from "@/content/shayari";

export default function InsightsFeed() {
  const [tab, setTab] = useState<"systems" | "verses">("systems");
  const posts = blogArticles.slice(2);
  return <section className="section insights-feed" id="insights">
    <div className="section-head"><div><p className="eyebrow">05 / field notes</p><h2>Notes from<br /><em>the edge.</em></h2></div><p>Engineering, systems, poetry, and the life lessons that make the work more durable.</p></div>
    <div className="insights-tabs" role="tablist" aria-label="Insights categories">
      {[["systems", "Systems & Logs"], ["verses", "Verses & Views"]].map(([value, label]) => <button key={value} role="tab" aria-selected={tab === value} className={tab === value ? "active" : ""} onClick={() => setTab(value as "systems" | "verses")}>{label}</button>)}
    </div>
    <AnimatePresence mode="wait">
      <motion.div key={tab} className="medium-grid" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: .25 }}>
        {tab === "systems"
          ? posts.map((post) => <Link className="medium-card" href={`/blog/${post.slug}`} key={post.slug}>
            <div className="medium-overlay" /><div className="medium-meta mono"><span>{post.category}</span><span>{getArticleReadTime(post)} read</span></div>
            <h3>{post.title}</h3><p>{post.excerpt}</p><span className="accent">Read article ↗</span>
          </Link>)
          : verses.map((verse) => <article className="medium-card verse-card" key={verse.title}>
            <div className="medium-overlay" /><div className="medium-meta mono"><span>{verse.language}</span><span>original</span></div>
            <h3>{verse.title}</h3><p className="whitespace-pre-line">{verse.text}</p>
          </article>)}
      </motion.div>
    </AnimatePresence>
  </section>;
}
