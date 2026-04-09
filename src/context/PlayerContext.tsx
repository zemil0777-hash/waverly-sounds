import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Song, songs } from "@/data/mockData";

interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  progress: number;
  volume: number;
  queue: Song[];
}

interface PlayerContextType extends PlayerState {
  playSong: (song: Song) => void;
  togglePlay: () => void;
  nextSong: () => void;
  prevSong: () => void;
  setProgress: (val: number) => void;
  setVolume: (val: number) => void;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

export const usePlayer = () => {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be inside PlayerProvider");
  return ctx;
};

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<PlayerState>({
    currentSong: songs[0],
    isPlaying: false,
    progress: 35,
    volume: 70,
    queue: songs,
  });

  const playSong = useCallback((song: Song) => {
    setState((s) => ({ ...s, currentSong: song, isPlaying: true, progress: 0 }));
  }, []);

  const togglePlay = useCallback(() => {
    setState((s) => ({ ...s, isPlaying: !s.isPlaying }));
  }, []);

  const nextSong = useCallback(() => {
    setState((s) => {
      const idx = s.queue.findIndex((q) => q.id === s.currentSong?.id);
      const next = s.queue[(idx + 1) % s.queue.length];
      return { ...s, currentSong: next, progress: 0, isPlaying: true };
    });
  }, []);

  const prevSong = useCallback(() => {
    setState((s) => {
      const idx = s.queue.findIndex((q) => q.id === s.currentSong?.id);
      const prev = s.queue[(idx - 1 + s.queue.length) % s.queue.length];
      return { ...s, currentSong: prev, progress: 0, isPlaying: true };
    });
  }, []);

  const setProgress = useCallback((val: number) => {
    setState((s) => ({ ...s, progress: val }));
  }, []);

  const setVolume = useCallback((val: number) => {
    setState((s) => ({ ...s, volume: val }));
  }, []);

  return (
    <PlayerContext.Provider value={{ ...state, playSong, togglePlay, nextSong, prevSong, setProgress, setVolume }}>
      {children}
    </PlayerContext.Provider>
  );
};
