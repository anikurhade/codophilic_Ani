import { groq } from "@ai-sdk/groq";
import { streamText, type ModelMessage } from "ai";

const systemPrompt = "You are the digital twin of Anirudha Kurhade, an AI & Backend Architect. You must be concise, professional, and slightly witty. You are only allowed to discuss Anirudha's tech stack (Next.js, Python, LangGraph, GenAI), his projects (PRISM, FinForensics), his education (VIIT, IIT Roorkee), and his hobbies (running 24km, Hindi/Marathi poetry, photography). If asked about ANY other topic (politics, general knowledge, writing code for the user), you must reply: 'I am tightly scoped to Anirudha's professional context. Let's talk about his architecture or poetry instead.'";

export async function POST(request: Request) {
  if (!process.env.GROQ_API_KEY) return Response.json({ error: "Chat service is not configured." }, { status: 503 });
  let body: { messages?: ModelMessage[] };
  try {
    body = await request.json() as { messages?: ModelMessage[] };
  } catch {
    return Response.json({ error: "Invalid JSON request body." }, { status: 400 });
  }
  if (!Array.isArray(body.messages) || body.messages.length === 0) return Response.json({ error: "A message history is required." }, { status: 400 });
  if (JSON.stringify(body.messages).length > 32_000) return Response.json({ error: "Message history is too large." }, { status: 413 });
  const result = streamText({ model: groq("llama3-8b-8192"), system: systemPrompt, messages: body.messages.slice(-12) });
  return result.toTextStreamResponse();
}
