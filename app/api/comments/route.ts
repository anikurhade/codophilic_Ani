import { NextResponse } from "next/server";

const commentFields = "id,author_name,linkedin_url,body,created_at";
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return { url: url.replace(/\/+$/, ""), key };
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
    return NextResponse.json({ error: "Comments are not configured yet." }, { status: 503 });
  }

  const query = new URLSearchParams({
    select: commentFields,
    article_slug: `eq.${slug}`,
    order: "created_at.asc",
  });

  try {
    const response = await fetch(`${config.url}/rest/v1/blog_comments?${query}`, {
      headers: { apikey: config.key, Authorization: `Bearer ${config.key}` },
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
    return NextResponse.json({ error: "Comments are not configured yet." }, { status: 503 });
  }

  try {
    const response = await fetch(`${config.url}/rest/v1/blog_comments?select=${commentFields}`, {
      method: "POST",
      headers: {
        apikey: config.key,
        Authorization: `Bearer ${config.key}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
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
      return NextResponse.json({ error: "Your comment could not be posted." }, { status: 502 });
    }
    const inserted: unknown = await response.json();
    if (!Array.isArray(inserted) || inserted.length !== 1) {
      console.error("Supabase comment insert returned an invalid response.");
      return NextResponse.json({ error: "Your comment could not be posted." }, { status: 502 });
    }
    const [comment] = inserted;
    return NextResponse.json({ comment }, { status: 201 });
  } catch (error) {
    console.error("Supabase comment insert request failed", error);
    return NextResponse.json({ error: "Your comment could not be posted." }, { status: 502 });
  }
}
