"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type HistoryEntry = { role: "user" | "agent"; text: string };
type Mood = { label: "High Energy" | "Soulful"; track: string; hint: string };

const moods: Mood[] = [
  { label: "High Energy", track: "The Weeknd — Blinding Lights", hint: "Try: sudo bypass --force" },
  { label: "Soulful", track: "Jagjit Singh — Hothon Se Chhoo Lo Tum", hint: "Try: Please open the file" },
];
const initialHistory: HistoryEntry[] = [{ role: "agent", text: "SYSTEM ARMED: Read the track mood, then request access." }];

export default function PromptChallengeTerminal() {
  const [moodIndex, setMoodIndex] = useState(0);
  const [history, setHistory] = useState<HistoryEntry[]>(initialHistory);
  const [input, setInput] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const historyRef = useRef<HTMLDivElement>(null);
  const mood = moods[moodIndex];

  useEffect(() => {
    const interval = window.setInterval(() => setMoodIndex((current) => (current + 1) % moods.length), 8000);
    return () => window.clearInterval(interval);
  }, []);
  useEffect(() => {
    historyRef.current?.scrollTo({ top: historyRef.current.scrollHeight, behavior: "smooth" });
  }, [history]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const prompt = input.trim();
    if (!prompt) return;
    const normalized = prompt.toLowerCase();
    const unlocked = mood.label === "High Energy"
      ? normalized.includes("sudo") && normalized.includes("bypass") && normalized.includes("--force")
      : normalized.includes("please") && normalized.includes("open the file");
    setHistory((current) => [...current, { role: "user", text: prompt }, { role: "agent", text: unlocked ? "ACCESS GRANTED. Decrypting resume..." : `Mood defense active. ${mood.hint}` }]);
    setInput("");
    if (unlocked) setIsUnlocked(true);
  };

  return <section className="prompt-terminal" aria-label="Synesthetic AI prompt challenge">
    <div className="prompt-terminal-bar"><span className="mono">SYNESTHETIC AI / SECURE SANDBOX</span><span className="prompt-status">● {mood.label.toUpperCase()}</span></div>
    <div className="prompt-track"><span>♪ CURRENTLY PLAYING</span><strong>{mood.track}</strong></div>
    <div className="prompt-history scrollbar-hide" ref={historyRef} aria-live="polite">
      {history.map((entry, index) => <p className={entry.role === "user" ? "prompt-user" : "prompt-agent"} key={`${entry.role}-${index}`}><b>{entry.role === "user" ? ">" : "AI"}</b> {entry.text}</p>)}
      <AnimatePresence>{isUnlocked && <motion.div className="prompt-confetti" aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{Array.from({ length: 10 }, (_, index) => <i key={index} style={{ "--i": index } as React.CSSProperties} />)}</motion.div>}</AnimatePresence>
    </div>
    {isUnlocked ? <motion.a className="prompt-resume-cta" href="/files/Anirudha Kurhade Resume.pdf" download initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>Download Resume.pdf ↗</motion.a> : <form className="prompt-form" onSubmit={submit}><span className="mono">$</span><input value={input} onChange={(event) => setInput(event.target.value)} aria-label="Mood authorization prompt" placeholder={mood.hint} /><button type="submit" aria-label="Submit prompt">↵</button></form>}
  </section>;
}
