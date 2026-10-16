"use client";

import { useState } from "react";
import { projects } from "@/content/projects";

const visibleProjects = projects.filter((project) => project.visible);
const filters = ["ALL", ...new Set(visibleProjects.map((project) => project.category))];

export default function Projects() {
  const [filter, setFilter] = useState("ALL");
  const [active, setActive] = useState<(typeof visibleProjects)[number] | null>(null);
  const shownProjects = visibleProjects.filter((project) => filter === "ALL" || project.category === filter);

  return (
    <section className="section projects" id="work">
      <div className="section-head">
        <div><p className="eyebrow">03 / selected projects</p><h2>Work that asks<br /><em>better questions.</em></h2></div>
      </div>
      <div className="filters">{filters.map((item) => <button className={filter === item ? "active" : ""} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div>
      <div className="project-list">
        {shownProjects.map((project, index) => (
          <button className="project-row" key={project.slug} onClick={() => setActive(project)}>
            <span className="mono">0{index + 1}</span>
            <h3>{project.title}</h3>
            <span className="accent">{project.category}</span>
            <span aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
      {active && <div className="modal-backdrop" onClick={() => setActive(null)}>
        <article className="modal" onClick={(event) => event.stopPropagation()}>
          <button onClick={() => setActive(null)}>Close ×</button>
          <p className="eyebrow">{active.category} · {active.status}</p>
          <h2>{active.title}</h2>
          <p>{active.description}</p>
          <p>{active.details}</p>
          {active.highlights.length > 0 && <ul className="project-highlights">{active.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>}
          <div className="chips">{active.tech.map((tag) => <span key={tag}>{tag}</span>)}</div>
          {active.href && <a className="project-link" href={active.href} target="_blank" rel="noopener noreferrer">{active.linkLabel} ↗</a>}
        </article>
      </div>}
    </section>
  );
}
