"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function BlogCodeBlock({ title, language, source }: { title: string; language: string; source: string }) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");

  const copySource = async () => {
    try {
      await navigator.clipboard.writeText(source);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
  };

  return (
    <figure className="article-code w-full overflow-x-auto my-6">
      <figcaption>
        <span>{title} · {language}</span>
        <button type="button" onClick={copySource} aria-label={`Copy ${title}`}>
          {copyStatus === "copied" ? <Check size={14} /> : <Copy size={14} />}
          {copyStatus === "copied" ? "Copied" : copyStatus === "failed" ? "Copy failed" : "Copy"}
        </button>
      </figcaption>
      <pre><code>{source}</code></pre>
      <span className="sr-only" aria-live="polite">
        {copyStatus === "copied" ? "Code copied to clipboard." : copyStatus === "failed" ? "Could not copy code to clipboard." : ""}
      </span>
    </figure>
  );
}
