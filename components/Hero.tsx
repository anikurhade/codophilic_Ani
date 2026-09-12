"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { PointerEvent } from "react";

const title = "Anirudha Kurhade";

export default function Hero() {
  const [typed, setTyped] = useState("");
  const pointerX = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
  const pointerY = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
  const rotateX = useTransform(pointerY, [-240, 240], [5, -5]);
  const rotateY = useTransform(pointerX, [-240, 240], [-5, 5]);
  const phrase = "Backend Architect // AI Engineer";

  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      setTyped(phrase.slice(0, index + 1));
      index += 1;
      if (index === phrase.length) window.clearInterval(timer);
    }, 58);
    return () => window.clearInterval(timer);
  }, []);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(event.clientX - (rect.left + rect.width / 2));
    pointerY.set(event.clientY - (rect.top + rect.height / 2));
  };

  return (
    <section id="top" className="sunset-hero relative min-h-screen w-full overflow-hidden" onPointerMove={handlePointerMove} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}>
      <div className="hero-glow" aria-hidden="true" />
      <div className="sunset-hero-inner">
        <div className="hero-copy">
          <motion.p className="eyebrow" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <i /> SOFTWARE DEVELOPMENT ENGINEER / SYSTEMS &amp; AI
          </motion.p>
          <h1 aria-label={title}>
            {title.split(" ").map((word, wordIndex) => (
              <span className="split-word" key={word}>
                {word.split("").map((letter, index) => (
                  <motion.span key={`${letter}-${index}`} initial={{ opacity: 0, y: 40, rotate: 8 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ delay: 0.18 + wordIndex * 0.16 + index * 0.035, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
                    {letter}
                  </motion.span>
                ))}
                <span className="word-space"> </span>
              </span>
            ))}
          </h1>
          <motion.p className="hero-role mono" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.05 }}>
            {typed}<span className="type-caret">▋</span>
          </motion.p>
          <motion.p className="hero-text" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.35 }}>
            I design LLM-assisted platforms, resilient data pipelines, and backend systems that help high-velocity teams move with confidence.
          </motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.55 }}>
            <a className="glass-cta primary" href="#work">View Architecture (Projects) <ArrowUpRight size={15} /></a>
            <a className="glass-cta" href="/blog">Read Logs (Blog) <ArrowUpRight size={15} /></a>
            <a className="glass-cta" href="#contact">Connect <ArrowUpRight size={15} /></a>
          </motion.div>
        </div>
        <div className="hero-terminal" aria-label="System architecture visual">
          <motion.div className="terminal-window" style={{ rotateX, rotateY }}>
            <div className="terminal-bar"><span /><span /><span /><small className="mono">anirudha@systems:~</small></div>
            <div className="terminal-content mono">
              <p><b>$</b> ./build-intelligence --scale</p>
              <p className="terminal-muted">loading architecture...</p>
              <div className="terminal-orb"><div className="orb-core" /><div className="orb-ring ring-a" /><div className="orb-ring ring-b" /></div>
              <p className="terminal-success">✓ systems ready / latency: 40% lower</p>
              <p><b>$</b> <span className="terminal-caret">_</span></p>
            </div>
          </motion.div>
          <p className="canvas-label mono">OBSIDIAN SYSTEM / 001</p>
        </div>
      </div>
      <a className="scroll-note mono" href="#about">SCROLL TO EXPLORE <ArrowDown size={14} /></a>
    </section>
  );
}
