"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type SpotifyState = {
  isPlaying: boolean;
  title: string;
  artist: string;
  albumImageUrl: string | null;
  songUrl: string | null;
  source: "current" | "recent" | "offline";
};

const fallbackState: SpotifyState = {
  isPlaying: false,
  title: "Last seen listening to Mohammed Rafi",
  artist: "Offline mode",
  albumImageUrl: null,
  songUrl: null,
  source: "offline",
};
const storageKey = "anirudha:last-spotify-track";

export default function SpotifyWidget() {
  const [state, setState] = useState<SpotifyState>(fallbackState);

  useEffect(() => {
    let cancelled = false;

    const loadNowPlaying = async () => {
      try {
        const response = await fetch("/api/spotify", { cache: "no-store" });
        if (!response.ok) {
          if (!cancelled) {
            setState((currentState) => currentState.source === "offline" ? readCachedState() : currentState);
          }
          return;
        }
        const nextState = (await response.json()) as SpotifyState;
        if (!cancelled) {
          setState(nextState);
          if (nextState.source !== "offline" && nextState.title) {
            window.localStorage.setItem(storageKey, JSON.stringify(nextState));
          }
        }
      } catch {
        if (!cancelled) {
          setState((currentState) => currentState.source === "offline" ? readCachedState() : currentState);
        }
      }
    };

    setState(readCachedState());
    void loadNowPlaying();
    const interval = window.setInterval(loadNowPlaying, 30_000);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, []);

  return (
    <aside className="spotify-widget" aria-label="Spotify now playing">
      {state.albumImageUrl ? (
        <Image className="spotify-art" src={state.albumImageUrl} alt="" width={44} height={44} unoptimized />
      ) : (
        <div className="spotify-art spotify-art-fallback" aria-hidden="true">
          ♪
        </div>
      )}
      <div className="spotify-copy">
        <span className="mono spotify-label">
          <i className={state.isPlaying ? "spotify-live" : ""} /> {state.isPlaying ? "NOW PLAYING" : state.source === "offline" ? "LAST PLAYED" : "LISTENING LOG"}
        </span>
        {state.songUrl ? <a href={state.songUrl} target="_blank" rel="noopener noreferrer"><strong>{state.title}</strong></a> : <strong>{state.title}</strong>}
        <small>{state.artist}</small>
      </div>
      <span className={`spotify-equalizer${state.isPlaying ? " is-playing" : ""}`} aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
    </aside>
  );
}

function readCachedState(): SpotifyState {
  if (typeof window === "undefined") return fallbackState;

  try {
    const cached = JSON.parse(window.localStorage.getItem(storageKey) || "null") as Partial<SpotifyState> | null;
    if (cached?.title && cached.artist) {
      return {
        ...fallbackState,
        ...cached,
        isPlaying: false,
        source: "offline",
      };
    }
  } catch {
    window.localStorage.removeItem(storageKey);
  }

  return fallbackState;
}
