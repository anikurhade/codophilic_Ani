"use client";

import { motion } from "framer-motion";

const projects = [
  { title: "FinForensics", category: "Multi-Agent AI", description: "Multi-agent Generative AI system investigating payment transaction failures.", metrics: "Reduced diagnosis time from 45 min to <30 seconds. 89% classification accuracy.", tech: ["LangGraph", "Llama 3", "FastAPI"] },
  { title: "PRISM", category: "Platform Architecture", description: "LLM-assisted PySpark diagnostics platform and schema-aware diff engine validating 6,000+ financial asset files.", metrics: "Reconciled 300M+ records. Reduced triage time by 40%.", tech: ["PySpark", "Apache Spark", "Prompt Engineering", "Java"] },
  { title: "IBG Workspace Orchestrator", category: "Agentic Workflow", description: "Fully automated AI workflow managing cross-functional team operations and event planning.", metrics: "Eliminated operational silos through autonomous Jira/Confluence integration.", tech: ["Atlassian Rovo AI", "Jira API", "Confluence API"] },
  { title: "AI Spice Authenticity", category: "Research & IoT", description: "Spectral data processing and IoT simulation for food authenticity detection.", metrics: "South African Patent Granted.", tech: ["Python", "IoT Simulation", "Cloud Deployment"] },
] as const;

export default function ProjectsBento() {
  return <section className="section projects-bento-section" id="work"><div className="section-head"><div><p className="eyebrow">04 / architecture showcase</p><h2>Systems that<br /><em>ship.</em></h2></div><p>Selected platforms, agents, and research projects built around measurable outcomes.</p></div><div className="projects-bento-grid">{projects.map((project, index) => <motion.article className="projects-bento-card" key={project.title} whileHover={{ y: -6 }} transition={{ duration: .25 }}><span className="mono project-index">0{index + 1}</span><span className="project-arrow" aria-hidden="true">↗</span><p className="mono project-category">{project.category}</p><h3>{project.title}</h3><p className="project-description">{project.description}</p><p className="project-metrics">{project.metrics}</p><div className="project-tech">{project.tech.map((tag) => <span key={tag}>{tag}</span>)}</div></motion.article>)}</div></section>;
}
