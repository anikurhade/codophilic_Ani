"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    number: "01",
    label: "DATA TRANSFORM MODERNIZATION & PRISM AI",
    title: "Modernizing financial data systems at enterprise scale.",
    content: (
      <>
        <p><strong>Role &amp; Scope:</strong> Spearheaded the legacy migration of business rules from C to Java, architecting a validation engine capable of processing <b>300M+ records</b> across massive financial files for multiple banking clients.</p>
        <p><strong>The Data Compare Engine:</strong> Engineered a batch-capable data comparison program to run field-by-field validations between legacy and modernized outputs, successfully reconciling <b>1,000+ assets containing millions of records</b> in a matter of hours.</p>
        <p><strong>PRISM AI Agent:</strong> Architected PRISM, a specialized AI Agent equipped with deep Data Architecture knowledge. It autonomously identifies root causes of data validation discrepancies and auto-generates <b>PySpark</b> queries to fetch accurate reconciliation data directly from compare logs.</p>
      </>
    ),
  },
  {
    number: "02",
    label: "AI-DRIVEN WORKSPACE ORCHESTRATION / ATLASSIAN ROVO",
    title: "Turning operational silos into an intelligent coordination layer.",
    content: (
      <>
        <p><strong>Problem &amp; Vision:</strong> Identified critical operational silos within the Pune Impact Business Group (IBG). Conceptualized and pitched a centralized coordination platform.</p>
        <p><strong>The Execution:</strong> Built a fully automated AI workflow using <b>Atlassian Rovo</b>, <b>Jira</b>, and <b>Confluence</b>.</p>
        <p><strong>Agent Capabilities:</strong> Developed a custom Rovo-based AI Agent trained on historical Pune IBG event data. The agent ingests raw Meeting Minutes (MoM) to auto-generate event plans, dynamically assign Jira stories/sub-tasks, set intelligent deadlines, trigger team channel alerts for delays, and compile detailed execution reports on Confluence.</p>
      </>
    ),
  },
  {
    number: "03",
    label: "INTERNAL ASSET TAGGING & RBAC DASHBOARD",
    title: "Replacing fragmented audits with a secure source of truth.",
    content: (
      <>
        <p><strong>End-to-End Ownership:</strong> Drove the product lifecycle from identifying facility auditing bottlenecks, pitching the solution to business stakeholders, to full deployment.</p>
        <p><strong>The Platform:</strong> Developed and hosted a <b>Streamlit</b>-based QR creation and scanning application on internal TU servers. Replaced isolated Excel workflows with a centralized, secure dashboard featuring strict <b>Role-Based Access Control (RBAC)</b> policies for real-time asset identification and auditing across the Pune location.</p>
      </>
    ),
  },
];

export default function ExperienceTimeline() {
  return (
    <section className="section timeline-section experience-timeline-section" id="experience">
      <div className="section-head">
        <div><p className="eyebrow">03 / professional timeline</p><h2>TransUnion.<br /><em>Under the hood.</em></h2></div>
        <p>Three enterprise initiatives spanning data modernization, agentic orchestration, and secure internal platforms.</p>
      </div>
      <div className="experience-timeline">
        {experiences.map((item, index) => (
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
              <div className="experience-node-copy">{item.content}</div>
            </motion.div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
