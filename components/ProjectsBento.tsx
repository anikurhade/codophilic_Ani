"use client";

import { motion } from "framer-motion";

const projects = [
  { title: "AttentionLens: Transformer Interpretability", category: "Neural Architecture & Self-Attention", description: "An interactive mechanistic interpretability dashboard visualizing multi-head attention weights, demonstrating how Transformer models assign contextual relevance across complex input sequences.", metrics: "Real-time rendering of QKV (Query, Key, Value) matrix transformations.", tech: ["PyTorch", "React Three Fiber", "Hugging Face Transformers"] },
  { title: "Bhasha-Token", category: "Tokenization Mechanics", description: "A Byte-Pair Encoding (BPE) visualizer analyzing the token tax on regional languages. It compares Hindi and Marathi tokenization efficiency and structural parsing across frontier models.", metrics: "Live parsing and token-cost-analysis visualization.", tech: ["Next.js", "FastAPI", "tiktoken"] },
  { title: "Nexus Deep-Context RAG", category: "Vector Search & Embeddings", description: "An advanced pipeline utilizing Abstract Syntax Tree (AST) semantic chunking to accurately index and query legacy codebase logic without destroying operational context.", metrics: "3x improvement in context-retrieval accuracy over naive text splitting.", tech: ["ChromaDB", "LlamaIndex", "AST Parsing", "Python"] },
  { title: "PRISM", category: "Platform Architecture", description: "LLM-assisted PySpark diagnostics platform and schema-aware diff engine validating massive financial asset files.", metrics: "Reconciled 300M+ records. Reduced Spark job failure triage time by 40%.", tech: ["PySpark", "Apache Spark", "Prompt Engineering", "Java"] },
] as const;

export default function ProjectsBento() {
  return <section className="section projects-bento-section" id="work"><div className="section-head"><div><p className="eyebrow">04 / AI architecture showcase</p><h2>Systems that<br /><em>understand.</em></h2></div><p>Deep AI fundamentals made tangible through interpretability, tokenization, retrieval, and production diagnostics.</p></div><div className="projects-bento-grid">{projects.map((project, index) => <motion.article className="projects-bento-card" key={project.title} whileHover={{ y: -6 }} transition={{ duration: .25 }}><span className="mono project-index">0{index + 1}</span><span className="project-arrow" aria-hidden="true">↗</span><p className="mono project-category">{project.category}</p><h3>{project.title}</h3><p className="project-description">{project.description}</p><p className="project-metrics">{project.metrics}</p><div className="project-tech">{project.tech.map((tag) => <span key={tag}>{tag}</span>)}</div></motion.article>)}</div></section>;
}
