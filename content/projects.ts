export const projects = [
  {
    slug: "attentionlens",
    title: "AttentionLens",
    category: "Neural Architecture & Self-Attention",
    description:
      "An interactive dashboard for exploring how Transformer models process text: inspect tokenization, compare attention across heads, and visualize Query, Key, and Value transformations.",
    metrics:
      "Connects input tokens, attention weights, and QKV transformations in one exploratory interface.",
    details:
      "AttentionLens pairs a Python model layer with an interactive visualization experience. Attention maps are useful inspection tools, not complete explanations of model reasoning.",
    tech: ["PyTorch", "Hugging Face Transformers", "React Three Fiber", "QKV visualization"],
    status: "Project",
    visible: true,
    highlights: [],
    href: "/blog/inside-attentionlens",
    linkLabel: "Architecture notes",
    liveUrl: "https://attentionlens.streamlit.app/",
  },
  {
    slug: "corporate-ai-music-game",
    title: "Corporate AI Music Game",
    category: "AI / INTERACTIVE EXPERIENCE",
    description:
      "An AI-powered music game designed to turn corporate gatherings into shared, playful experiences. Music-led rounds and quick challenges give teams an inviting way to participate, compete, and connect.",
    metrics:
      "A lightweight, social game loop designed for fast onboarding and inclusive participation.",
    details:
      "The experience combines music, adaptive prompts, and completion rewards to help teams join in without a long setup. The product focus is on making participation easy and each round feel memorable.",
    tech: ["AI-assisted prompts", "Web Audio API", "React", "Gamification"],
    status: "Concept",
    visible: true,
    highlights: [],
    href: "/blog/designing-useful-ai",
    linkLabel: "AI design notes",
    liveUrl: "https://corporatemusicgame.vercel.app/",
  },
  {
    slug: "smart-carpool",
    title: "Smart Carpool Platform",
    category: "JAVA / GRAPH ROUTING",
    description:
      "A Java and Spring Boot mobility platform that uses time-expanded graph routing to compose compatible scheduled rides into practical multi-hop journeys.",
    metrics:
      "Flight-style multi-hop routing with transfers, verified-review trust signals, and privacy-first vehicle details.",
    details:
      "The routing engine can combine multiple rides and layovers into a practical itinerary. Driver risk decisions use sentiment from verified reviews alongside identity and safety checks, with policy-based debarment and a path to appeal. Vehicle details remain hidden until a rider is verified.",
    highlights: [
      "Flight-style multi-hop auto-routing combines compatible rides and transfer points into one itinerary.",
      "Automated policy-based driver restrictions use genuine verified-review sentiment and verification signals.",
      "Privacy-first car details stay hidden until the rider completes verification.",
    ],
    tech: ["Java", "Spring Boot", "Time-Expanded Dijkstra / A*", "Trust & safety", "Privacy by design"],
    status: "In Progress",
    visible: true,
    href: "/blog/multi-hop-carpool-routing",
    linkLabel: "Routing architecture",
  },
  {
    slug: "bhasha-token",
    title: "Bhasha-Token",
    category: "Tokenization Mechanics",
    description:
      "A Byte-Pair Encoding (BPE) visualizer exploring how Hindi and Marathi text is tokenized across language models.",
    metrics: "Live parsing and token-cost-analysis visualization.",
    details:
      "Temporarily hidden; the original project content is preserved here and can be restored by setting visible to true.",
    tech: ["Next.js", "FastAPI", "tiktoken"],
    status: "Project",
    visible: false,
    highlights: [],
    href: null,
    linkLabel: null,
  },
  {
    slug: "nexus-deep-context-rag",
    title: "Nexus Deep-Context RAG",
    category: "Vector Search & Embeddings",
    description:
      "An advanced retrieval pipeline using AST-aware semantic chunking to index and query legacy code without discarding operational context.",
    metrics: "Context-preserving retrieval for complex codebases.",
    details:
      "Temporarily hidden; the original project content is preserved here and can be restored by setting visible to true.",
    tech: ["ChromaDB", "LlamaIndex", "AST Parsing", "Python"],
    status: "Project",
    visible: false,
    highlights: [],
    href: null,
    linkLabel: null,
  },
  {
    slug: "prism",
    title: "PRISM",
    category: "Platform Architecture",
    description:
      "An LLM-assisted PySpark diagnostics platform and schema-aware diff engine for validating large financial asset files.",
    metrics:
      "Reconciled 300M+ records and reduced Spark job failure triage time by 40%.",
    details:
      "PRISM applies data-architecture context to validation discrepancies and helps generate targeted queries against comparison logs.",
    tech: ["PySpark", "Apache Spark", "Prompt Engineering", "Java"],
    status: "Project",
    visible: true,
    highlights: [],
    href: "/blog/make-failure-legible",
    linkLabel: "Diagnostics architecture",
  },
] as const;
