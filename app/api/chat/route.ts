import { groq } from "@ai-sdk/groq";
import { streamText, type ModelMessage } from "ai";
import { buildAgenticTwinPrompt } from "@/content/agentic-twin";
import { getRandomFunFacts } from "@/content/fun-facts";

type ChatMessage = { role: "user" | "assistant"; content: string };

function isChatMessage(value: unknown): value is ChatMessage {
  if (typeof value !== "object" || value === null || !("role" in value) || !("content" in value)) {
    return false;
  }

  return (value.role === "user" || value.role === "assistant")
    && typeof value.content === "string"
    && value.content.trim().length > 0
    && value.content.length <= 4_000;
}

export async function POST(request: Request) {
  if (!process.env.GROQ_API_KEY) return Response.json({ error: "Chat service is not configured." }, { status: 503 });
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON request body." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null || !("messages" in body) || !Array.isArray(body.messages)) {
    return Response.json({ error: "A message history is required." }, { status: 400 });
  }
  if (body.messages.length === 0 || !body.messages.every(isChatMessage)) {
    return Response.json({ error: "Messages must contain non-empty user or assistant text." }, { status: 400 });
  }
  if (JSON.stringify(body.messages).length > 32_000) {
    return Response.json({ error: "Message history is too large." }, { status: 413 });
  }

  const recentMessages = body.messages.slice(-12);
  const recentAssistantMessages = recentMessages
    .filter((message): message is ChatMessage => message.role === "assistant")
    .slice(-6)
    .map((message) => message.content);
  const messages: ModelMessage[] = recentMessages.map((message) => ({
    role: message.role,
    content: message.content,
  }));
  const system = buildAgenticTwinPrompt(getRandomFunFacts(2, recentAssistantMessages));
  const result = streamText({
    model: groq("llama3-8b-8192"),
    system,
    messages,
    temperature: 0.75,
  });
  return result.toTextStreamResponse();
}
