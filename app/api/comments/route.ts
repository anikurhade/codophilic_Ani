import { createHmac } from "node:crypto";
import { NextResponse } from "next/server";

const commentFields = "id,author_name,linkedin_url,body,created_at";
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const rateLimitSecret = process.env.COMMENTS_RATE_LIMIT_SECRET;
  if (!url || !anonKey || !serviceRoleKey || !rateLimitSecret || rateLimitSecret.length < 32) return null;
  return { url: url.replace(/\/+$/, ""), anonKey, serviceRoleKey, rateLimitSecret };
}

function getRateLimitFingerprint(request: Request, secret: string) {
  const forwardedFor = request.headers.get("x-vercel-forwarded-for")
    ?? request.headers.get("x-forwarded-for");
  const clientAddress = request.headers.get("x-real-ip")
    ?? forwardedFor?.split(",")[0]?.trim();
  if (!clientAddress) return null;
  return createHmac("sha256", secret).update(clientAddress).digest("hex");
}

async function consumeRateLimit(url: string, key: string, fingerprint: string) {
  const response = await fetch(`${url}/rest/v1/rpc/consume_blog_comment_rate_limit`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ p_fingerprint: fingerprint }),
    cache: "no-store",
  });
  if (!response.ok) {
    console.error("Supabase comment rate limit check failed", response.status);
    throw new Error("Comment rate limit could not be checked.");
  }
  const allowed: unknown = await response.json();
  if (typeof allowed !== "boolean") throw new Error("Comment rate limit returned an invalid response.");
  return allowed;
}

function validLinkedInProfile(value: unknown): value is string {
  if (typeof value !== "string") return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:"
      && (url.hostname === "linkedin.com" || url.hostname === "www.linkedin.com")
      && !url.search
      && !url.hash
      && /^\/(in|pub)\/[^/]+\/?$/.test(url.pathname);
  } catch {
    return false;
  }
}

export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("slug") ?? "";
  if (!slugPattern.test(slug)) {
    return NextResponse.json({ error: "A valid article slug is required." }, { status: 400 });
  }

  const config = getSupabaseConfig();
  if (!config) {
    return NextResponse.json({ error: "Comments are not fully configured yet." }, { status: 503 });
  }

  const query = new URLSearchParams({
    select: commentFields,
    article_slug: `eq.${slug}`,
    is_approved: "eq.true",
    order: "created_at.asc",
    limit: "100",
  });

  try {
    const response = await fetch(`${config.url}/rest/v1/blog_comments?${query}`, {
      headers: { apikey: config.anonKey, Authorization: `Bearer ${config.anonKey}` },
      cache: "no-store",
    });
    if (!response.ok) {
      console.error("Supabase comment read failed", response.status);
      return NextResponse.json({ error: "Comments could not be loaded." }, { status: 502 });
    }
    const comments: unknown = await response.json();
    if (!Array.isArray(comments)) {
      console.error("Supabase comment read returned an invalid response.");
      return NextResponse.json({ error: "Comments could not be loaded." }, { status: 502 });
    }
    return NextResponse.json({ comments });
  } catch (error) {
    console.error("Supabase comment read request failed", error);
    return NextResponse.json({ error: "Comments could not be loaded." }, { status: 502 });
  }
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ error: "A comment payload is required." }, { status: 400 });
  }
  const input = payload as Record<string, unknown>;
  const slug = input.slug;
  const body = typeof input.body === "string" ? input.body.trim() : "";
  const anonymous = input.anonymous === true;
  const authorName = typeof input.authorName === "string" ? input.authorName.trim() : "";

  if (typeof slug !== "string" || !slugPattern.test(slug)) {
    return NextResponse.json({ error: "A valid article slug is required." }, { status: 400 });
  }
  if (body.length < 1 || body.length > 2000) {
    return NextResponse.json({ error: "Comments must be between 1 and 2000 characters." }, { status: 400 });
  }
  if (!anonymous && (authorName.length < 1 || authorName.length > 80 || !validLinkedInProfile(input.linkedinUrl))) {
    return NextResponse.json({ error: "Enter a name and a valid LinkedIn profile URL." }, { status: 400 });
  }

  const config = getSupabaseConfig();
  if (!config) {
    return NextResponse.json({ error: "Comments are not fully configured yet." }, { status: 503 });
  }
  const fingerprint = getRateLimitFingerprint(request, config.rateLimitSecret);
  if (!fingerprint) {
    return NextResponse.json({ error: "Comment submission requires a trusted client IP." }, { status: 503 });
  }

  try {
    if (!await consumeRateLimit(config.url, config.serviceRoleKey, fingerprint)) {
      return NextResponse.json({ error: "Too many comments. Please try again in 15 minutes." }, { status: 429 });
    }
  } catch (error) {
    console.error("Comment rate limit request failed", error);
    return NextResponse.json({ error: "Comment submission is temporarily unavailable." }, { status: 503 });
  }

  try {
    const response = await fetch(`${config.url}/rest/v1/blog_comments`, {
      method: "POST",
      headers: {
        apikey: config.serviceRoleKey,
        Authorization: `Bearer ${config.serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        article_slug: slug,
        author_name: anonymous ? null : authorName,
        linkedin_url: anonymous ? null : input.linkedinUrl,
        body,
      }),
      cache: "no-store",
    });
    if (!response.ok) {
      console.error("Supabase comment insert failed", response.status);
      return NextResponse.json({ error: "Your comment could not be submitted." }, { status: 502 });
    }
    return NextResponse.json({ submitted: true }, { status: 202 });
  } catch (error) {
    console.error("Supabase comment insert request failed", error);
    return NextResponse.json({ error: "Your comment could not be submitted." }, { status: 502 });
  }
}
