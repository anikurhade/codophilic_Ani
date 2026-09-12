"use client";

import { FormEvent, useState } from "react";
import { Bot, Send, Sparkles } from "lucide-react";

const answers: Record<string, string> = {
  experience: "Anirudha is a Software Engineer at TransUnion, working on PRISM platform architecture and legacy C-to-Java modernization.",
  skills: "Core strengths include Generative AI, LangGraph, PySpark, Apache Spark, Spring Boot, Java, and cloud-native data systems.",
  projects: "Ask about FinForensics, PRISM, or the AI-Based Food Authenticity research project in the work section.",
};

export default function ChatAgent() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(["Hi — I’m Anirudha’s portfolio assistant. Ask me about his experience, skills, or projects."]);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const question = input.trim();
    if (!question) return;
    const key = Object.keys(answers).find((item) => question.toLowerCase().includes(item));
    setMessages((current) => [...current, question, key ? answers[key] : "That is ready to connect to a RAG API. For now, try asking about experience, skills, or projects."]);
    setInput("");
  };
  return <div className={`chat-agent ${open ? "is-open" : ""}`}><button className="chat-trigger" onClick={() => setOpen(!open)}><Bot size={15} /> Chat with my AI</button>{open && <div className="chat-panel"><div className="chat-title"><span><Sparkles size={13} /> AI PROFILE ASSISTANT</span><button onClick={() => setOpen(false)}>×</button></div><div className="chat-messages">{messages.map((message, index) => <p className={index % 2 ? "user-message" : ""} key={`${message}-${index}`}>{message}</p>)}</div><form onSubmit={submit}><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about my work..." aria-label="Ask the AI assistant" /><button aria-label="Send question"><Send size={14} /></button></form></div>}</div>;
}
