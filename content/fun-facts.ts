const funFacts = [
  {
    text: "He won the AI Prompt Injection Challenge at AWS Summit Mumbai 2026.",
    matchTerms: ["AWS Summit Mumbai 2026", "Prompt Injection Challenge"],
  },
  {
    text: "His core engineering work includes reconciling more than 300 million records across C-to-Java modernization.",
    matchTerms: ["300 million records", "300M+ records", "C-to-Java modernization"],
  },
  {
    text: "He uses Java and Apache Spark for large-scale data validation and reconciliation.",
    matchTerms: ["Java and Apache Spark", "large-scale data validation"],
  },
  {
    text: "He is pursuing a 24 km distance-run goal.",
    matchTerms: ["24 km distance-run", "24 km run"],
  },
  {
    text: "He writes original Hindi and Marathi poetry.",
    matchTerms: ["Hindi and Marathi poetry", "Hindi/Marathi poetry"],
  },
  {
    text: "His music clues range from Mohammed Rafi to The Weeknd.",
    matchTerms: ["Mohammed Rafi", "The Weeknd"],
  },
  {
    text: "He enjoys motorcycle rides through misty hills.",
    matchTerms: ["motorcycle rides through misty hills", "misty hills"],
  },
  {
    text: "He completed a PGCP in AI Engineering and AIOps from IIT Roorkee.",
    matchTerms: ["PGCP in AI Engineering", "IIT Roorkee"],
  },
  {
    text: "He earned a 9.4 GPA in Computer Engineering at VIIT.",
    matchTerms: ["9.4 GPA", "Computer Engineering at VIIT"],
  },
  {
    text: "He scored 96.47% in his Computer Engineering diploma at Government Polytechnic Pune.",
    matchTerms: ["96.47%", "Government Polytechnic Pune"],
  },
] as const;

export function getRandomFunFacts(count = 2, recentAssistantMessages: readonly string[] = []) {
  if (!Number.isInteger(count) || count < 0) {
    throw new RangeError("Fun-fact count must be a non-negative integer.");
  }
  if (count === 0) return [];

  const recentText = recentAssistantMessages.join("\n").toLowerCase();
  const freshFacts = funFacts.filter(
    (fact) => !fact.matchTerms.some((term) => recentText.includes(term.toLowerCase())),
  );
  const candidates = freshFacts.length >= count ? [...freshFacts] : [...funFacts];

  for (let index = candidates.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [candidates[index], candidates[swapIndex]] = [candidates[swapIndex], candidates[index]];
  }

  return candidates.slice(0, Math.min(count, candidates.length)).map(({ text }) => text);
}
