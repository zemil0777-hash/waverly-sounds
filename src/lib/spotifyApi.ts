export interface SpotifyTrack {
  id: string;
  name: string;
  artists: { id: string; name: string }[];
  album: {
    id: string;
    name: string;
    images: { url: string; width: number; height: number }[];
    release_date: string;
  };
  duration_ms: number;
  popularity: number;
  preview_url: string | null;
}

export interface SpotifyArtist {
  id: string;
  name: string;
  images: { url: string; width: number; height: number }[];
  genres: string[];
  followers: { total: number };
  popularity: number;
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  images: { url: string; width: number; height: number }[];
  release_date: string;
  total_tracks: number;
  artists: { id: string; name: string }[];
  album_type: string;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

async function callSpotify(params: Record<string, string>) {
  const queryString = new URLSearchParams(params).toString();
  const url = `${SUPABASE_URL}/functions/v1/spotify?${queryString}`;

  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE_KEY,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
    throw new Error(err.error || `Request failed: ${res.status}`);
  }

  return res.json();
}

export async function searchSpotify(query: string, types = "track,artist", limit = 10) {
  return callSpotify({ action: "search", q: query, types, limit: String(limit) });
}

export async function getArtistProfile(artistId: string) {
  return callSpotify({ action: "artist", id: artistId });
}

export async function getPlaylistTracks(playlistId: string, limit = 20) {
  return callSpotify({ action: "playlist-tracks", id: playlistId, limit: String(limit) });
}

export async function getFeaturedReleases() {
  return callSpotify({ action: "featured", market: "AR" });
}

export function spotifyTrackToSong(track: SpotifyTrack): import("@/data/mockData").Song {
  const durationSec = Math.floor(track.duration_ms / 1000);
  const mins = Math.floor(durationSec / 60);
  const secs = durationSec % 60;

  return {
    id: `spotify-${track.id}`,
    title: track.name,
    artist: track.artists.map((a) => a.name).join(", "),
    album: track.album.name,
    duration: `${mins}:${secs.toString().padStart(2, "0")}`,
    durationSeconds: durationSec,
    cover: track.album.images?.[0]?.url || "",
    youtubeId: "",
  };
}

// Search YouTube via Invidious for video playback
export async function searchYouTube(query: string): Promise<string> {
  const instances = [
    "https://inv.nadeko.net",
    "https://vid.puffyan.us",
    "https://invidious.fdn.fr",
  ];

  for (const instance of instances) {
    try {
      const res = await fetch(
        `${instance}/api/v1/search?q=${encodeURIComponent(query)}&type=video`,
        { signal: AbortSignal.timeout(5000) }
      );
      if (res.ok) {
        const results = await res.json();
        if (results?.[0]?.videoId) return results[0].videoId;
      }
    } catch {
      continue;
    }
  }
  return "";
}
