import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Song, Playlist } from "@/data/mockData";

interface PlaylistContextType {
  userPlaylists: Playlist[];
  savedSongs: Song[];
  createPlaylist: (name: string) => void;
  renamePlaylist: (id: string, name: string) => void;
  deletePlaylist: (id: string) => void;
  addSongToPlaylist: (playlistId: string, song: Song) => void;
  removeSongFromPlaylist: (playlistId: string, songId: string) => void;
  getPlaylistSongs: (playlistId: string) => Song[];
  toggleSavedSong: (song: Song) => void;
  isSongSaved: (songId: string) => boolean;
}

const PlaylistContext = createContext<PlaylistContextType | null>(null);

export const usePlaylistContext = () => {
  const ctx = useContext(PlaylistContext);
  if (!ctx) throw new Error("usePlaylistContext must be inside PlaylistProvider");
  return ctx;
};

interface PlaylistWithSongs extends Playlist {
  songs: Song[];
}

export const PlaylistProvider = ({ children }: { children: ReactNode }) => {
  const [playlists, setPlaylists] = useState<PlaylistWithSongs[]>([
    {
      id: "user-1",
      name: "Mis Favoritas",
      cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
      songCount: 0,
      songs: [],
    },
  ]);
  const [savedSongs, setSavedSongs] = useState<Song[]>([]);

  const createPlaylist = useCallback((name: string) => {
    const newPl: PlaylistWithSongs = {
      id: `user-${Date.now()}`,
      name,
      cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop",
      songCount: 0,
      songs: [],
    };
    setPlaylists((p) => [...p, newPl]);
  }, []);

  const renamePlaylist = useCallback((id: string, name: string) => {
    setPlaylists((p) => p.map((pl) => (pl.id === id ? { ...pl, name } : pl)));
  }, []);

  const deletePlaylist = useCallback((id: string) => {
    setPlaylists((p) => p.filter((pl) => pl.id !== id));
  }, []);

  const addSongToPlaylist = useCallback((playlistId: string, song: Song) => {
    setPlaylists((p) =>
      p.map((pl) => {
        if (pl.id !== playlistId) return pl;
        if (pl.songs.some((s) => s.id === song.id)) return pl;
        const updatedSongs = [...pl.songs, song];
        return {
          ...pl,
          songs: updatedSongs,
          songCount: updatedSongs.length,
          cover: updatedSongs[0]?.cover || pl.cover,
        };
      })
    );
  }, []);

  const removeSongFromPlaylist = useCallback((playlistId: string, songId: string) => {
    setPlaylists((p) =>
      p.map((pl) => {
        if (pl.id !== playlistId) return pl;
        const updatedSongs = pl.songs.filter((s) => s.id !== songId);
        return { ...pl, songs: updatedSongs, songCount: updatedSongs.length };
      })
    );
  }, []);

  const getPlaylistSongs = useCallback(
    (playlistId: string) => {
      return playlists.find((p) => p.id === playlistId)?.songs || [];
    },
    [playlists]
  );

  const toggleSavedSong = useCallback((song: Song) => {
    setSavedSongs((prev) => {
      if (prev.some((s) => s.id === song.id)) {
        return prev.filter((s) => s.id !== song.id);
      }
      return [...prev, song];
    });
  }, []);

  const isSongSaved = useCallback(
    (songId: string) => savedSongs.some((s) => s.id === songId),
    [savedSongs]
  );

  return (
    <PlaylistContext.Provider
      value={{
        userPlaylists: playlists,
        savedSongs,
        createPlaylist,
        renamePlaylist,
        deletePlaylist,
        addSongToPlaylist,
        removeSongFromPlaylist,
        getPlaylistSongs,
        toggleSavedSong,
        isSongSaved,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};
