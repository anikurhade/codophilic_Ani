"use client";

import { motion } from "framer-motion";
import { portfolioExperience } from "@/content/portfolio";

export default function ExperienceTimeline() {
  const visibleExperiences = portfolioExperience.filter((item) => item.visible);

  return (
    <section className="section timeline-section experience-timeline-section" id="experience">
      <div className="section-head">
        <div><p className="eyebrow">03 / professional timeline</p><h2>TransUnion.<br /><em>Under the hood.</em></h2></div>
        <p>Selected enterprise work across data modernization and secure internal platforms. An additional initiative is intentionally hidden for now.</p>
      </div>
      <div className="experience-timeline">
        {visibleExperiences.map((item, index) => (
          <motion.article
            className="experience-node"
            key={item.number}
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="experience-node-number mono">{item.number}</span>
            <div className="experience-node-marker" aria-hidden="true" />
            <motion.div className="experience-node-card" initial={{ boxShadow: "0 0 0 rgba(249, 115, 22, 0)" }} whileInView={{ boxShadow: "0 0 28px rgba(249, 115, 22, 0.16)" }} viewport={{ once: true, amount: 0.45 }} transition={{ duration: 0.8 }}>
              <p className="mono experience-node-label">{item.label}</p>
              <h3>{item.title}</h3>
              <div className="experience-node-copy">{item.highlights.map((highlight) => <p key={highlight.label}><strong>{highlight.label}:</strong> {highlight.text}</p>)}</div>
            </motion.div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
