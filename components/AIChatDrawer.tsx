"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Bot, Send, X } from "lucide-react";

type Message = { role: "user" | "agent"; text: string };
const chips = ["Explain PRISM's Architecture", "Atlassian Agent Details", "Tech Stack overview", "Who is Anirudha?"];
const responses: Record<string, string> = {
  "Explain PRISM's Architecture": "PRISM combines a schema-aware Spark diff engine with an LLM-assisted diagnostic agent. It compares modernized outputs, traces discrepancies, and generates PySpark reconciliation queries.",
  "Atlassian Agent Details": "The Rovo workflow turns Pune IBG Meeting Minutes into event plans, Jira stories, deadlines, delay alerts, and Confluence execution reports.",
  "Tech Stack overview": "The core stack spans Python, Java, Spring Boot, PySpark, Apache Spark, LangGraph, RAG, AWS, GCP, Docker, and Kubernetes.",
  "Who is Anirudha?": "Anirudha is a Software Development Engineer focused on Generative AI, scalable data pipelines, backend architecture, and enterprise modernization.",
};

export default function AIChatDrawer() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: "agent", text: "Agentic Twin online. Ask me about Anirudha's work." }]);
  const messagesRef = useRef<HTMLDivElement>(null);
  const responseTimer = useRef<number | null>(null);
  useEffect(() => { messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: "smooth" }); }, [messages, thinking]);
  useEffect(() => () => { if (responseTimer.current !== null) window.clearTimeout(responseTimer.current); }, []);

  const ask = (value: string) => {
    const question = value.trim();
    if (!question || thinking) return;
    setMessages((current) => [...current, { role: "user", text: question }]);
    setInput("");
    setThinking(true);
    responseTimer.current = window.setTimeout(() => {
      const response = responses[question] ?? "I can explain PRISM, the Atlassian workflow, Anirudha's stack, or his background. Try one of the quick prompts.";
      setMessages((current) => [...current, { role: "agent", text: response }]);
      setThinking(false);
    }, 450);
  };
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); ask(input); };

  return <><button className="drawer-trigger" aria-label="Open Agentic Twin chat" onClick={() => setOpen(true)}><Bot size={19} /><span>Agentic Twin</span></button><AnimatePresence>{open && <motion.div className="drawer-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}><motion.aside className="ai-drawer bg-zinc-50 dark:bg-[#09090b]" role="dialog" aria-modal="true" aria-label="Agentic Twin chat" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 260 }} onClick={(event) => event.stopPropagation()}><header className="ai-drawer-header"><span><Bot size={15} /> Agentic Twin // Online</span><button aria-label="Close chat" onClick={() => setOpen(false)}><X size={18} /></button></header><div className="ai-drawer-messages scrollbar-hide" ref={messagesRef} aria-live="polite">{messages.map((message, index) => <p className={`drawer-message ${message.role}`} key={`${message.role}-${index}`}>{message.text}</p>)}{thinking && <p className="drawer-message agent thinking">Thinking…</p>}</div><div className="drawer-chips scrollbar-hide">{chips.map((chip) => <button key={chip} onClick={() => ask(chip)}>{chip}</button>)}</div><form className="drawer-form" onSubmit={submit}><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask the twin..." aria-label="Message Agentic Twin" /><button aria-label="Send message" disabled={thinking}><Send size={15} /></button></form></motion.aside></motion.div>}</AnimatePresence></>;
}
