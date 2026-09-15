import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";

const defaultRedirectUri = "http://127.0.0.1:3000/api/spotify/callback";

export async function GET(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Spotify authorization setup is disabled." }, { status: 404 });
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI || defaultRedirectUri;
  if (!clientId) {
    return NextResponse.json({ error: "Spotify is not configured." }, { status: 503 });
  }

  const state = randomBytes(24).toString("hex");
  const authorizeUrl = new URL("https://accounts.spotify.com/authorize");
  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("response_type", "code");
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("scope", "user-read-currently-playing user-read-recently-played");
  authorizeUrl.searchParams.set("state", state);

  const response = NextResponse.redirect(authorizeUrl);
  response.cookies.set("spotify_oauth_state", state, {
    httpOnly: true,
    secure: new URL(request.url).protocol === "https:",
    sameSite: "lax",
    maxAge: 600,
    path: "/api/spotify",
  });
  return response;
}
