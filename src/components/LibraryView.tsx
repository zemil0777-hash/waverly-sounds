import { Music2, ListMusic, Plus, Heart } from "lucide-react";
import { usePlaylistContext } from "@/context/PlaylistContext";
import { usePlayer } from "@/context/PlayerContext";
import { Play } from "lucide-react";
import { useState } from "react";

interface LibraryViewProps {
  onNavigatePlaylist: (playlistId: string) => void;
}

const LibraryView = ({ onNavigatePlaylist }: LibraryViewProps) => {
  const { userPlaylists, savedSongs, createPlaylist } = usePlaylistContext();
  const { playSong } = usePlayer();
  const [tab, setTab] = useState<"playlists" | "songs">("playlists");

  const handleNew = () => {
    const name = prompt("Nombre de la nueva playlist:");
    if (name?.trim()) createPlaylist(name.trim());
  };

  return (
    <div className="page-enter">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-6">Tu Biblioteca</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab("playlists")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            tab === "playlists" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
          }`}
        >
          <ListMusic className="w-4 h-4 inline mr-1.5" />
          Playlists
        </button>
        <button
          onClick={() => setTab("songs")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            tab === "songs" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
          }`}
        >
          <Heart className="w-4 h-4 inline mr-1.5" />
          Canciones
        </button>
      </div>

      {tab === "playlists" && (
        <div className="space-y-3 animate-fade-in">
          {/* Create button */}
          <button
            onClick={handleNew}
            className="w-full flex items-center gap-3 p-4 rounded-xl glass-card hover:bg-secondary transition-all duration-200 group"
          >
            <div className="w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center">
              <Plus className="w-6 h-6 text-primary" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-foreground">Crear nueva playlist</p>
              <p className="text-xs text-muted-foreground">Organiza tu música a tu manera</p>
            </div>
          </button>

          {userPlaylists.map((pl, i) => (
            <button
              key={pl.id}
              onClick={() => onNavigatePlaylist(pl.id)}
              className="w-full flex items-center gap-3 p-3 rounded-xl glass-card hover:bg-secondary transition-all duration-200 group animate-fade-in"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <img src={pl.cover} alt={pl.name} className="w-14 h-14 rounded-lg object-cover shadow-md" width={56} height={56} />
              <div className="text-left flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">{pl.name}</p>
                <p className="text-xs text-muted-foreground">{pl.songCount} canciones</p>
              </div>
            </button>
          ))}

          {userPlaylists.length === 0 && (
            <div className="text-center py-12">
              <Music2 className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">No tienes playlists aún</p>
            </div>
          )}
        </div>
      )}

      {tab === "songs" && (
        <div className="space-y-1 animate-fade-in">
          {savedSongs.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">No has guardado canciones aún</p>
              <p className="text-muted-foreground/60 text-xs mt-1">Presiona el ♥ en cualquier canción</p>
            </div>
          ) : (
            savedSongs.map((song, i) => (
              <button
                key={song.id}
                onClick={() => playSong(song)}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-all duration-200 group animate-fade-in"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <img src={song.cover} alt={song.title} className="w-11 h-11 rounded-md object-cover" width={44} height={44} />
                <div className="text-left flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{song.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-4 h-4 text-primary fill-current" />
                </div>
                <span className="text-xs text-muted-foreground">{song.duration}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default LibraryView;
