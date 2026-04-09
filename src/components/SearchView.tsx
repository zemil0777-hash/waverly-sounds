import { Search, X } from "lucide-react";
import { useState, useMemo } from "react";
import { songs, artists } from "@/data/mockData";
import { usePlayer } from "@/context/PlayerContext";
import { Play } from "lucide-react";

interface SearchViewProps {
  onNavigateArtist: (artistId: string) => void;
}

const SearchView = ({ onNavigateArtist }: SearchViewProps) => {
  const [query, setQuery] = useState("");
  const { playSong } = usePlayer();

  const results = useMemo(() => {
    if (!query.trim()) return { songs: [], artists: [] };
    const q = query.toLowerCase();
    return {
      songs: songs.filter(
        (s) => s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q) || s.album.toLowerCase().includes(q)
      ),
      artists: artists.filter((a) => a.name.toLowerCase().includes(q) || a.genre.toLowerCase().includes(q)),
    };
  }, [query]);

  const hasResults = results.songs.length > 0 || results.artists.length > 0;
  const showEmpty = query.trim().length > 0 && !hasResults;

  const genres = ["Synthwave", "Electro", "Dream Pop", "Ambient", "Indie", "Dark Wave"];

  return (
    <div className="page-enter">
      {/* Search bar */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="¿Qué quieres escuchar?"
          className="w-full h-12 pl-12 pr-10 rounded-full bg-secondary text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          autoFocus
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {!query.trim() && (
        <>
          <h2 className="text-xl font-bold text-foreground mb-4">Explorar géneros</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {genres.map((genre, i) => (
              <button
                key={genre}
                onClick={() => setQuery(genre)}
                className="glass-card rounded-xl p-5 text-left hover:bg-primary/10 hover:border-primary/20 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span className="text-sm font-semibold text-foreground">{genre}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Results */}
      {results.artists.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold text-foreground mb-3">Artistas</h3>
          <div className="space-y-2">
            {results.artists.map((artist, i) => (
              <button
                key={artist.id}
                onClick={() => onNavigateArtist(artist.id)}
                className="w-full flex items-center gap-3 p-3 rounded-xl glass-card hover:bg-secondary transition-all duration-200 animate-fade-in"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <img src={artist.image} alt={artist.name} className="w-12 h-12 rounded-full object-cover" width={48} height={48} />
                <div className="text-left">
                  <p className="text-sm font-semibold text-foreground">{artist.name}</p>
                  <p className="text-xs text-muted-foreground">{artist.genre}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {results.songs.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold text-foreground mb-3">Canciones</h3>
          <div className="space-y-1">
            {results.songs.map((song, i) => (
              <button
                key={song.id}
                onClick={() => playSong(song)}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-all duration-200 group animate-fade-in"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <img src={song.cover} alt={song.title} className="w-11 h-11 rounded-md object-cover" width={44} height={44} />
                <div className="text-left flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{song.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{song.artist} · {song.album}</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-4 h-4 text-primary fill-current" />
                </div>
                <span className="text-xs text-muted-foreground">{song.duration}</span>
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
