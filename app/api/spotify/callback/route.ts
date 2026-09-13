import { NextRequest, NextResponse } from "next/server";

const defaultRedirectUri = "http://127.0.0.1:3000/api/spotify/callback";

type TokenResponse = {
  refresh_token?: string;
};

export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Spotify authorization setup is disabled." }, { status: 404 });
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI || defaultRedirectUri;
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const savedState = request.cookies.get("spotify_oauth_state")?.value;

  if (!clientId || !clientSecret || !code || !state || !savedState || state !== savedState) {
    return NextResponse.json({ error: "Invalid Spotify authorization request." }, { status: 400 });
  }

  const authorization = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${authorization}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "authorization_code", code, redirect_uri: redirectUri }),
    cache: "no-store",
  });

  if (!tokenResponse.ok) {
    return NextResponse.json({ error: "Spotify authorization failed." }, { status: 502 });
  }

  const token = (await tokenResponse.json()) as TokenResponse;
  if (!token.refresh_token) {
    return NextResponse.json({ error: "Spotify did not return a refresh token." }, { status: 502 });
  }

  const response = NextResponse.json({ refresh_token: token.refresh_token }, {
    headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
  });
  response.cookies.delete("spotify_oauth_state");
  return response;
}
