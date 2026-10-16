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
    title: "Bringing Airline Layover Math to Real-Time Carpooling",
    category: "Java / Graph Algorithms",
    readingMinutes: 8,
    date: "October 2026",
    excerpt:
      "How I engineered a time-expanded graph router in Java and Spring Boot to stitch fragmented rides into seamless multi-hop itineraries.",
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
      {
        heading: "Make transfer feasibility a first-class contract",
        paragraphs: [
          "A transfer edge is not simply “the next ride starts nearby.” It is a contract between two ride segments: the first must reach a compatible meeting point, the second must leave late enough for the rider to get there, and the combined itinerary must remain inside the requested arrival window. The minimum transfer buffer can vary by location, accessibility needs, and whether a walk between pickup points is required.",
          "I model a candidate itinerary as immutable legs plus derived connection data. That makes it possible to recalculate feasibility when a ride changes without mutating the user's original search request. It also gives the interface concrete reasons for rejecting an otherwise nearby option: the departure is too early, the walk is too long, the wait exceeds the limit, or the vehicle has no remaining seat.",
          "A Spring Boot service can keep the responsibilities separate: an adapter fetches candidate rides, a routing component explores feasible continuations, and an itinerary composer converts the winning path into a stable response. This is a design sketch rather than a claim about a deployed production service; the important boundary is that graph search returns candidates while booking revalidates inventory and creates a seat hold transactionally.",
        ],
        code: {
          language: "java",
          title: "Illustrative connection check",
          source: `boolean canConnect(Ride first, Ride next, Duration minBuffer, Duration maxWait) {
    if (!first.dropoff().equals(next.pickup())) return false;
    Duration wait = Duration.between(first.arrivesAt(), next.departsAt());
    return wait.compareTo(minBuffer) >= 0
        && wait.compareTo(maxWait) <= 0
        && first.arrivesAt().isBefore(next.departsAt());
}`,
        },
      },
      {
        heading: "Choose an algorithm by the promise you can keep",
        paragraphs: [
          "Dijkstra is a strong baseline when every transition has a non-negative cost and the state includes everything needed to determine the next feasible ride. A* can reduce work when its heuristic is a genuine lower bound—for example, straight-line distance divided by an optimistic maximum speed. A heuristic that overestimates can make the search faster but invalidates the shortest-path guarantee.",
          "The bigger decision is often not Dijkstra versus A*. It is which constraints belong in the state, which are hard exclusions, and which are soft preferences. A maximum transfer count is a hard bound; a preference for shorter waits may be a cost. Mixing these categories can produce surprising results and makes the score hard to explain.",
          "For an early product, a bounded, deterministic search with explicit limits is often more useful than a theoretically sophisticated planner that returns opaque choices. Record why a candidate was discarded, make scoring weights inspectable, and compare ranked results against hand-built scenarios before tuning for speed.",
        ],
        table: {
          headers: ["Choice", "Best fit", "Trade-off"],
          rows: [
            ["Dijkstra", "Reliable baseline for non-negative route costs", "May explore more of the candidate graph"],
            ["A*", "Large searches with a valid lower-bound heuristic", "Correctness depends on an admissible heuristic"],
            ["Time-expanded graph", "Explicit schedules and transfer states", "More vertices and edges as time resolution grows"],
          ],
        },
      },
      {
        heading: "Treat search results as expiring proposals",
        paragraphs: [
          "A route result is a snapshot, not a promise that all seats still exist. Each response should carry enough version and expiry information for the booking flow to revalidate every leg. If one segment disappears, the system should explain which connection broke and offer a fresh search; silently replacing a driver or transfer undermines informed consent.",
          "Idempotency keys make a retry safe when a rider submits a booking and the response is lost. A short-lived hold can reserve all required seats together or release them as a unit, avoiding a partially booked itinerary. These mechanics are as important to a practical multi-hop journey as the path-finding algorithm itself.",
          "The product succeeds when it can explain the route, show the waits and handoffs, protect private details until the rider is verified, and recover cleanly when availability changes. A shortest path is only the beginning of that promise.",
        ],
      },
      {
        heading: "Rank routes with an explainable objective",
        paragraphs: [
          "A ranking function turns product priorities into behavior, so its units and limits deserve review. One practical score can combine elapsed minutes, transfer count, expected wait, detour, and a reliability penalty. Normalize each term before weighting it; otherwise, a large value measured in minutes can dominate a small count simply because the numbers have different scales. Keep hard safety constraints outside this score so a cheap but infeasible trip can never win.",
          "The score should also preserve diversity. If the top ten results are nearly identical itineraries with the same first leg, the search has not helped the rider compare meaningful choices. Group by shared legs or transfer pattern, cap near-duplicates, and present a few alternatives such as fastest, fewest transfers, and lowest wait. Explain those labels with visible details instead of exposing a mysterious numerical rating.",
          "Weights are hypotheses about user preferences, not permanent truths. Test them against realistic journeys: a direct ride with a modest detour, two short rides with a reliable transfer, a long layover that improves arrival certainty, and a route that is fast but depends on a narrow connection. Ask reviewers which option they would choose and why. If the ordering conflicts with the explanation shown in the UI, either the score or the product language needs revision.",
          "The same evaluation set can catch regressions as route supply changes. Keep deterministic fixtures for transfer boundaries, late departures, cancellations, duplicated rides, and maximum detours. Add property checks such as non-decreasing arrival times across legs and no repeated ride in a path. Then benchmark candidate generation separately from graph traversal; optimizing the search loop will not help if spatial filtering dominates the request.",
        ],
      },
    ],
  },
  {
    slug: "inside-attentionlens",
    title: "Deconstructing Transformers: A Systems Engineer’s View of Self-Attention",
    category: "Systems / AI Internals",
    readingMinutes: 7,
    date: "October 2026",
    excerpt:
      "Treating neural networks like observable backend systems by profiling tokenization, QKV matrix transformations, and multi-head attention in real time.",
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
      {
        heading: "Follow one token through Q, K, and V",
        paragraphs: [
          "After token IDs are embedded and combined with positional information, a layer projects each hidden state into three learned views. Queries represent what a position is seeking, keys represent what positions expose for matching, and values carry the information that is mixed into the result. These are useful intuitions, not literal descriptions of a model's intent.",
          "For one head, the familiar operation is Attention(Q, K, V) = softmax((QKᵀ) / √dₖ + M)V. The dot product produces compatibility scores; scaling controls their magnitude; an optional mask M removes invalid positions; softmax turns scores into weights; and the weighted values produce a new representation. Multiple heads perform this with different learned projections before their outputs are combined.",
          "A good inspection surface makes the dimensions explicit. If an input has sequence length n, model width d, and h heads, each head commonly works at width d/h. Showing the tensor shape next to the selected layer prevents a two-dimensional heatmap from hiding the batch, head, and token axes that gave rise to it.",
        ],
        code: {
          language: "python",
          title: "Illustrative single-head attention",
          source: `scores = (query @ key.transpose(-2, -1)) / math.sqrt(key.size(-1))
if attention_mask is not None:
    scores = scores.masked_fill(attention_mask == 0, float("-inf"))
weights = torch.softmax(scores, dim=-1)
context = weights @ value`,
        },
      },
      {
        heading: "Build a visual trace that stays aligned",
        paragraphs: [
          "The visual pipeline begins before the heatmap. The tokenizer can add special tokens, split a single visible word into multiple pieces, and return offsets into the source string. If the interface labels a token using only its raw ID, a learner cannot tell which characters it came from; if it merges subword pieces without explaining the merge, it can imply a computation the model did not perform.",
          "AttentionLens should keep a stable mapping from each displayed token to its token index and source span. Selecting a token can then highlight the corresponding row, while selecting a destination highlights a column. The same selection should identify the active layer and head in every panel so the user can move from text to scores to the resulting weighted context without losing state.",
          "Masks are not decoration. A causal mask blocks future positions in decoder self-attention; a padding mask excludes filler positions. The rendering should distinguish a true zero weight from a cell that was masked before softmax. Otherwise, the visualization can look plausible while teaching the wrong operation.",
        ],
        image: {
          src: "/img/blog/attentionlens.svg",
          alt: "Token embeddings split into query, key, and value projections, producing scaled attention scores and a token-aligned heatmap.",
          caption: "Keep token identity, tensor dimensions, masks, and the selected head visible together.",
          width: 960,
          height: 480,
        },
      },
      {
        heading: "Use interaction to test hypotheses, not declare explanations",
        paragraphs: [
          "A useful lesson is comparative. Start with a short sentence, change one token, and inspect whether a particular head's pattern changes. Then repeat the experiment with another layer or head. Controlled inputs make it easier to notice patterns; they still do not prove that a highlighted relation caused the model's final output.",
          "Attention is one internal signal among many. It can be informative about token mixing, but it is not a universal explanation of model behavior. To investigate a stronger causal claim, a learner may need interventions such as ablation, activation patching, or comparison with other attribution methods. AttentionLens should make those boundaries part of the interaction rather than hiding them in a disclaimer.",
          "For performance, avoid rendering every head and every token at once. Let people choose a layer and head, cap the sequence length with a visible notice, and keep labels readable at mobile sizes. An inspector that faithfully shows one operation is more valuable than a dense dashboard that implies completeness but cannot be read.",
        ],
        table: {
          headers: ["View", "What it helps inspect", "What it does not establish"],
          rows: [
            ["Token alignment", "Which token IDs correspond to input spans", "Why the model selected its final answer"],
            ["Attention weights", "How a selected head distributes attention", "A complete causal explanation of behavior"],
            ["Q/K/V projections", "How hidden states enter an attention operation", "A human-readable semantic role for every dimension"],
          ],
        },
      },
      {
        heading: "Separate model work from interactive rendering",
        paragraphs: [
          "An inspector has two different workloads: producing model outputs and letting a person explore them. Keep those responsibilities decoupled. A model adapter can return a compact response containing token IDs, token offsets, selected-layer attention values, and shape metadata; the presentation layer can then render the chosen view without loading full tensors into a browser. This boundary also makes it easier to compare another model or tokenizer later.",
          "Attention tensors can be large even for modest sequences. If a request returns every layer, head, and token pair, memory use grows quickly and the visualization becomes overwhelming. Let the user choose a layer and head, cap long inputs with an explicit message, and cache only the expensive results that are safe to reuse. If the model runs remotely, expose inference latency and failure states rather than leaving a heatmap panel blank.",
          "Interactive details should reinforce the same index mapping everywhere: hover or keyboard focus on a token should highlight its row; selecting a destination should reveal the corresponding column; the head and layer should remain visible in the panel title. Provide a non-color cue for selected and masked cells so the chart remains understandable to people who cannot distinguish the palette.",
        ],
      },
      {
        heading: "Validate the visualization against known computations",
        paragraphs: [
          "Before asking whether a heatmap is insightful, ask whether it is correct. Use a tiny synthetic sequence where attention masks and shapes can be checked by hand. Compare extracted tensors with the model library's returned attention values for the same input, model revision, evaluation mode, and tokenizer. Small floating-point differences can be expected across devices, but axes, token order, and masking behavior should agree.",
          "A useful test suite checks invariants: each unmasked attention row sums approximately to one after softmax; masked positions contribute no probability; the number of rendered token labels matches the tokenizer output; and changing the selected head updates the data, not just the heading. Snapshot tests help catch layout drift, while numerical tests catch a more dangerous class of errors that still produces a polished image.",
          "Finally, make the limits visible in the product itself. Show the model and tokenizer identifiers, selected layer and head, and whether the view represents pre- or post-dropout attention. Keep an explanation close to the chart: the visualization exposes a computation, not a complete account of reasoning. This combination of provenance, numerical validation, and honest framing gives learners a surface they can question rather than merely admire.",
        ],
      },
    ],
  },
  {
    slug: "atlassian-event-orchestration",
    title: "Treating High-Scale Operations Like a Distributed State Machine",
    category: "Systems / Workflow Automation",
    readingMinutes: 6,
    date: "October 2026",
    excerpt:
      "Replacing manual coordination bottlenecks with event-driven workflows, structured context pipelines, and custom Rovo AI agents.",
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
      {
        heading: "Use a state machine for operational readiness",
        paragraphs: [
          "A checklist is useful, but a readiness state is more useful when it has a defined meaning. For example, an event can move from Draft to Planning, Ready for Review, Approved, Live, and Closed. Each transition should declare its prerequisites: a venue confirmation may be required before approval, while a post-event report belongs after closeout.",
          "This model prevents dashboards from presenting a pile of completed tasks as a reliable event status. A task can be done while a dependency is still unresolved; a state transition can evaluate the critical prerequisites and surface the blocker. Jira issue types, workflow conditions, and automation rules can express parts of this contract, while Confluence documents what each state means to the people using it.",
          "The model should remain simple enough that event owners can predict it. If a transition cannot be explained without reading automation source, the workflow is too clever. Start with a few meaningful gates, name the owner for each decision, and add automation only where it removes repetitive coordination without concealing accountability.",
        ],
        table: {
          headers: ["State", "Evidence required", "Human decision"],
          rows: [
            ["Planning", "Brief, scope, owner, and target date", "Confirm the event is worth planning"],
            ["Ready for review", "Critical tasks assigned; risks and costs visible", "Review scope and unresolved dependencies"],
            ["Approved", "Required approvals and fallback plans recorded", "Authorize commitments and communications"],
            ["Closed", "Actuals, feedback, incidents, and follow-ups captured", "Accept closeout and archive the runbook"],
          ],
        },
      },
      {
        heading: "Treat webhooks as at-least-once signals",
        paragraphs: [
          "Integrations should assume that webhook delivery can be delayed, duplicated, or arrive out of order. A receiver should validate the request, store the provider event identifier, acknowledge quickly, and process work asynchronously. If the same event arrives again, idempotency prevents a second Jira issue or a repeated external notification.",
          "Do not use an event payload as the only source of truth. Fetch current issue state when necessary, compare the transition with the last processed version, and make the handler safe to retry. If a downstream API is unavailable, record a retryable job and expose the failure to an operator instead of dropping the event after a successful HTTP response.",
          "The following is deliberately provider-neutral pseudocode: actual webhook signatures, event fields, and retry contracts differ by product and configuration. The reliable pattern is durable receipt, idempotent processing, and observable failure—not assuming a webhook behaves like a transaction across three tools.",
        ],
        code: {
          language: "text",
          title: "Provider-neutral webhook handling",
          source: `receive(event):
  verify_signature(event)
  if event.id already processed: acknowledge and stop
  persist(event.id, status="received")
  enqueue(event.id)
  acknowledge

worker(eventId):
  load current Jira state
  apply allowed transition once
  update Confluence context if required
  persist status or retryable failure`,
        },
      },
      {
        heading: "Give Rovo bounded work and evidence",
        paragraphs: [
          "A Rovo-assisted workflow is most useful for discovery and preparation: find similar past events, summarize approved source material, identify conflicting dates, or draft a checklist. The result should carry references back to Confluence pages and Jira issues, along with a timestamp or version where the integration exposes one. That lets an event lead verify whether a recommendation is still current.",
          "Keep generated content outside the source of truth until a person accepts it. An agent can prepare a proposed set of tasks, but creating assignments, promising a budget, or sending a broad announcement should require an authorized human decision. Permission trimming matters: the workflow must not expose content the requesting user could not access directly.",
          "When sources disagree, the system should report the conflict rather than choose the latest-looking sentence. When a source is unavailable, it should label the gap. These behaviors turn Rovo from an opaque authority into a useful coordination assistant that helps teams find context faster while leaving responsibility visible.",
        ],
      },
      {
        heading: "Measure operational confidence, not automation volume",
        paragraphs: [
          "A successful integration is not measured by how many Jira issues it creates. Track whether critical dependencies are discovered earlier, how long high-risk blockers remain unresolved, whether teams can identify the current runbook, and how often an automation needs manual repair. For AI-generated drafts, sample outputs for citation coverage, stale facts, and human correction.",
          "Keep the event itself resilient to a broken integration. The runbook should be readable without the AI layer, essential decisions should have human owners, and an operator should be able to resume a workflow from durable state. The system is valuable when it shortens coordination loops; it is trustworthy when it also makes its own limits and failures visible.",
          "Together, Jira, Confluence, and Rovo can connect execution, durable context, and discovery. Their value comes from a well-defined handoff between those responsibilities—not from collapsing them into one automation that nobody can inspect.",
        ],
      },
      {
        heading: "Design the event-day operating picture",
        paragraphs: [
          "Planning data becomes most valuable when the event is underway. The runbook should answer a small set of urgent questions quickly: what is happening now, who owns the next transition, which supplier or speaker is not confirmed, and how the team escalates a problem. Keep the live view focused on these operational facts rather than reproducing every planning document in one crowded dashboard.",
          "A readiness view can be generated from Jira status and dependencies, but it should distinguish a task that is merely late from a critical blocker that threatens a commitment. Define severity and escalation rules with the people who operate the event. Give each alert a named owner, response expectation, and fallback contact. A message without a next action is noise, especially during a live operation.",
          "Confluence provides a natural home for the canonical runbook and decision log. Jira can link to the relevant section from each high-priority task. If Rovo summarizes changes during a planning review, preserve the source links and have an owner confirm that the update belongs in the runbook. This keeps the operational view useful without letting generated summaries silently rewrite the plan.",
        ],
      },
      {
        heading: "Make integration state observable and recoverable",
        paragraphs: [
          "An integration should expose its own health: last successful sync, oldest queued event, retry count, and events that need human attention. A green Jira board does not prove that a Confluence update succeeded, and a generated summary does not prove that it used the latest approved source. These are different signals and should be monitored separately.",
          "Use a durable event log or queue for cross-tool work where losing an update would matter. Record the source event ID, the target issue or page, the attempted operation, and the result. If an API call times out after it may have succeeded, retrieve current state before retrying. Idempotency keys or deduplication records help prevent a second issue, comment, or notification.",
          "Most importantly, the event must still run if an integration is unavailable. Keep contact lists and key timings in the approved runbook, nominate a human to own manual updates, and test the fallback before event day. An automation is operationally mature when its failure is visible and the team can continue safely—not when the happy-path demo looks seamless.",
        ],
      },
    ],
  },
  {
    slug: "make-failure-legible",
    title: "Zero-Trust Data Migration: Validating 300M+ Records from C to Java",
    category: "Java / Distributed Data & AI",
    readingMinutes: 9,
    date: "October 2026",
    excerpt:
      "Why silent data corruption is the hardest distributed systems bug—and how I built a Java/PySpark diff engine with an autonomous AI triage agent to cut debugging time by 40%.",
    intro:
      "During enterprise modernization work involving more than 300 million financial records, the riskiest failures were not always crashes. A migration could finish cleanly and still change a field, drop a record, or alter a business rule. The answer was not to trust a green status; it was to compare outputs systematically, make discrepancies inspectable, and use PRISM to accelerate the investigation without handing it authority over the evidence.",
    sections: [
      {
        heading: "Define the contract at every boundary",
        paragraphs: [
          "An API promises a response shape. A booking flow promises that a seat shown as available can still be claimed. An AI assistant promises—sometimes by tone alone—that its answer is grounded enough to act on.",
          "Each boundary needs a clear contract: what the caller provides, what the service guarantees, and which errors are retryable or final. A route-search service should distinguish “no feasible itinerary” from “search could not complete” and “results may be stale.” Those states lead to different decisions.",
          "A data migration has an equally important contract: which input rows should be present, how fields are interpreted, which transformations are permitted to change, and how output completeness is established. C and Java can differ in representation, numeric conversion, string handling, and null conventions. If those rules remain implicit, a program can produce a syntactically valid file while violating the business meaning of the record.",
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
          src: "/img/blog/prism-reconciliation.svg",
          alt: "A migration comparison pipeline normalizes legacy C and Java outputs, produces field-level differences, and gives PRISM evidence for a human-reviewed PySpark investigation.",
          caption: "PRISM helps investigate discrepancies; the comparison output remains the source of evidence.",
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
      {
        heading: "Compare meaning, not just bytes",
        paragraphs: [
          "A field-by-field diff is useful only when its comparison rules match the domain contract. Byte equality can flag harmless serialization differences such as padding or format changes; loose equality can hide important distinctions such as a missing value versus an explicit zero. Normalize only where the contract permits it, and keep both raw and normalized values in the evidence record.",
          "A reliable reconciliation pass starts with structural checks: counts, duplicate keys, missing keys, and unexpected records. It then compares mapped fields using explicit rules for nulls, dates, scale, whitespace, and code pages. Differences should be categorized—missing row, extra row, field mismatch, parse failure—so an engineer can route each class to the right investigation instead of staring at one enormous text diff.",
          "At enterprise scale, partitioning and deterministic keys make the work tractable. Comparisons can be distributed across partitions, but the output must remain reproducible: stable sort keys, run identifiers, source file checksums, schema versions, and code versions help answer which exact inputs produced a mismatch. The following Java example is illustrative; it shows the comparison boundary rather than proprietary production code.",
        ],
        code: {
          language: "java",
          title: "Illustrative field-level comparison",
          source: `for (String field : schema.comparableFields()) {
    Object oldValue = normalize(field, legacy.get(field));
    Object newValue = normalize(field, modern.get(field));

    if (!Objects.equals(oldValue, newValue)) {
        differences.add(new FieldDifference(
            recordKey, field, oldValue, newValue, runId));
    }
}`,
        },
        table: {
          headers: ["Difference class", "Example", "Useful next check"],
          rows: [
            ["Missing key", "Legacy row has no Java counterpart", "Partition counts, key parsing, filtering rules"],
            ["Field mismatch", "Same key, different normalized amount", "Scale, rounding, sign, and business-rule mapping"],
            ["Schema mismatch", "Unexpected or absent output column", "Schema version, mapping configuration, serializer"],
            ["Duplicate key", "More than one row for a supposedly unique key", "Join cardinality, source duplication, deduplication contract"],
          ],
        },
      },
      {
        heading: "Let PRISM turn comparison evidence into a focused query",
        paragraphs: [
          "The comparison engine narrows the search space; PRISM helps make the next investigation faster. The agent can use schema and data-architecture context to interpret categorized compare logs, identify relevant partitions and columns, and draft a PySpark query that fetches a small, explainable sample. This is the practical role of AI in the workflow: reduce repetitive query-authoring, not invent a root cause.",
          "A generated query should be constrained to approved datasets and known columns, validated before execution, and presented with the compare-log entries that motivated it. It should not receive unrestricted access to production data simply because a prompt asks for more context. Engineers still verify the sample, inspect transformation logic, and decide whether a discrepancy is a defect, an intentional behavior change, or an unresolved rule.",
          "A representative PySpark investigation might isolate a known mismatch class by run, partition, and field. The exact table names and column mappings are environment-specific, so this snippet is illustrative and uses neutral identifiers.",
        ],
        code: {
          language: "python",
          title: "Illustrative PySpark triage query",
          source: `mismatches = (
    spark.read.table("reconciliation.field_differences")
    .where(col("run_id") == requested_run)
    .where(col("field_name") == requested_field)
    .select("record_key", "legacy_value", "java_value", "partition_id")
    .limit(100)
)
mismatches.orderBy("partition_id", "record_key").show(truncate=False)`,
        },
      },
      {
        heading: "Protect correctness while reducing triage time",
        paragraphs: [
          "The result of a comparison system is not only a pass or fail. It is an investigation trail: what was compared, how values were normalized, which fields differed, and what query or follow-up action was proposed. That makes a repeated migration run easier to reason about and gives reviewers a basis for approving changes without relying on memory.",
          "The reported outcome of this work was reconciliation across more than 1,000 assets containing millions of records and a 40% reduction in Spark-job failure triage time. The important distinction is that faster triage came from structured evidence and a targeted assistant working together—not from asking a language model to certify financial data.",
          "For any migration involving sensitive records, examples and logs should avoid exposing unnecessary personal or financial information. Use stable non-sensitive identifiers where possible, constrain retention, redact values that are not needed for diagnosis, and audit access to the reconciliation output. Observability should improve correctness without creating a second uncontrolled copy of the data.",
        ],
      },
      {
        heading: "Make the failure legible to the next engineer",
        paragraphs: [
          "A useful report gives the next engineer a starting point: run ID, code and schema versions, input fingerprints, counts, affected partitions, mismatch categories, and representative records with sensitive values protected. It also makes the status explicit: comparison completed, comparison incomplete, query generation failed, or a human decision is still required.",
          "That information turns a failure from a vague red indicator into a sequence of testable questions. Did the source change? Did a transformation behave differently? Is the mismatch expected under a new rule? Did a data-quality issue arrive before the migration? The team can answer those questions with evidence and record the decision for the next run.",
          "Reliability is not pretending every migration is correct on the first attempt. It is making incorrectness detectable, investigation repeatable, and recovery safer than guesswork.",
        ],
      },
      {
        heading: "Use shadow comparisons before switching traffic",
        paragraphs: [
          "A safer migration strategy compares legacy and modern behavior before the new implementation becomes authoritative. Run both versions against the same controlled inputs where practical, preserve the source and output fingerprints, and reconcile the results in a shadow workflow. This exposes differences while the legacy path is still available as a reference. For large batch workloads, comparisons can be staged by asset or partition so teams can learn from a representative slice before broadening the run.",
          "The acceptance gate should be explicit. Define which fields must match exactly, which are normalized by contract, which differences require a business decision, and what completeness checks must pass. Do not reduce this to “the Spark job finished.” A successful job can still omit an input partition or write a partially correct output. Track processed counts, rejected records, duplicate keys, and categorized differences alongside execution status.",
          "When a mismatch is approved as an intentional behavior change, record the rule, owner, evidence, and effective version. That turns the next migration run into a comparison against a known decision rather than reopening an old debate. It also keeps the validation harness from treating every difference as an error or, just as dangerously, teaching it to ignore a difference with no documented reason.",
        ],
      },
      {
        heading: "Measure the investigation loop, not just job duration",
        paragraphs: [
          "Batch duration is only one part of migration efficiency. A faster run can still leave engineers searching logs for hours. Useful operational measures include the time from first mismatch to a reproducible query, the fraction of differences categorized automatically, the number of manual reruns needed, and how often an investigation identifies a data issue versus a code defect. These metrics reveal whether diagnostics actually help.",
          "The 40% triage-time reduction associated with the PRISM work is meaningful because it concerns the investigation loop, not a claim that the model made the migration correct. Preserve a baseline and compare equivalent classes of failures; otherwise, a shift in workload can make the metric misleading. Review samples of generated queries and human corrections to see whether the assistant is helping consistently or only on easy cases.",
          "Finally, retain less data, not more. A durable run identifier and masked keys may be enough to connect the report to secure source records. Avoid placing full financial values in prompts or broad logs, apply access controls to reconciliation outputs, and define retention limits. Good failure visibility makes a system easier to repair without making sensitive information easier to expose.",
        ],
      },
    ],
  },
] as const;

type BlogArticle = (typeof blogArticles)[number];

export function getArticleReadTime(article: BlogArticle) {
  if ("readingMinutes" in article && article.readingMinutes) return `${article.readingMinutes} min`;

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
