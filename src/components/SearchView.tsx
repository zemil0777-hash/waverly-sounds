import { Search, X, Play, Loader2 } from "lucide-react";
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { songs as mockSongs, artists as mockArtists } from "@/data/mockData";
import { usePlayer } from "@/context/PlayerContext";
import {
  searchSpotify,
  spotifyTrackToSong,
  searchYouTube,
  SpotifyTrack,
  SpotifyArtist,
} from "@/lib/spotifyApi";

interface SearchViewProps {
  onNavigateArtist: (artistId: string) => void;
}

const SearchView = ({ onNavigateArtist }: SearchViewProps) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [spotifyTracks, setSpotifyTracks] = useState<SpotifyTrack[]>([]);
  const [spotifyArtists, setSpotifyArtists] = useState<SpotifyArtist[]>([]);
  const { playSong } = usePlayer();
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const genres = [
    { name: "Trap", query: "trap latino" },
    { name: "Reggaeton", query: "reggaeton 2024" },
    { name: "Drill", query: "drill latino" },
    { name: "RKT", query: "RKT argentina" },
    { name: "Hip Hop", query: "hip hop latino" },
    { name: "Dembow", query: "dembow" },
  ];

  const doSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setSpotifyTracks([]);
      setSpotifyArtists([]);
      return;
    }
    setLoading(true);
    try {
      const res = await searchSpotify(q, "track,artist", 10);
      setSpotifyTracks(res.tracks?.items || []);
      setSpotifyArtists(res.artists?.items || []);
    } catch (err) {
      console.error("Search error:", err);
      // Fallback to mock data
      const lower = q.toLowerCase();
      setSpotifyTracks([]);
      setSpotifyArtists([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(query), 400);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query, doSearch]);

  const handlePlayTrack = async (track: SpotifyTrack) => {
    const song = spotifyTrackToSong(track);
    // Search YouTube for real playback
    const ytQuery = `${track.name} ${track.artists[0]?.name} official audio`;
    const videoId = await searchYouTube(ytQuery);
    song.youtubeId = videoId;
    playSong(song);
  };

  const handleArtistClick = (artist: SpotifyArtist) => {
    onNavigateArtist(artist.id);
  };

  const hasResults = spotifyTracks.length > 0 || spotifyArtists.length > 0;
  const showEmpty = query.trim().length > 2 && !hasResults && !loading;

  return (
    <div className="page-enter">
      {/* Search bar */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar canciones, artistas, álbumes..."
          className="w-full h-12 pl-12 pr-10 rounded-full bg-secondary text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          autoFocus
        />
        {query && (
          <button
            onClick={() => { setQuery(""); setSpotifyTracks([]); setSpotifyArtists([]); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 text-primary animate-spin" />
          <span className="ml-2 text-muted-foreground text-sm">Buscando...</span>
        </div>
      )}

      {/* Genre chips when no query */}
      {!query.trim() && !loading && (
        <>
          <h2 className="text-xl font-bold text-foreground mb-4">Explorar géneros urbanos</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
            {genres.map((genre, i) => (
              <button
                key={genre.name}
                onClick={() => setQuery(genre.query)}
                className="glass-card rounded-xl p-5 text-left hover:bg-primary/10 hover:border-primary/20 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span className="text-sm font-semibold text-foreground">{genre.name}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Artists results */}
      {!loading && spotifyArtists.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold text-foreground mb-3">Artistas</h3>
          <div className="space-y-2">
            {spotifyArtists.slice(0, 5).map((artist, i) => (
              <button
                key={artist.id}
                onClick={() => handleArtistClick(artist)}
                className="w-full flex items-center gap-3 p-3 rounded-xl glass-card hover:bg-secondary transition-all duration-200 animate-fade-in"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <img
                  src={artist.images?.[0]?.url || "/placeholder.svg"}
                  alt={artist.name}
                  className="w-12 h-12 rounded-full object-cover"
                  width={48}
                  height={48}
                />
                <div className="text-left flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{artist.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {artist.genres?.slice(0, 2).join(", ") || "Artista"}
                    {artist.followers?.total ? ` · ${(artist.followers.total / 1000).toFixed(0)}K seguidores` : ""}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Track results */}
      {!loading && spotifyTracks.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold text-foreground mb-3">Canciones</h3>
          <div className="space-y-1">
            {spotifyTracks.map((track, i) => (
              <button
                key={track.id}
                onClick={() => handlePlayTrack(track)}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-all duration-200 group animate-fade-in"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <img
                  src={track.album.images?.[0]?.url || "/placeholder.svg"}
                  alt={track.name}
                  className="w-11 h-11 rounded-md object-cover"
                  width={44}
                  height={44}
                />
                <div className="text-left flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{track.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {track.artists.map((a) => a.name).join(", ")} · {track.album.name}
                  </p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-4 h-4 text-primary fill-current" />
                </div>
                <div className="flex items-center gap-1 min-w-[40px] justify-end">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                  <span className="text-[10px] text-muted-foreground">{track.popularity}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {showEmpty && (
        <div className="text-center py-16 animate-fade-in">
          <p className="text-muted-foreground text-sm">No se encontraron resultados para "{query}"</p>
        </div>
      )}
    </div>
  );
};

export default SearchView;
