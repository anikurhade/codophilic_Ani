import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Bento from "@/components/Bento";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import CreativeSpace from "@/components/CreativeSpace";
import SocialFeed from "@/components/SocialFeed";
import FloatingAIChat from "@/components/FloatingAIChat";
import SkillsGrid from "@/components/SkillsGrid";

export default function Home() {
  return <><Navigation /><main><Hero /><Bento /><SkillsGrid /><Experience /><Projects /><SocialFeed /><CreativeSpace /><section id="contact" className="contact-section"><p className="eyebrow">06 / let&apos;s build</p><h2>Have an ambitious<br /><em>problem?</em></h2><a className="button" href="mailto:anikurhade2002@gmail.com">Start a conversation ↗</a></section></main><footer className="footer">© 2026 Anirudha Kurhade <span><a href="/blog">Tech &amp; Life ↗</a> · Built with curiosity.</span></footer><FloatingAIChat /></>;
}
