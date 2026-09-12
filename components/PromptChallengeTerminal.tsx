"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type HistoryEntry = { role: "user" | "agent"; text: string };

const keywords = ["ignore", "override", "bypass", "key", "resume"];
const initialHistory: HistoryEntry[] = [{ role: "agent", text: "SYSTEM ARMED: Enter authorization prompt to access architectural blueprints." }];

export default function PromptChallengeTerminal() {
  const [history, setHistory] = useState<HistoryEntry[]>(initialHistory);
  const [input, setInput] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const historyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    historyRef.current?.scrollTo({ top: historyRef.current.scrollHeight, behavior: "smooth" });
  }, [history]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const prompt = input.trim();
    if (!prompt) return;
    const unlocked = keywords.some((keyword) => prompt.toLowerCase().includes(keyword));
    setHistory((current) => [...current, { role: "user", text: prompt }, { role: "agent", text: unlocked ? "ACCESS GRANTED. Decrypting resume..." : "Defense layer active. Invalid prompt." }]);
    setInput("");
    if (unlocked) setIsUnlocked(true);
  };

  return <section className="prompt-terminal" aria-label="Prompt authorization challenge">
    <div className="prompt-terminal-bar"><span className="mono">PROMPT CHALLENGE / SECURE SANDBOX</span><span className="prompt-status">● ARMED</span></div>
    <div className="prompt-history scrollbar-hide" ref={historyRef} aria-live="polite">
      {history.map((entry, index) => <p className={entry.role === "user" ? "prompt-user" : "prompt-agent"} key={`${entry.role}-${index}`}><b>{entry.role === "user" ? ">" : "AI"}</b> {entry.text}</p>)}
      <AnimatePresence>{isUnlocked && <motion.div className="prompt-confetti" aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{Array.from({ length: 10 }, (_, index) => <i key={index} style={{ "--i": index } as React.CSSProperties} />)}</motion.div>}</AnimatePresence>
    </div>
    {isUnlocked ? <motion.a className="prompt-resume-cta" href="/files/Anirudha Kurhade Resume.pdf" download initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>Download Resume.pdf ↗</motion.a> : <form className="prompt-form" onSubmit={submit}><span className="mono">$</span><input value={input} onChange={(event) => setInput(event.target.value)} aria-label="Authorization prompt" placeholder="Enter authorization prompt..." /><button type="submit" aria-label="Submit authorization prompt">↵</button></form>}
  </section>;
}
