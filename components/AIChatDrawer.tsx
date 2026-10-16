"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Bot, Send, X } from "lucide-react";

type Message = { role: "user" | "agent"; text: string };
const chips = ["Explain PRISM's Architecture", "Atlassian Agent Details", "Tech Stack overview", "Who is Anirudha?"];

export default function AIChatDrawer() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: "agent", text: "Hi, I’m Anirudha’s Agentic Twin. Ask me about his projects, systems work, or experience." }]);
  const messagesRef = useRef<HTMLDivElement>(null);
  useEffect(() => { messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: "smooth" }); }, [messages, thinking]);

  const ask = async (value: string) => {
    const question = value.trim();
    if (!question || thinking) return;
    const conversation = [...messages.slice(1), { role: "user" as const, text: question }];
    setMessages([...messages, { role: "user", text: question }]);
    setInput("");
    setThinking(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: conversation.map(({ role, text }) => ({
            role: role === "agent" ? "assistant" : "user",
            content: text,
          })),
        }),
      });
      if (!response.ok) {
        let detail = "The Agentic Twin could not respond.";
        try {
          const payload = await response.json() as { error?: string };
          if (payload.error) detail = payload.error;
        } catch {
          detail = `The Agentic Twin request failed (${response.status}).`;
        }
        throw new Error(detail);
      }
      if (!response.body) throw new Error("The Agentic Twin returned an empty response stream.");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        setMessages([...conversation, { role: "agent", text: answer }]);
      }
      answer += decoder.decode();
      setMessages([...conversation, { role: "agent", text: answer || "The Agentic Twin returned an empty answer." }]);
    } catch (error) {
      const detail = error instanceof Error ? error.message : "The Agentic Twin request failed unexpectedly.";
      setMessages([...conversation, { role: "agent", text: detail }]);
    } finally {
      setThinking(false);
    }
  };
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); ask(input); };

  return <><button className="drawer-trigger" aria-label="Open Agentic Twin chat" onClick={() => setOpen(true)}><Bot size={19} /><span>Agentic Twin</span></button><AnimatePresence>{open && <motion.div className="drawer-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}><motion.aside className="ai-drawer bg-zinc-50 dark:bg-[#09090b]" role="dialog" aria-modal="true" aria-label="Agentic Twin chat" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 260 }} onClick={(event) => event.stopPropagation()}><header className="ai-drawer-header"><span><Bot size={15} /> Agentic Twin // Portfolio Assistant</span><button aria-label="Close chat" onClick={() => setOpen(false)}><X size={18} /></button></header><div className="ai-drawer-messages scrollbar-hide" ref={messagesRef} aria-live="polite">{messages.map((message, index) => <p className={`drawer-message ${message.role}`} key={`${message.role}-${index}`}>{message.text}</p>)}{thinking && <p className="drawer-message agent thinking">Thinking…</p>}</div><div className="drawer-chips scrollbar-hide">{chips.map((chip) => <button className="bg-zinc-200 text-zinc-800 hover:bg-zinc-300 dark:bg-zinc-900 dark:text-amber-500 dark:hover:bg-zinc-800" key={chip} onClick={() => ask(chip)}>{chip}</button>)}</div><form className="drawer-form" onSubmit={submit}><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask the twin..." aria-label="Message Agentic Twin" /><button aria-label="Send message" disabled={thinking}><Send size={15} /></button></form></motion.aside></motion.div>}</AnimatePresence></>;
}
