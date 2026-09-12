"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Bot, Send, Sparkles, X } from "lucide-react";

const knowledge = [
  { patterns: [/who (are|is) (you|anirudha)/i, /about (anirudha|him)/i], answer: "I’m the portfolio assistant for Anirudha Kurhade, a Software Engineer focused on Generative AI, data systems, and reliable backend platforms." },
  { patterns: [/experience/i, /work(ed|ing)?/i, /transunion/i, /prism/i, /career/i], answer: "Anirudha works at TransUnion on PRISM platform architecture and legacy modernization, including moving C-based rules into maintainable Java services." },
  { patterns: [/skill/i, /stack/i, /technology/i, /langgraph/i, /pyspark/i, /java/i], answer: "His core toolkit includes Agentic AI, LangGraph, RAG, PySpark, Apache Spark, Spring Boot, Java, cloud systems, and data pipelines." },
  { patterns: [/project/i, /finforensics/i, /food/i, /authenticity/i], answer: "Featured work includes FinForensics, PRISM, and AI-Based Food Authenticity for Spices. Scroll to Selected Projects to open each deep-dive." },
  { patterns: [/education/i, /degree/i, /college/i, /iit/i, /viit/i, /pgcp/i], answer: "Anirudha has a PGCP in AI Engineering on Cloud and AIOps from IIT Roorkee and a B.Tech in Computer Engineering from VIIT Pune." },
  { patterns: [/contact/i, /email/i, /hire/i, /connect/i], answer: "The quickest way to reach Anirudha is anikurhade2002@gmail.com. You can also use the contact link at the bottom of this page." },
];

const answerQuestion = (question: string) => knowledge.find(({ patterns }) => patterns.some((pattern) => pattern.test(question)))?.answer ?? "I can help with Anirudha’s experience, skills, education, projects, or contact details. Try: “What are his skills?”";

export default function FloatingAIChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState([{ text: "Hi — I’m Anirudha’s portfolio assistant. Ask me about his experience, skills, education, projects, or contact details.", fromUser: false }]);
  const messagesRef = useRef<HTMLDivElement>(null);
  const responseTimer = useRef<number | null>(null);

  useEffect(() => {
    const container = messagesRef.current;
    if (container) container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
  }, [messages, isThinking]);

  useEffect(() => () => {
    if (responseTimer.current !== null) window.clearTimeout(responseTimer.current);
  }, []);

  const ask = (question: string) => {
    if (!question.trim() || isThinking) return;
    setMessages((current) => [...current, { text: question, fromUser: true }]);
    setInput("");
    setIsThinking(true);
    responseTimer.current = window.setTimeout(() => {
      setMessages((current) => [...current, { text: answerQuestion(question), fromUser: false }]);
      setIsThinking(false);
    }, 350);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    ask(input.trim());
  };

  return <div className="floating-ai-chat">
    <AnimatePresence mode="wait">
      {!open ? <motion.button className="floating-ai-trigger" aria-label="Open AI profile assistant" onClick={() => setOpen(true)} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }}><Sparkles size={21} /><span>Chat with my AI</span></motion.button> : <motion.section className="floating-ai-panel" role="dialog" aria-label="AI profile assistant" initial={{ opacity: 0, y: 18, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: 0.96 }} transition={{ type: "spring", stiffness: 320, damping: 26 }}>
        <header className="floating-ai-title"><span><Bot size={14} /> AI PROFILE ASSISTANT</span><button aria-label="Close AI profile assistant" onClick={() => setOpen(false)}><X size={16} /></button></header>
        <div className="chat-messages scrollbar-hide" ref={messagesRef} aria-live="polite">{messages.map((message, index) => <p className={message.fromUser ? "user-message" : ""} key={`${message.text}-${index}`}>{message.text}</p>)}{isThinking && <p className="thinking">Thinking…</p>}</div>
        {messages.length === 1 && <div className="chat-prompts scrollbar-hide">{["Who are you?", "What are your skills?", "Tell me about your projects"].map((prompt) => <button key={prompt} onClick={() => ask(prompt)}>{prompt}</button>)}</div>}
        <form onSubmit={submit}><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about my work..." aria-label="Ask the AI assistant" /><button aria-label="Send question" disabled={isThinking}><Send size={14} /></button></form>
      </motion.section>}
    </AnimatePresence>
  </div>;
}
