"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { blogArticles, getArticleReadTime } from "@/content/blogs";
import { verses } from "@/content/shayari";

const tabs = [
  { value: "all", label: "All" },
  { value: "routing", label: "Java & Graph Routing" },
  { value: "data", label: "Distributed Data" },
  { value: "ai", label: "AI Internals" },
  { value: "workflow", label: "Workflow Automation" },
  { value: "verses", label: "Verses & Views" },
] as const;

type InsightTab = (typeof tabs)[number]["value"];

const categoryBySlug: Record<string, Exclude<InsightTab, "all" | "verses">> = {
  "multi-hop-carpool-routing": "routing",
  "make-failure-legible": "data",
  "inside-attentionlens": "ai",
  "atlassian-event-orchestration": "workflow",
};

export default function InsightsFeed() {
  const [tab, setTab] = useState<InsightTab>("all");
  const posts = blogArticles.slice(2).filter((post) =>
    tab === "all" || tab === "verses" || categoryBySlug[post.slug] === tab
  );

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const currentIndex = tabs.findIndex((item) => item.value === tab);
    let nextIndex = currentIndex;
    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % tabs.length;
    else if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = tabs.length - 1;
    else return;

    event.preventDefault();
    const nextTab = tabs[nextIndex];
    setTab(nextTab.value);
    document.getElementById(`insights-tab-${nextTab.value}`)?.focus();
  };

  return <section className="section insights-feed" id="insights">
    <div className="section-head"><div><p className="eyebrow">05 / field notes</p><h2>Notes from<br /><em>the edge.</em></h2></div><p>Backend and distributed systems, practical AI, poetry, and the life lessons that make the work more durable.</p></div>
    <div className="insights-tabs" role="tablist" aria-label="Insights categories">
      {tabs.map(({ value, label }) => <button
        key={value}
        id={`insights-tab-${value}`}
        type="button"
        role="tab"
        aria-selected={tab === value}
        aria-controls="insights-panel"
        tabIndex={tab === value ? 0 : -1}
        className={tab === value ? "active" : ""}
        onClick={() => setTab(value)}
        onKeyDown={handleTabKeyDown}
      >{label}</button>)}
    </div>
    <AnimatePresence mode="wait">
      <motion.div
        key={tab}
        id="insights-panel"
        className="medium-grid"
        role="tabpanel"
        aria-labelledby={`insights-tab-${tab}`}
        tabIndex={0}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: .25 }}
      >
        {tab === "verses"
          ? verses.map((verse) => <article className="medium-card verse-card" key={verse.title}>
            <div className="medium-overlay" /><div className="medium-meta mono"><span>{verse.language}</span><span>original</span></div>
            <h3>{verse.title}</h3><p lang={verse.language === "Marathi" ? "mr" : verse.language === "Hindi" ? "hi" : verse.language === "Hinglish" ? "hi-Latn" : "en"} className="whitespace-pre-line">{verse.text}</p>
          </article>)
          : posts.map((post) => {
            const cover = post.sections.find((section) => "image" in section);
            return <Link className="medium-card" href={`/blog/${post.slug}`} key={post.slug}>
              <div className="medium-thumbnail">
                {cover && "image" in cover && cover.image && <Image src={cover.image.src} alt={cover.image.alt} fill sizes="(max-width: 760px) 100vw, 40vw" />}
              </div>
              <div className="medium-meta mono"><span>{post.category}</span><span>{getArticleReadTime(post)} read</span></div>
              <h3>{post.title}</h3><p>{post.excerpt}</p><span className="accent">Read article ↗</span>
            </Link>;
          })}
      </motion.div>
    </AnimatePresence>
  </section>;
}
