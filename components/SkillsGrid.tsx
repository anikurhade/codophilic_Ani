const skillGroups = [
  ["Core Backend & JVM Engineering", ["Java", "Spring Boot", "Spring Security / RBAC", "Concurrency", "Microservices", "REST APIs", "System Design"]],
  ["Distributed Data Engineering", ["Apache Spark", "PySpark", "Kafka", "Batch & Stream Processing", "Parquet", "Schema Reconciliation", "PostgreSQL"]],
  ["Cloud & Production Infrastructure", ["AWS", "GCP", "Docker", "Kubernetes", "Jenkins", "Terraform", "Airflow", "CI/CD"]],
  ["Applied AI & Custom Diagnostics", ["LLM Diagnostics", "RAG", "LangGraph", "Agentic Triage Workflows", "Vector Search", "AI Evaluation"]],
  ["Programming Languages", ["Python", "Java", "SQL", "JavaScript", "TypeScript"]],
  ["AI Frameworks", ["LangGraph", "LangChain", "CrewAI", "LlamaIndex", "Hugging Face", "OpenAI", "Gemini"]],
  ["Databases & MLOps", ["PostgreSQL", "ChromaDB", "Vector Databases", "Model Serving"]],
] as const;

export default function SkillsGrid() {
  return <section className="section sunset-section skills-section" id="skills">
    <div className="section-head"><div><p className="eyebrow">02 / capabilities</p><h2>The complete<br /><em>toolkit.</em></h2></div><p>Backend and distributed data systems lead; applied AI and automation are tools I use when they solve a concrete problem.</p></div>
    <div className="skills-grid">{skillGroups.map(([name, skills], index) => <article className="skills-card" key={name}><div className="skills-card-head"><span className="mono">0{index + 1}</span><span className="skills-card-line" /></div><h3>{name}</h3><div className="skill-tags">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div></article>)}</div>
  </section>;
}
