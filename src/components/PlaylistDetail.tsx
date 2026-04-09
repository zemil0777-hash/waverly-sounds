import { ArrowLeft, Play, Pencil, Trash2, X } from "lucide-react";
import { usePlaylistContext } from "@/context/PlaylistContext";
import { usePlayer } from "@/context/PlayerContext";
import { playlists as defaultPlaylists, songs as allSongs } from "@/data/mockData";
import { useState } from "react";

interface PlaylistDetailProps {
  playlistId: string;
  onBack: () => void;
}

const PlaylistDetail = ({ playlistId, onBack }: PlaylistDetailProps) => {
  const { userPlaylists, getPlaylistSongs, renamePlaylist, deletePlaylist, removeSongFromPlaylist } = usePlaylistContext();
  const { playSong, setQueue } = usePlayer();
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState("");

  // Check default playlists first
  const defaultPl = defaultPlaylists.find((p) => p.id === playlistId);
  const userPl = userPlaylists.find((p) => p.id === playlistId);
  const playlist = userPl || defaultPl;

  if (!playlist) return null;

  const isUserPlaylist = !!userPl;
  const playlistSongs = isUserPlaylist
    ? getPlaylistSongs(playlistId)
    : allSongs.slice(0, playlist.songCount > allSongs.length ? allSongs.length : Math.min(playlist.songCount, 5));

  const playAll = () => {
    if (playlistSongs.length > 0) {
      setQueue(playlistSongs);
      playSong(playlistSongs[0]);
    }
  };

  const handleRename = () => {
    if (editName.trim()) {
      renamePlaylist(playlistId, editName.trim());
      setEditing(false);
    }
  };

  const handleDelete = () => {
    if (confirm("¿Eliminar esta playlist?")) {
      deletePlaylist(playlistId);
      onBack();
    }
  };

  return (
    <div className="page-enter">
      <button
        onClick={onBack}
        className="w-9 h-9 rounded-full glass-surface flex items-center justify-center text-foreground hover:bg-secondary transition-colors mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
        <img
          src={playlist.cover}
          alt={playlist.name}
          className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl object-cover shadow-2xl shadow-primary/10"
          width={192}
          height={192}
        />
        <div className="text-center sm:text-left flex-1">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">Playlist</p>
          {editing ? (
            <div className="flex items-center gap-2 mb-2">
              <input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleRename()}
                className="text-2xl font-extrabold bg-secondary rounded-lg px-3 py-1 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                autoFocus
              />
              <button onClick={handleRename} className="text-primary text-sm font-medium">Guardar</button>
              <button onClick={() => setEditing(false)} className="text-muted-foreground"><X className="w-4 h-4" /></button>
            </div>
          ) : (
            <h1 className="text-2xl sm:text-4xl font-extrabold text-foreground mb-1">{playlist.name}</h1>
          )}
          <p className="text-muted-foreground text-sm mb-4">{playlistSongs.length} canciones</p>

          <div className="flex gap-3 justify-center sm:justify-start flex-wrap">
            <button
              onClick={playAll}
              disabled={playlistSongs.length === 0}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-primary-hover hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/30 disabled:opacity-40 disabled:hover:scale-100"
            >
              <Play className="w-4 h-4 fill-current" />
              Reproducir
            </button>
            {isUserPlaylist && (
              <>
                <button
                  onClick={() => { setEditName(playlist.name); setEditing(true); }}
                  className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-surface-hover transition-all"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={handleDelete}
                  className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Songs */}
      {playlistSongs.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-sm">Esta playlist está vacía</p>
          <p className="text-muted-foreground/60 text-xs mt-1">Agrega canciones desde las tarjetas ⋯</p>
        </div>
      ) : (
        <div className="space-y-1">
          {playlistSongs.map((song, i) => (
            <div
              key={song.id}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary transition-all duration-200 group animate-fade-in"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <span className="text-sm text-muted-foreground w-6 text-center group-hover:hidden">{i + 1}</span>
              <button
                onClick={() => playSong(song)}
                className="text-primary w-6 text-center hidden group-hover:block"
              >
                <Play className="w-4 h-4 fill-current mx-auto" />
              </button>
              <button onClick={() => playSong(song)} className="flex items-center gap-3 flex-1 min-w-0">
                <img src={song.cover} alt={song.title} className="w-10 h-10 rounded-md object-cover" width={40} height={40} />
                <div className="text-left min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{song.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
                </div>
              </button>
              <span className="text-xs text-muted-foreground">{song.duration}</span>
              {isUserPlaylist && (
                <button
                  onClick={() => removeSongFromPlaylist(playlistId, song.id)}
                  className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaylistDetail;
