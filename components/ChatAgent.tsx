"use client";

import { FormEvent, useState } from "react";
import { Bot, Send, Sparkles } from "lucide-react";

const knowledge = [
  { patterns: [/who (are|is) (you|anirudha)/i, /about (anirudha|him)/i], answer: "I’m the portfolio assistant for Anirudha Kurhade, a Software Engineer focused on Generative AI, data systems, and reliable backend platforms." },
  { patterns: [/experience/i, /work(ed|ing)?/i, /transunion/i, /prism/i, /career/i], answer: "Anirudha works at TransUnion on PRISM platform architecture and legacy modernization, including moving C-based rules into maintainable Java services." },
  { patterns: [/skill/i, /stack/i, /technology/i, /langgraph/i, /pyspark/i, /java/i], answer: "His core toolkit includes Agentic AI, LangGraph, RAG, PySpark, Apache Spark, Spring Boot, Java, cloud systems, and data pipelines." },
  { patterns: [/project/i, /finforensics/i, /food/i, /authenticity/i], answer: "Featured work includes FinForensics, PRISM, and AI-Based Food Authenticity for Spices. Scroll to Selected Projects to open each deep-dive." },
  { patterns: [/education/i, /degree/i, /college/i, /iit/i, /viit/i, /pgcp/i], answer: "Anirudha has a PGCP in AI Engineering on Cloud and AIOps from IIT Roorkee and a B.Tech in Computer Engineering from VIIT Pune." },
  { patterns: [/contact/i, /email/i, /hire/i, /connect/i], answer: "The quickest way to reach Anirudha is anikurhade2002@gmail.com. You can also use the contact link at the bottom of this page." },
];

function answerQuestion(question: string) {
  const match = knowledge.find(({ patterns }) => patterns.some((pattern) => pattern.test(question)));
  return match?.answer ?? "I can help with Anirudha’s experience, skills, education, projects, or contact details. Try: “What are his skills?”";
}

export default function ChatAgent() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([{ text: "Hi — I’m Anirudha’s portfolio assistant. Ask me about his experience, skills, education, projects, or contact details.", fromUser: false }]);
  const [isThinking, setIsThinking] = useState(false);
  const ask = (question: string) => {
    if (!question) return;
    setMessages((current) => [...current, { text: question, fromUser: true }]);
    setInput("");
    setIsThinking(true);
    window.setTimeout(() => {
      setMessages((current) => [...current, { text: answerQuestion(question), fromUser: false }]);
      setIsThinking(false);
    }, 350);
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    ask(input.trim());
    setInput("");
  };
  const prompts = ["Who are you?", "What are your skills?", "Tell me about your projects"];
  return <div className={`chat-agent ${open ? "is-open" : ""}`}><button className="chat-trigger" onClick={() => setOpen(!open)}><Bot size={15} /> Chat with my AI</button>{open && <div className="chat-panel"><div className="chat-title"><span><Sparkles size={13} /> AI PROFILE ASSISTANT</span><button onClick={() => setOpen(false)}>×</button></div><div className="chat-messages">{messages.map((message, index) => <p className={message.fromUser ? "user-message" : ""} key={`${message.text}-${index}`}>{message.text}</p>)}{isThinking && <p className="thinking">Thinking…</p>}</div>{messages.length === 1 && <div className="chat-prompts">{prompts.map((prompt) => <button key={prompt} onClick={() => ask(prompt)}>{prompt}</button>)}</div>}<form onSubmit={submit}><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about my work..." aria-label="Ask the AI assistant" /><button aria-label="Send question" disabled={isThinking}><Send size={14} /></button></form></div>}</div>;
}
