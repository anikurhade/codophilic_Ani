"use client";

import { motion } from "framer-motion";

const milestones = [
  { number: "01", title: "PRISM platform architecture", text: "Architected PRISM, an LLM-assisted PySpark diagnostics platform utilizing Agentic AI, reducing Spark job failure triage time by 40%." },
  { number: "02", title: "Schema-aware validation", text: "Designed a schema-aware Apache Spark diff engine to validate 6,000+ financial asset files, eliminating manual QA." },
  { number: "03", title: "Legacy modernization", text: "Migrated 65 legacy C-based business rules to Java with full CI/CD integration, increasing velocity by 50%." },
];

export default function Experience() {
  return <section className="section timeline-section" id="experience"><div className="section-head"><div><p className="eyebrow">02 / professional timeline</p><h2>TransUnion.<br /><em>Under the hood.</em></h2></div><p>Engineering milestones where architecture, automation, and measurable outcomes meet.</p></div><div className="sunset-timeline">{milestones.map((item, index) => <motion.article key={item.number} initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ delay: index * 0.14, duration: 0.65 }}><span className="timeline-number mono">{item.number}</span><div className="timeline-node" /><div><p className="mono timeline-label">TRANSUNION / ENGINEERING MILESTONE</p><h3>{item.title}</h3><p>{item.text}</p></div></motion.article>)}</div></section>;
}
