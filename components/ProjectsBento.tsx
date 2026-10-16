"use client";

import { motion } from "framer-motion";
import { projects } from "@/content/projects";

export default function ProjectsBento() {
  const projectOrder = ["prism", "smart-carpool", "attentionlens", "corporate-ai-music-game"];
  const visibleProjects = projects
    .filter((project) => project.visible)
    .sort((left, right) => projectOrder.indexOf(left.slug) - projectOrder.indexOf(right.slug));

  return <section className="section projects-bento-section" id="work"><div className="section-head"><div><p className="eyebrow">04 / system architecture &amp; problem solving</p><h2>Systems that<br /><em>solve.</em></h2></div><p>Production data modernization, algorithmic mobility, interactive model inspection, and practical AI-assisted experiences.</p></div><div className="projects-bento-grid">{visibleProjects.map((project, index) => <motion.article className="projects-bento-card bg-white border-zinc-200 dark:bg-[#18181b] dark:border-zinc-800" key={project.slug} whileHover={{ y: -6 }} transition={{ duration: .25 }}><span className="mono project-index">0{index + 1}</span><span className="project-arrow" aria-hidden="true">↗</span><p className="mono project-category">{project.category}</p><h3>{project.title}</h3><span className="project-status">{project.status}</span><p className="project-description">{project.description}</p><p className="project-metrics">{project.metrics}</p>{project.highlights.length > 0 && <ul className="project-highlights">{project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>}<div className="project-tech">{project.tech.map((tag) => <span key={tag}>{tag}</span>)}</div>{project.href && <a className="project-link" href={project.href}>{project.linkLabel} ↗</a>}</motion.article>)}</div></section>;
}
