import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Bento from "@/components/Bento";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import ProjectsBento from "@/components/ProjectsBento";
import CreativeGallery from "@/components/CreativeGallery";
import MediumInsights from "@/components/MediumInsights";
import SkillsGrid from "@/components/SkillsGrid";
import AIChatDrawer from "@/components/AIChatDrawer";

export default function Home() {
  return <><Navigation /><main><Hero /><Bento /><SkillsGrid /><ExperienceTimeline /><ProjectsBento /><MediumInsights /><CreativeGallery /><section id="contact" className="contact-section"><p className="eyebrow">06 / let&apos;s build</p><h2>Have an ambitious<br /><em>problem?</em></h2><a className="button" href="https://topmate.io/anirudha_kurhade/941235/pay" target="_blank" rel="noopener noreferrer">Start a conversation ↗</a></section></main><footer className="footer">© 2026 Anirudha Kurhade <span><a href="/blog">Tech &amp; Life ↗</a> · Built with curiosity.</span></footer><AIChatDrawer /></>;
}
