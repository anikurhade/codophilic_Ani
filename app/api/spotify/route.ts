import { NextResponse } from "next/server";

const spotifyTokenUrl = "https://accounts.spotify.com/api/token";
const currentlyPlayingUrl = "https://api.spotify.com/v1/me/player/currently-playing";
const recentlyPlayedUrl = "https://api.spotify.com/v1/me/player/recently-played?limit=1";
const noStore = { "Cache-Control": "no-store" };

type SpotifyTokenResponse = { access_token: string };
type SpotifyTrack = {
  name?: string;
  artists?: Array<{ name?: string }>;
  album?: { images?: Array<{ url?: string }> };
  external_urls?: { spotify?: string };
};
type CurrentlyPlayingResponse = { is_playing?: boolean; item?: SpotifyTrack };
type RecentlyPlayedResponse = { items?: Array<{ track?: SpotifyTrack }> };

const requestLog = new Map<string, number[]>();
const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 30;

function isRateLimited(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const address = forwardedFor?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  const now = Date.now();
  const recentRequests = (requestLog.get(address) || []).filter((timestamp) => now - timestamp < RATE_WINDOW_MS);
  if (recentRequests.length >= RATE_LIMIT) {
    requestLog.set(address, recentRequests);
    return true;
  }
  recentRequests.push(now);
  requestLog.set(address, recentRequests);
  return false;
}

function offlineResponse(status = 200) {
  return NextResponse.json({
    isPlaying: false,
    title: "Last seen listening to Mohammed Rafi",
    artist: "Offline mode",
    albumImageUrl: null,
    songUrl: null,
  }, { status, headers: noStore });
}

export async function GET(request: Request) {
  if (isRateLimited(request)) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429, headers: { ...noStore, "Retry-After": "60" } });
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) return offlineResponse(503);

  const tokenResponse = await fetch(spotifyTokenUrl, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: refreshToken }),
    cache: "no-store",
  });
  if (!tokenResponse.ok) return offlineResponse(502);

  const { access_token: accessToken } = (await tokenResponse.json()) as SpotifyTokenResponse;
  const headers = { Authorization: `Bearer ${accessToken}` };
  const currentResponse = await fetch(currentlyPlayingUrl, { headers, cache: "no-store" });
  let track: SpotifyTrack | undefined;
  let isPlaying = false;

  if (currentResponse.ok && currentResponse.status !== 204) {
    const current = (await currentResponse.json()) as CurrentlyPlayingResponse;
    track = current.item;
    isPlaying = current.is_playing === true;
  }

  if (!track?.name || !isPlaying) {
    const recentResponse = await fetch(recentlyPlayedUrl, { headers, cache: "no-store" });
    if (!recentResponse.ok) return offlineResponse(502);
    track = ((await recentResponse.json()) as RecentlyPlayedResponse).items?.[0]?.track;
  }

  if (!track?.name) return offlineResponse();
  return NextResponse.json({
    isPlaying,
    title: track.name,
    artist: track.artists?.map((artist) => artist.name).filter(Boolean).join(", ") || "Unknown artist",
    albumImageUrl: track.album?.images?.[0]?.url || null,
    songUrl: track.external_urls?.spotify || null,
  }, { headers: noStore });
}
