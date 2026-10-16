import { BrainCircuit, GraduationCap, Layers3, Trophy, Workflow } from "lucide-react";
import {
  portfolioAchievements,
  portfolioCoreStack,
  portfolioEducation,
  portfolioProfile,
} from "@/content/portfolio";

export default function Bento() {
  return <section className="section sunset-section" id="about"><div className="section-head"><div><p className="eyebrow">01 / about &amp; expertise</p><h2>Built for the<br /><em>hard problems.</em></h2></div><p>A systems-first engineer who treats clarity, reliability, and thoughtful interfaces as part of the same job.</p></div><div className="sunset-bento">
    <article className="sunset-card bio-card"><BrainCircuit /><p className="mono card-number">01 / BIO</p><h3>{portfolioProfile.role}</h3><p>{portfolioProfile.summary}</p></article>
    <article className="sunset-card education-card"><GraduationCap /><p className="mono card-number">02 / EDUCATION</p><h3>Credentials that compound.</h3>{portfolioEducation.map((item) => <div className="credential" key={item.credential}><b>{item.credential}</b><span>{item.institution}{item.result && <> · <strong style={{ color: "var(--gold)" }}>{item.result}</strong></>}{item.dates && <> · {item.dates}</>}</span></div>)}</article>
    <article className="sunset-card stack-card"><Workflow /><p className="mono card-number">03 / CORE STACK</p><h3>Systems in motion.</h3><div className="stack-tags">{portfolioCoreStack.map((item, index) => <span style={{ transitionDelay: `${index * 60}ms` }} key={item}>{item}</span>)}</div></article>
    {portfolioAchievements.map((achievement) => <article className="sunset-card milestone-card bg-white border-zinc-200 dark:bg-[#18181b] dark:border-zinc-800" key={achievement.title}><Trophy /><p className="mono card-number">04 / MILESTONE</p><h3>{achievement.title}</h3><p>{achievement.description}</p><span className="milestone-line" /></article>)}
    <article className="sunset-card architecture-card"><Layers3 /><p className="mono card-number">05 / PRINCIPLE</p><h3>Make complexity feel inevitable.</h3><p>Good architecture disappears into the confidence it creates.</p></article>
  </div></section>;
}
