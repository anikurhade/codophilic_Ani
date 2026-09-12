import { NextResponse } from "next/server";

const spotifyTokenUrl = "https://accounts.spotify.com/api/token";
const spotifyCurrentlyPlayingUrl = "https://api.spotify.com/v1/me/player/currently-playing";

type SpotifyTokenResponse = {
  access_token: string;
};

type SpotifyCurrentlyPlaying = {
  is_playing?: boolean;
  item?: {
    name?: string;
    artists?: Array<{ name?: string }>;
    album?: {
      images?: Array<{ url?: string }>;
    };
  };
};

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

export async function GET(request: Request) {
  if (isRateLimited(request)) {
    return NextResponse.json({ available: false }, { status: 429, headers: { "Cache-Control": "no-store", "Retry-After": "60" } });
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return NextResponse.json({ available: false }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }

  const authorization = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const tokenResponse = await fetch(spotifyTokenUrl, {
    method: "POST",
    headers: {
      Authorization: `Basic ${authorization}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  if (!tokenResponse.ok) {
    return NextResponse.json({ available: false }, { status: 502, headers: { "Cache-Control": "no-store" } });
  }

  const token = (await tokenResponse.json()) as SpotifyTokenResponse;
  const nowPlayingResponse = await fetch(spotifyCurrentlyPlayingUrl, {
    headers: { Authorization: `Bearer ${token.access_token}` },
    cache: "no-store",
  });

  if (nowPlayingResponse.status === 204 || nowPlayingResponse.status === 202) {
    return NextResponse.json({ available: false }, { headers: { "Cache-Control": "no-store" } });
  }

  if (!nowPlayingResponse.ok) {
    return NextResponse.json({ available: false }, { status: 502, headers: { "Cache-Control": "no-store" } });
  }

  const track = (await nowPlayingResponse.json()) as SpotifyCurrentlyPlaying;
  const item = track.item;
  if (!item?.name) {
    return NextResponse.json({ available: false }, { headers: { "Cache-Control": "no-store" } });
  }

  return NextResponse.json({
    available: true,
    isPlaying: track.is_playing ?? false,
    track: item.name,
    artist: item.artists?.map((artist) => artist.name).filter(Boolean).join(", ") || "Unknown artist",
    albumArt: item.album?.images?.[0]?.url || null,
  }, { headers: { "Cache-Control": "no-store" } });
}
