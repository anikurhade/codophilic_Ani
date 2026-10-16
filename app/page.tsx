import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Bento from "@/components/Bento";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import ProjectsBento from "@/components/ProjectsBento";
import CreativeGallery from "@/components/CreativeGallery";
import InsightsFeed from "@/components/InsightsFeed";
import SkillsGrid from "@/components/SkillsGrid";
import AIChatDrawer from "@/components/AIChatDrawer";

export default function Home() {
  return <><Navbar /><main><Hero /><Bento /><SkillsGrid /><ExperienceTimeline /><ProjectsBento /><InsightsFeed /><CreativeGallery /><section id="contact" className="contact-section"><p className="eyebrow text-zinc-50">07 / let&apos;s build</p><h2 className="text-zinc-50">Have an ambitious<br /><em>problem?</em></h2><p className="contact-copy">Reach out directly—no booking fee or gate.</p><div className="contact-links"><a className="button" href="mailto:anikurhade2002@gmail.com">Email Anirudha ↗</a><a href="https://www.linkedin.com/in/anikurhade/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="https://github.com/anikurhade" target="_blank" rel="noopener noreferrer">GitHub ↗</a></div></section></main><footer className="footer">© 2026 Anirudha Kurhade <span><a href="/blog">Tech &amp; Life ↗</a> · <a href="mailto:anikurhade2002@gmail.com">Email</a> · <a href="https://www.linkedin.com/in/anikurhade/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a> · <a href="https://github.com/anikurhade" target="_blank" rel="noopener noreferrer">GitHub ↗</a> · Built with curiosity.</span></footer><AIChatDrawer /></>;
}
