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
    sections: [
      {
        heading: "Start with the moment that needs help",
        paragraphs: [
          "Agentic systems make it tempting to automate everything. A better starting point is to map the moments where people lose context, repeat a decision, or need a small amount of synthesis.",
          "Imagine an analyst reviewing a long incident thread. The useful intervention may be a concise timeline and a list of unresolved decisions—not an agent that silently changes the ticket, emails stakeholders, and declares the incident resolved. Start by finding the repeated cognitive work, then decide what the system can safely prepare.",
          "A practical design exercise is to write down the user's goal, the evidence available to the model, the action the model may take, and the moment a person must confirm. If those boundaries are hard to explain, the feature is probably trying to do too much.",
        ],
        image: {
          src: "/img/blog/ai-handoff.svg",
          alt: "A flow diagram showing an AI assistant gathering context, preparing a grounded suggestion, and handing the decision to a person.",
          caption: "A useful assistant makes the handoff—and the evidence behind it—visible.",
          width: 960,
          height: 480,
        },
      },
      {
        heading: "Design the handoff, not just the answer",
        paragraphs: [
          "A helpful answer is only one part of an interaction. People need to understand where it came from, what assumptions it made, and what to do next. Showing the source beside a summary makes verification cheaper. Showing uncertainty gives a person permission to slow down when the evidence is incomplete.",
          "The interface should also make the boundary between preparation and action unmistakable. Drafting a Jira ticket is different from assigning it. Suggesting a reply is different from sending it. A confirmation step should summarize the intended action and its consequences, not merely ask “Are you sure?”",
          "When a system cannot find enough evidence, the right response is not a plausible completion. It is an explicit gap: what could not be verified, what source was missing, and how the person can proceed safely.",
        ],
      },
      {
        heading: "Measure whether the next decision got easier",
        paragraphs: [
          "Model accuracy matters, but it is not the whole product outcome. Measure whether users spend less time reconstructing context, whether they can verify an answer, how often they correct a generated draft, and whether an automation creates extra review work.",
          "I keep returning to one question: does this make the next decision easier? If the answer is yes—and the system remains understandable when it is unsure—the model is doing useful work. If not, more autonomy will only make the wrong interaction happen faster.",
        ],
      },
      {
        heading: "Treat quality as a product loop",
        paragraphs: [
          "A useful evaluation set should come from real tasks, with permission and sensitive information removed. Include ordinary cases, ambiguous requests, missing sources, and situations where the correct action is to decline. Ask reviewers to score not only factual correctness but also whether the answer is traceable, appropriately scoped, and easy to correct.",
          "Pair offline evaluation with product signals: how often suggestions are accepted unchanged, edited, dismissed, or followed by a clarification request. None of those signals is a perfect proxy for value, so interpret them together and review examples. A high acceptance rate can mean excellent assistance—or that the interface makes disagreement too difficult.",
          "Finally, make iteration safe. Version prompts and retrieval settings, compare changes against a stable evaluation set, and roll out behind a feature flag where possible. That gives the team a way to learn without making every experiment a permanent behavior change for every user.",
        ],
      },
      {
        heading: "Make the safest useful action the default",
        paragraphs: [
          "The right amount of autonomy depends on reversibility and impact. Summarizing a document is easy to undo; changing access permissions is not. A useful design classifies actions by consequence, requires stronger confirmation for higher-impact changes, and records what happened so the user can understand and recover.",
          "This is where interface design and system architecture meet. A clear preview is only trustworthy if the backend enforces the same scope the preview described. A good confirmation flow is backed by authorization checks, idempotent operations, audit records, and a way to report partial failure honestly.",
          "AI feels helpful when it removes unnecessary effort without removing meaningful control. That is a narrower goal than “automate everything,” but it is also a much more dependable one.",
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
    sections: [
      {
        heading: "Modernization is translation",
        paragraphs: [
          "Modernization is not a demolition job. It is translation: understanding why something exists, preserving what matters, and creating room for a safer future. A legacy rule may look awkward in isolation because the business constraint that shaped it lives somewhere else—in an old incident report, a downstream file format, or a promise made to a customer.",
          "Replacing the code before recovering that context can make a system cleaner and less correct at the same time. The first task is therefore not to rewrite. It is to find the contract: what enters the system, what must remain true, and which edge cases people quietly rely on.",
          "That work can feel slower than opening an editor, but it changes the quality of every decision that follows. A migration plan grounded in evidence can separate essential behavior from accidental complexity instead of carrying both forward blindly.",
        ],
        image: {
          src: "/img/blog/legacy-translation.svg",
          alt: "A diagram showing legacy behavior being documented, validated, and translated into a safer modern system.",
          caption: "Good modernization carries verified behavior forward while making room for change.",
          width: 960,
          height: 480,
        },
      },
      {
        heading: "Curiosity is an engineering tool",
        paragraphs: [
          "Curiosity is often treated as a personality trait, but in engineering it is a method. Ask why a field is nullable. Ask which team consumes an export. Ask what happens when a batch is replayed. Each question tests an assumption before it becomes a production defect.",
          "The same habit applies outside code. When a decision seems obvious, curiosity slows us down just enough to notice what we may have left out. It makes room for a second explanation and a better question.",
          "This does not mean analysis should continue forever. A useful investigation has a boundary: gather enough evidence to make a reversible decision, record what remains uncertain, and learn from the result. The goal is not perfect certainty; it is a clearer next step.",
        ],
      },
      {
        heading: "Leave a clearer path",
        paragraphs: [
          "The best modernization work leaves more than a new implementation. It leaves a map: documented invariants, representative test cases, known failure modes, and a safe way to compare old and new behavior.",
          "That map helps the next engineer move with confidence instead of rediscovering the same history under deadline pressure. The long way around is not valuable because it is long. It is valuable when the extra attention prevents us from mistaking speed for progress.",
          "That slower look is where better systems—and better ideas—usually begin.",
        ],
      },
      {
        heading: "Turn recovered knowledge into executable evidence",
        paragraphs: [
          "Once the behavior is understood, capture it where it can protect future changes. A small set of representative input-output fixtures can document edge cases better than a long prose description alone. Property tests can express invariants—such as stable ordering or a conservation rule—while integration tests verify that file formats and service boundaries still agree.",
          "During a migration, compare old and new outputs on the same sanitized inputs. Differences are not automatically defects: some may be intentional corrections, while others may expose an assumption nobody had written down. Categorize them, ask the domain owner, and record the decision so the next comparison has context.",
          "This is one reason migration tooling deserves the same care as production code. Reproducible inputs, deterministic runs, useful diff reports, and clear provenance make it possible to investigate a mismatch without guessing which version produced it.",
        ],
      },
      {
        heading: "Leave uncertainty visible",
        paragraphs: [
          "Not every behavior can be recovered before work begins. Some dependencies are unavailable, old data is incomplete, or a business rule has changed since the system was written. Label those unknowns explicitly and decide whether to block the migration, isolate the uncertainty, or proceed with a monitored assumption.",
          "A clear record of uncertainty is not an admission of poor engineering. It is a way to prevent a guess from quietly becoming a permanent contract. The team can then revisit the assumption with evidence instead of rediscovering it through an incident.",
          "Curiosity gives modernization its direction; tests and decision records give it a memory. Together they make the long way around a route toward safer change rather than an excuse to delay it.",
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
    sections: [
      {
        heading: "A journey is more than connected places",
        paragraphs: [
          "Each flight is an edge with a departure time, arrival time, capacity, and rules about which connection can follow it. A connection is useful only if the passenger can make it. I approached multi-hop carpool routing with the same mental model.",
          "A ride is a scheduled segment with pickup and drop-off points, time windows, available seats, and a maximum acceptable detour. A rider's journey can be assembled from several segments, provided each handoff is feasible.",
        ],
        image: {
          src: "/img/blog/multi-hop-routing.svg",
          alt: "A route diagram connecting an origin to a destination through two scheduled rides and a transfer buffer.",
          caption: "A route is valid only when each transfer works in both space and time.",
          width: 960,
          height: 480,
        },
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
      {
        heading: "Make the search practical at platform scale",
        paragraphs: [
          "A production search should narrow candidates before running an expensive route search. Spatial indexing can find rides near the origin, destination, and plausible transfer points. Time-window filters remove departures that cannot fit the rider's schedule. Only then does the graph search evaluate feasible continuations.",
          "Search limits are product rules, not arbitrary algorithm shortcuts. A maximum number of transfers, a bound on total detour, and a reasonable horizon keep results understandable and prevent a combinatorial explosion. The interface should say when a route was excluded because of a constraint rather than imply that no route exists in the whole network.",
          "The system also needs to cope with change. A ride may be cancelled, a seat may be taken, or a driver may alter a stop. Keep route suggestions versioned against their underlying ride data, revalidate before booking, and make a changed itinerary go through a fresh confirmation rather than silently swapping a transfer.",
        ],
      },
      {
        heading: "Trust and privacy belong in the route model",
        paragraphs: [
          "A mathematically short path is not necessarily an acceptable trip. Transfer points need to be practical meeting places, wait times should avoid unsafe or unreasonable gaps, and each segment must satisfy the rider's accessibility and preference constraints. These constraints need to be explicit inputs, not hidden penalties that make the route difficult to explain.",
          "Trust signals require equally careful handling. Verified reviews can contribute evidence about reliability, but sentiment analysis is noisy and can encode sarcasm, language differences, or coordinated abuse. It should be combined with verification and policy rules, and severe restrictions need human review, an auditable reason, and a way to appeal.",
          "Privacy-first vehicle details reduce unnecessary exposure before a match is meaningful. The platform should reveal only what a verified rider needs at the right stage, while retaining the minimum operational information required to handle safety reports. Privacy is a staged disclosure design, not a promise that the system stores no sensitive information.",
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
        image: {
          src: "/img/blog/attentionlens.svg",
          alt: "A Transformer inspection diagram connecting input tokens to query, key, and value projections and an attention heatmap.",
          caption: "AttentionLens links token positions and model operations to an inspectable view.",
          width: 960,
          height: 480,
        },
      },
      {
        heading: "Interpretability needs honest boundaries",
        paragraphs: [
          "An attention weight is evidence about one computation in one layer and head; it is not, by itself, a complete explanation of why a model answered as it did. Treating a bright cell as a definitive explanation would overstate what the display can show.",
          "AttentionLens is most useful as an exploratory instrument: a way to ask sharper questions, compare patterns, and build intuition about model structure. A useful interface keeps the input, tokenization, selected head, and output view connected, and helps users move from “this cell is bright” to “what changes when I compare another head or input?”",
          "The goal is not to make a Transformer look magical—or to claim a heatmap makes it fully transparent. It is to make one important mechanism less opaque. When people can inspect the pieces, they can form better questions about the whole.",
        ],
      },
      {
        heading: "Build a visualization that stays faithful to the model",
        paragraphs: [
          "The hardest implementation detail is often alignment. Tokenizers may add special tokens, split a visible word into several pieces, or return offsets that need careful mapping back to the original string. The display should preserve that mapping and make special tokens legible rather than hiding them in a way that changes the apparent sequence.",
          "Attention values also need correct context. A causal mask prevents a decoder position from attending to future positions; padding masks suppress positions that do not represent input. If the interface omits a mask or mixes heads and layers, its matrix can look convincing while describing the wrong computation.",
          "Performance affects interpretation too. Large heatmaps become difficult to read and expensive to render. A responsive interface can virtualize token labels, limit the visible sequence length with a clear notice, and let the user inspect one layer and head at a time instead of rendering every tensor simultaneously.",
        ],
      },
      {
        heading: "The impact is better questions, not a magic explanation",
        paragraphs: [
          "A strong learning interaction begins with a question: what changes when a negation is introduced, when a name is moved, or when a different head is selected? Comparing controlled inputs helps learners notice patterns without mistaking coincidence for a rule.",
          "A useful next step is to pair attention inspection with other evidence—such as ablation experiments or feature-level analysis—while keeping each method's limits explicit. The interface can encourage those follow-up questions, but it should not collapse distinct interpretability methods into one authoritative score.",
          "AttentionLens is valuable when it helps a student or engineer move from passive curiosity to a testable hypothesis. The display is a window into selected operations, not a complete map of model cognition. That distinction makes the project more credible, not less ambitious.",
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
        image: {
          src: "/img/blog/event-orchestration.svg",
          alt: "A workflow diagram connecting an event brief in Confluence to Jira tasks and Rovo-assisted discovery and summaries.",
          caption: "A coordination system works when context, ownership, and assistance stay connected.",
          width: 960,
          height: 480,
        },
      },
      {
        heading: "Keep humans accountable for consequential actions",
        paragraphs: [
          "People should retain control over commitments such as spending, broad communications, event changes, and assignments beyond agreed ownership. AI summaries should preserve links to evidence; stale or conflicting information should be surfaced, not flattened into confident prose.",
          "Governance matters as much as tooling: clear project permissions, one canonical source for each fact, consistent naming, and a distinction between confirmed decisions and generated suggestions.",
          "Success is not the number of automations. It is whether people can quickly answer what happens next, who owns it, what is blocked, and which plan is current. Jira captures execution, Confluence preserves shared understanding, and Rovo reduces the effort of finding and connecting that understanding. Together, they can form a practical coordination layer for complex events.",
        ],
      },
      {
        heading: "Orchestrate the event lifecycle, not just the launch",
        paragraphs: [
          "A useful workflow follows the event from intake through closeout. During planning, the team confirms scope, owners, dependencies, and decision deadlines. During preparation, task status and open risks can feed a concise readiness review. On event day, a runbook should prioritize operational facts—contacts, timings, escalation paths, and fallback plans—over generated prose.",
          "After the event, attendance, feedback, incident notes, and budget reconciliation can be gathered into a retrospective. Rovo may help summarize themes, but the team should preserve source links and distinguish participant feedback from an agent's interpretation. Follow-up actions should be reviewed and assigned deliberately.",
          "This lifecycle view prevents a common automation trap: optimizing the kickoff while leaving handoffs and closeout manual. The event is only complete when commitments are tracked and reusable learning is captured in a place the next team can find.",
        ],
      },
      {
        heading: "Design signals and fallbacks before automating",
        paragraphs: [
          "A useful alert has an owner, a deadline, and a next action. “Task overdue” is a weak signal if nobody knows whether it threatens the venue booking or merely a draft agenda. Connect critical tasks to explicit dependencies and escalate only when a meaningful threshold is crossed.",
          "Every integration needs a fallback. If a Jira automation fails, the task must remain visible and a human should be able to continue the workflow. If Rovo cannot access a source, the answer should say so and link to the approved location rather than inventing a summary.",
          "Finally, review permissions and retention. Event plans can include attendee information, vendor terms, and internal decisions. Connect only the knowledge spaces the workflow needs, avoid copying personal data into broad channels, and decide how long operational records should remain available.",
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
        image: {
          src: "/img/blog/failure-contract.svg",
          alt: "A system flow showing an explicit contract, observable states, and a safe recovery path when an operation fails.",
          caption: "Reliable systems make failure legible and recovery safe.",
          width: 960,
          height: 480,
        },
      },
      {
        heading: "AI must be allowed to say what it cannot verify",
        paragraphs: [
          "Fluent language can make weak evidence sound settled. A reliable AI feature needs explicit boundaries: what it can access, which actions it may take, when approval is required, and what it does when sources disagree. It should be able to say, “I could not verify this,” and leave the user with a safe next step.",
          "The quiet contract of a system is not that nothing will fail. It is that failure will not masquerade as success. Make boundaries clear, state inspectable, and recovery truthful. That is how software earns trust—not by pretending to be infallible, but by being understandable when it is not.",
        ],
      },
      {
        heading: "Make recovery part of the original design",
        paragraphs: [
          "A recovery path should be designed alongside the happy path. For a retryable operation, explain whether retrying is safe and ensure the operation is idempotent. For a partial result, state which parts completed and which did not. For an irreversible action, provide a preview and an explicit confirmation before the system crosses the boundary.",
          "These details are not merely interface polish. They influence API contracts, persistence, job orchestration, and auditability. A system that records a request identifier and state transition can tell whether a retry is resuming work or creating a duplicate. A system that records only a final boolean cannot.",
          "Recovery should also be proportionate. If a recommendation was uncertain, invite verification; do not force a full restart. If a workflow cannot continue safely, preserve the evidence and give a clear escalation route instead of hiding the failed state.",
        ],
      },
      {
        heading: "Observe what people experience",
        paragraphs: [
          "Operational dashboards tend to report service-level facts: latency, errors, queue depth, and availability. Those are necessary, but product reliability also needs measures such as stale-result rate, duplicate-action rate, user correction frequency, and time to recover from a failed workflow.",
          "These measures need context and privacy protections. Aggregate where possible, avoid logging secrets or unnecessary personal content, and retain enough structured identifiers to trace a failure without turning observability into a second database of sensitive information.",
          "A dependable system does not claim that every response is certain or every dependency is healthy. It makes the limits visible, records what actually happened, and offers a recovery path that matches reality.",
        ],
      },
    ],
  },
] as const;

type BlogArticle = (typeof blogArticles)[number];

export function getArticleReadTime(article: BlogArticle) {
  const words = [
    article.title,
    article.intro,
    ...article.sections.flatMap((section) => [
      "heading" in section ? section.heading : "",
      ...section.paragraphs,
    ]),
  ].join(" ").trim().split(/\s+/).filter(Boolean).length;

  return `${Math.max(1, Math.ceil(words / 220))} min`;
}
