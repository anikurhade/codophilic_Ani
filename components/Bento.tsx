import { BrainCircuit, GraduationCap, Layers3, Trophy, Workflow } from "lucide-react";

const stack = ["LangGraph", "Apache Spark", "Spring Boot", "PySpark", "Agentic AI"];

export default function Bento() {
  return <section className="section sunset-section" id="about"><div className="section-head"><div><p className="eyebrow">01 / about &amp; expertise</p><h2>Built for the<br /><em>hard problems.</em></h2></div><p>A systems-first engineer who treats clarity, reliability, and thoughtful interfaces as part of the same job.</p></div><div className="sunset-bento">
    <article className="sunset-card bio-card"><BrainCircuit /><p className="mono card-number">01 / BIO</p><h3>Software Development Engineer</h3><p>I am a Software Development Engineer specializing in Generative AI, robust data pipelines, and scalable backend architecture. I build LLM-assisted platforms and migrate legacy systems for high-velocity enterprise environments.</p></article>
    <article className="sunset-card education-card"><GraduationCap /><p className="mono card-number">02 / EDUCATION</p><h3>Credentials that compound.</h3><div className="credential"><b>PGCP in AI Engineering and AIOps</b><span>IIT Roorkee</span></div><div className="credential"><b>BTech in Computer Engineering</b><span>VIIT · <strong style={{ color: "var(--gold)" }}>GPA: 9.4</strong></span></div><div className="credential"><b>Diploma in Computer Engineering, Government Polytechnic Pune</b><span><strong style={{ color: "var(--gold)" }}>96.47%</strong> · Jun 2018 - Jun 2021</span></div></article>
    <article className="sunset-card stack-card"><Workflow /><p className="mono card-number">03 / CORE STACK</p><h3>Systems in motion.</h3><div className="stack-tags">{stack.map((item, index) => <span style={{ transitionDelay: `${index * 60}ms` }} key={item}>{item}</span>)}</div></article>
    <article className="sunset-card milestone-card"><Trophy /><p className="mono card-number">04 / MILESTONE</p><h3>AWS Summit Mumbai 2026</h3><p>AI Prompt Injection Challenge Winner.</p><span className="milestone-line" /></article>
    <article className="sunset-card architecture-card"><Layers3 /><p className="mono card-number">05 / PRINCIPLE</p><h3>Make complexity feel inevitable.</h3><p>Good architecture disappears into the confidence it creates.</p></article>
  </div></section>;
}
