export const blogArticles = [
  {
    slug: "designing-useful-ai",
    title: "Designing AI that knows when to help",
    category: "Engineering / Tech",
    date: "June 24, 2024",
    excerpt:
      "A practical note on building agentic interfaces that feel clear, grounded, and human.",
    intro:
      "The most useful AI products are not the ones that say the most. They are the ones that create confidence at the right moment.",
    readTime: "3 min",
    sections: [
      {
        paragraphs: [
          "Agentic systems make it tempting to automate everything. A better starting point is to map the moments where people lose context, repeat a decision, or need a small amount of synthesis.",
          "In practice, that means designing clear handoffs, showing the source behind an answer, and making uncertainty visible. The interface should feel like a collaborator, not a black box.",
          "I keep returning to one simple question: does this make the next decision easier? If the answer is yes, the model is doing useful work.",
        ],
      },
    ],
  },
  {
    slug: "systems-and-curiosity",
    title: "Systems, curiosity, and the long way around",
    category: "Life / Thoughts",
    date: "May 18, 2024",
    excerpt:
      "What legacy systems taught me about patience, craft, and asking better questions.",
    intro:
      "Legacy systems taught me that good engineering is often less about speed and more about leaving the next person a clearer path.",
    readTime: "3 min",
    sections: [
      {
        paragraphs: [
          "Modernization is not a demolition job. It is translation: understanding why something exists, preserving what matters, and creating room for a safer future.",
          "The same principle applies outside code. Curiosity slows us down just enough to notice the assumptions underneath a decision.",
          "That slower look is where better systems — and better ideas — usually begin.",
        ],
      },
    ],
  },
  {
    slug: "multi-hop-carpool-routing",
    title:
      "How Flight-Booking Engines Compute Multi-Stop Layovers—and How I Engineered Multi-Hop Auto-Routing in My Carpool Platform",
    category: "Engineering / Mobility",
    date: "October 2026",
    excerpt:
      "A flight itinerary is a constrained path through time. The same idea can connect several carpools into one understandable journey.",
    intro:
      "Flight search looks simple from the outside: choose two cities, choose a date, and compare itineraries. Underneath, it is a constrained path-finding problem—and that makes it a useful model for multi-hop carpooling.",
    readTime: "8 min",
    sections: [
      {
        heading: "A journey is more than connected places",
        paragraphs: [
          "Each flight is an edge with a departure time, arrival time, capacity, and rules about which connection can follow it. A connection is useful only if the passenger can make it. I approached multi-hop carpool routing with the same mental model.",
          "A ride is a scheduled segment with pickup and drop-off points, time windows, available seats, and a maximum acceptable detour. A rider's journey can be assembled from several segments, provided each handoff is feasible.",
        ],
      },
      {
        heading: "Representing time in the graph",
        paragraphs: [
          "Locations can become graph nodes and ride segments directed edges. But a city-only graph loses the most important information: time. If one ride reaches a transfer point at 10:20 and the next departs at 10:10, the geographic route connects while the itinerary does not.",
          "A time-dependent graph keeps locations as nodes but evaluates each ride against the rider's arrival time. A time-expanded graph makes each relevant location-and-time pair a distinct state, such as “Pune at 10:20,” so schedules and waiting become explicit. The expanded graph is larger, but transfer logic can be easier to inspect.",
        ],
      },
      {
        heading: "Search, score, and preserve choices",
        paragraphs: [
          "Dijkstra's algorithm finds a least-cost route when edge costs are non-negative. A* can reduce exploration when a valid lower-bound heuristic is available; straight-line distance can help estimate remaining travel time, but it must not overstate the true minimum if the heuristic is to remain admissible.",
          "For scheduled rides, edge cost depends on time. The search must respect departure availability, transfer buffers, and connection feasibility instead of pretending every ride is always available.",
          "“Best route” also needs a definition. The quickest trip may involve three transfers; the simplest may arrive later but use one handoff. A generalized cost can consider arrival time, total duration, waiting, transfer count, detour, and reliability. Keeping a small Pareto frontier—routes not dominated across these criteria—can preserve meaningful alternatives without overwhelming the rider.",
        ],
      },
      {
        heading: "A connected path must still be a usable trip",
        paragraphs: [
          "The flight analogy has limits. A missed flight is inconvenient; a missed carpool handoff may strand someone. Transfer buffers, clear pickup instructions, live updates, and revalidation are essential. Search results are suggestions, not reservations: seat availability must be checked again when a rider books, and any seat hold needs an explicit expiry.",
          "I am building this as a mobility problem with a trust layer, not just a shortest-path demo. The algorithm can propose a clever route; the product still has to make that route understandable, feasible, and safe to accept. That is the real engineering challenge: turning a mathematically connected path into a journey a person can rely on.",
        ],
      },
    ],
  },
  {
    slug: "inside-attentionlens",
    title: "Inside AttentionLens",
    category: "Engineering / AI",
    date: "October 2026",
    excerpt:
      "How an interactive view of tokens, attention heads, and QKV transformations can make Transformer mechanics easier to explore.",
    intro:
      "Transformers can be described with equations, but equations alone do not always help a learner build intuition. AttentionLens is an interactive project that makes one part of that machinery visible: how token representations interact through self-attention.",
    readTime: "7 min",
    sections: [
      {
        heading: "Start with the text the model actually sees",
        paragraphs: [
          "The experience starts with tokenization. A tokenizer divides text into tokens and maps them to IDs. Models do not read words exactly as people see them; punctuation, uncommon words, and multilingual text can split in surprising ways. Showing the token sequence gives users a concrete view of what enters the model.",
          "For a given layer and attention head, the model transforms token representations into Queries, Keys, and Values. Attention scores come from Query–Key compatibility, scaled by the key dimension, and passed through a softmax. The weights determine how much each position contributes through the Value vectors.",
        ],
      },
      {
        heading: "Connect the visual layers",
        paragraphs: [
          "A heatmap can make relationships inspectable: rows and columns correspond to token positions, and cell intensity reflects an attention weight. But a heatmap is easy to render and easy to misread. Users need to know which layer and head they are viewing, whether a causal mask is in effect, and how token positions map to the input.",
          "Showing QKV transformations alongside attention weights helps bridge abstract operations and visible patterns. The project combines a Python/model-oriented stack with an interactive visualization layer, including PyTorch, Hugging Face Transformers, and React Three Fiber.",
        ],
      },
      {
        heading: "Interpretability needs honest boundaries",
        paragraphs: [
          "An attention weight is evidence about one computation in one layer and head; it is not, by itself, a complete explanation of why a model answered as it did. Treating a bright cell as a definitive explanation would overstate what the display can show.",
          "AttentionLens is most useful as an exploratory instrument: a way to ask sharper questions, compare patterns, and build intuition about model structure. A useful interface keeps the input, tokenization, selected head, and output view connected, and helps users move from “this cell is bright” to “what changes when I compare another head or input?”",
          "The goal is not to make a Transformer look magical—or to claim a heatmap makes it fully transparent. It is to make one important mechanism less opaque. When people can inspect the pieces, they can form better questions about the whole.",
        ],
      },
    ],
  },
  {
    slug: "atlassian-event-orchestration",
    title: "Orchestrating Large-Scale Events Using the Atlassian Ecosystem",
    category: "Engineering / AI & Operations",
    date: "October 2026",
    excerpt:
      "A practical coordination model combining Jira execution, Confluence context, and Atlassian Rovo AI assistance.",
    intro:
      "A complex event is a project disguised as a date on a calendar. Jira, Confluence, and Atlassian Rovo can work together as a coordination system—if each has a clear role and AI suggestions stay grounded in evidence.",
    readTime: "7 min",
    sections: [
      {
        heading: "Give every tool a clear job",
        paragraphs: [
          "Confluence provides the durable narrative: the event brief, decisions, audience, constraints, runbook, and post-event notes. Jira turns that narrative into accountable work: tasks with owners, due dates, dependencies, and explicit states. Rovo can help people find and synthesize relevant context across connected knowledge they are permitted to access.",
          "The workflow begins with structured intake: purpose, audience, date range, format, budget constraints, expected attendance, and decision-makers. Rovo can summarize the request, surface similar past events, and draft a plan from approved material. That draft should link to its sources and remain a proposal—not silently become a promise.",
        ],
      },
      {
        heading: "Turn the plan into visible execution",
        paragraphs: [
          "After review, the plan can become Jira work for logistics, speakers, communications, registration, technology, and day-of operations. Dependencies become visible. A late venue confirmation can be shown as a risk to downstream work instead of being buried in meeting notes.",
          "Confluence remains the place where the team reads the current runbook; Jira remains the place where owners update work. Predictable transitions can trigger checklists, due-date reminders, or approval requests. Rovo can help answer “What is still blocked?” or “Which decisions changed?”—provided records are current and access rules are respected.",
        ],
      },
      {
        heading: "Keep humans accountable for consequential actions",
        paragraphs: [
          "People should retain control over commitments such as spending, broad communications, event changes, and assignments beyond agreed ownership. AI summaries should preserve links to evidence; stale or conflicting information should be surfaced, not flattened into confident prose.",
          "Governance matters as much as tooling: clear project permissions, one canonical source for each fact, consistent naming, and a distinction between confirmed decisions and generated suggestions.",
          "Success is not the number of automations. It is whether people can quickly answer what happens next, who owns it, what is blocked, and which plan is current. Jira captures execution, Confluence preserves shared understanding, and Rovo reduces the effort of finding and connecting that understanding. Together, they can form a practical coordination layer for complex events.",
        ],
      },
    ],
  },
  {
    slug: "make-failure-legible",
    title: "The Quiet Contract of Systems: Make Failure Legible",
    category: "Engineering / Systems",
    date: "October 2026",
    excerpt:
      "Reliability is not the promise that nothing fails; it is the promise that failure will not masquerade as success.",
    intro:
      "A system makes promises even when no one writes them down. The hardest failures are often not crashes, but broken promises that still produce a green checkmark.",
    readTime: "6 min",
    sections: [
      {
        heading: "Define the contract at every boundary",
        paragraphs: [
          "An API promises a response shape. A booking flow promises that a seat shown as available can still be claimed. An AI assistant promises—sometimes by tone alone—that its answer is grounded enough to act on.",
          "Each boundary needs a clear contract: what the caller provides, what the service guarantees, and which errors are retryable or final. A route-search service should distinguish “no feasible itinerary” from “search could not complete” and “results may be stale.” Those states lead to different decisions.",
        ],
      },
      {
        heading: "Make state and provenance visible",
        paragraphs: [
          "Distributed work includes intermediate states: requested, pending, confirmed, expired, and cancelled. Naming them prevents a boolean such as `done: true` from carrying several meanings. A seat should not appear reserved merely because it appeared in search results.",
          "Retries need stable request identifiers so a repeated request can be recognized rather than performed twice. Idempotency is not just an optimization; it makes retries safe.",
          "Observability helps engineers investigate through logs, metrics, and traces. Products also need user-facing observability: clear progress, visible uncertainty, and recovery choices that reflect the actual state.",
        ],
      },
      {
        heading: "AI must be allowed to say what it cannot verify",
        paragraphs: [
          "Fluent language can make weak evidence sound settled. A reliable AI feature needs explicit boundaries: what it can access, which actions it may take, when approval is required, and what it does when sources disagree. It should be able to say, “I could not verify this,” and leave the user with a safe next step.",
          "The quiet contract of a system is not that nothing will fail. It is that failure will not masquerade as success. Make boundaries clear, state inspectable, and recovery truthful. That is how software earns trust—not by pretending to be infallible, but by being understandable when it is not.",
        ],
      },
    ],
  },
] as const;
