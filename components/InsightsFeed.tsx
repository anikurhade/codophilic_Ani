"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const posts = [
  { title: "Decoding Agentic Usecases in Production", date: "Aug 2026", read: "5 min", snippet: "Breaking down LangGraph cycles, supervisor agents, and memory persistence in plain English." },
  { title: "Enterprise Reality vs. GenAI Hype", date: "Jul 2026", read: "7 min", snippet: "What companies are actually deploying versus what is marketing noise." },
  { title: "Pacing the 24km", date: "Apr 2026", read: "4 min", snippet: "How endurance running rewires an engineer's brain for complex problem-solving." },
];
const verses = [
  { language: "Hindi", title: "मंज़िल की तलाश", text: "मंज़िल की तलाश में निकले थे, रास्तों ने अपना बना लिया..." },
  { language: "Marathi", title: "मातीचा गंध", text: "स्वप्नांच्या शोधात गाव सोडलं, पण मातीचा गंध काही सुटला नाही..." },
  { language: "Photography", title: "Light between places", text: "Quiet roads, mountain air, and sunsets held still for a moment." },
];

export default function InsightsFeed() {
  const [tab, setTab] = useState<"systems" | "verses">("systems");
  return <section className="section insights-feed" id="insights">
    <div className="section-head"><div><p className="eyebrow">05 / field notes</p><h2>Notes from<br /><em>the edge.</em></h2></div><p>Engineering, systems, poetry, and the life lessons that make the work more durable.</p></div>
    <div className="insights-tabs" role="tablist" aria-label="Insights categories">
      {[["systems", "Systems & Logs"], ["verses", "Verses & Views"]].map(([value, label]) => <button key={value} role="tab" aria-selected={tab === value} className={tab === value ? "active" : ""} onClick={() => setTab(value as "systems" | "verses")}>{label}</button>)}
    </div>
    <AnimatePresence mode="wait">
      <motion.div key={tab} className="medium-grid" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: .25 }}>
        {(tab === "systems" ? posts : verses).map((post) => <article className={`medium-card ${tab === "verses" ? "verse-card" : ""}`} key={post.title}>
          <div className="medium-overlay" /><div className="medium-meta mono"><span>{"date" in post ? post.date : post.language}</span><span>{"read" in post ? post.read : "original"}</span></div>
          <h3>{post.title}</h3><p>{"snippet" in post ? post.snippet : post.text}</p>{tab === "systems" && <a href="/blog">Read insight ↗</a>}
        </article>)}
      </motion.div>
    </AnimatePresence>
  </section>;
}
