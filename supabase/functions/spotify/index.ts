import { corsHeaders } from "@supabase/supabase-js/cors";

let cachedToken: string | null = null;
let tokenExpiry = 0;

async function getSpotifyToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiry) return cachedToken;

  const clientId = Deno.env.get("SPOTIFY_CLIENT_ID");
  const clientSecret = Deno.env.get("SPOTIFY_CLIENT_SECRET");
  if (!clientId || !clientSecret) throw new Error("Spotify credentials not configured");

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Spotify auth failed [${res.status}]: ${err}`);
  }

  const data = await res.json();
  cachedToken = data.access_token;
  tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
  return cachedToken!;
}

async function spotifyFetch(endpoint: string, token: string) {
  const res = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Spotify API error [${res.status}]: ${err}`);
  }
  return res.json();
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get("action");
    const token = await getSpotifyToken();

    let result: any;

    switch (action) {
      case "search": {
        const q = url.searchParams.get("q");
        if (!q) throw new Error("Missing query parameter 'q'");
        const types = url.searchParams.get("types") || "track,artist,album";
        const limit = url.searchParams.get("limit") || "10";
        const market = url.searchParams.get("market") || "AR";
        result = await spotifyFetch(
          `search?q=${encodeURIComponent(q)}&type=${types}&limit=${limit}&market=${market}`,
          token
        );
        break;
      }

      case "artist": {
        const id = url.searchParams.get("id");
        if (!id) throw new Error("Missing artist 'id'");
        const [artist, topTracks, albums] = await Promise.all([
          spotifyFetch(`artists/${id}`, token),
          spotifyFetch(`artists/${id}/top-tracks?market=AR`, token),
          spotifyFetch(`artists/${id}/albums?limit=20&include_groups=album,single&market=AR`, token),
        ]);
        result = { artist, topTracks: topTracks.tracks, albums: albums.items };
        break;
      }

      case "playlist": {
        const id = url.searchParams.get("id");
        if (!id) throw new Error("Missing playlist 'id'");
        const limit = url.searchParams.get("limit") || "20";
        result = await spotifyFetch(`playlists/${id}?limit=${limit}&market=AR`, token);
        break;
      }

      case "playlist-tracks": {
        const id = url.searchParams.get("id");
        if (!id) throw new Error("Missing playlist 'id'");
        const limit = url.searchParams.get("limit") || "20";
        result = await spotifyFetch(`playlists/${id}/tracks?limit=${limit}&market=AR`, token);
        break;
      }

      case "featured": {
        const market = url.searchParams.get("market") || "AR";
        result = await spotifyFetch(`browse/new-releases?limit=10&country=${market}`, token);
        break;
      }

      default:
        throw new Error(`Unknown action: ${action}`);
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Spotify edge function error:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
