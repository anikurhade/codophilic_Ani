const skillGroups = [
  ["Generative AI & ML", ["LLMs", "RAG", "Prompt Engineering & Optimization", "Agentic Workflows", "AI Agents", "LLMOps", "AI Evaluation", "Vector Search", "Semantic Search"]],
  ["AI Frameworks", ["LangGraph", "LangChain", "CrewAI", "LlamaIndex", "Hugging Face", "OpenAI", "Gemini"]],
  ["Programming Languages", ["Python", "Java", "SQL", "JavaScript", "TypeScript"]],
  ["Backend Engineering", ["Spring Boot", "FastAPI", "REST APIs", "Microservices"]],
  ["Data Engineering", ["Apache Spark", "PySpark", "Kafka", "Parquet", "JSON Processing"]],
  ["Cloud & DevOps", ["AWS", "GCP", "Docker", "Kubernetes", "Jenkins", "Terraform", "Airflow", "CI/CD", "Git"]],
  ["Databases & MLOps", ["PostgreSQL", "ChromaDB", "Vector Databases", "Model Serving"]],
] as const;

export default function SkillsGrid() {
  return <section className="section sunset-section skills-section" id="skills">
    <div className="section-head"><div><p className="eyebrow">02 / capabilities</p><h2>The complete<br /><em>toolkit.</em></h2></div><p>From model evaluation to production infrastructure, these are the systems and tools I use to turn ambitious ideas into dependable software.</p></div>
    <div className="skills-grid">{skillGroups.map(([name, skills], index) => <article className="skills-card" key={name}><div className="skills-card-head"><span className="mono">0{index + 1}</span><span className="skills-card-line" /></div><h3>{name}</h3><div className="skill-tags">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div></article>)}</div>
  </section>;
}
