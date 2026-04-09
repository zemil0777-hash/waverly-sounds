import { createContext, useContext, useState, useCallback, useRef, ReactNode, useEffect } from "react";
import { Song, songs } from "@/data/mockData";
import { useYouTubePlayer } from "@/hooks/useYouTubePlayer";

interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  queue: Song[];
  shuffle: boolean;
  repeat: boolean;
}

interface PlayerContextType extends PlayerState {
  playSong: (song: Song) => void;
  togglePlay: () => void;
  nextSong: () => void;
  prevSong: () => void;
  seekTo: (seconds: number) => void;
  setVolume: (val: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  setQueue: (songs: Song[]) => void;
  ytContainerRef: React.RefObject<HTMLDivElement>;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

export const usePlayer = () => {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be inside PlayerProvider");
  return ctx;
};

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<PlayerState>({
    currentSong: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 70,
    queue: songs,
    shuffle: false,
    repeat: false,
  });

  const stateRef = useRef(state);
  stateRef.current = state;

  const handleTimeUpdate = useCallback((current: number, dur: number) => {
    setState((s) => ({ ...s, currentTime: current, duration: dur > 0 ? dur : s.duration }));
  }, []);

  const handleEnded = useCallback(() => {
    const s = stateRef.current;
    if (s.repeat && s.currentSong) {
      ytPlayer.loadVideo(s.currentSong.youtubeId);
      return;
    }
    // Auto next
    const idx = s.queue.findIndex((q) => q.id === s.currentSong?.id);
    let nextIdx: number;
    if (s.shuffle) {
      nextIdx = Math.floor(Math.random() * s.queue.length);
    } else {
      nextIdx = (idx + 1) % s.queue.length;
    }
    const next = s.queue[nextIdx];
    setState((prev) => ({ ...prev, currentSong: next, currentTime: 0, isPlaying: true }));
    ytPlayer.loadVideo(next.youtubeId);
  }, []);

  const handleStateChange = useCallback((playing: boolean) => {
    setState((s) => ({ ...s, isPlaying: playing }));
  }, []);

  const ytPlayer = useYouTubePlayer({
    onTimeUpdate: handleTimeUpdate,
    onEnded: handleEnded,
    onStateChange: handleStateChange,
    volume: state.volume,
  });

  const playSong = useCallback((song: Song) => {
    setState((s) => ({ ...s, currentSong: song, isPlaying: true, currentTime: 0, duration: song.durationSeconds }));
    ytPlayer.loadVideo(song.youtubeId);
  }, [ytPlayer]);

  const togglePlay = useCallback(() => {
    setState((s) => {
      if (s.isPlaying) {
        ytPlayer.pause();
      } else {
        ytPlayer.play();
      }
      return { ...s, isPlaying: !s.isPlaying };
    });
  }, [ytPlayer]);

  const nextSong = useCallback(() => {
    setState((s) => {
      const idx = s.queue.findIndex((q) => q.id === s.currentSong?.id);
      let nextIdx: number;
      if (s.shuffle) {
        nextIdx = Math.floor(Math.random() * s.queue.length);
      } else {
        nextIdx = (idx + 1) % s.queue.length;
      }
      const next = s.queue[nextIdx];
      ytPlayer.loadVideo(next.youtubeId);
      return { ...s, currentSong: next, currentTime: 0, isPlaying: true, duration: next.durationSeconds };
    });
  }, [ytPlayer]);

  const prevSong = useCallback(() => {
    setState((s) => {
      // If more than 3s in, restart current
      if (s.currentTime > 3 && s.currentSong) {
        ytPlayer.seekTo(0);
        return { ...s, currentTime: 0 };
      }
      const idx = s.queue.findIndex((q) => q.id === s.currentSong?.id);
      const prev = s.queue[(idx - 1 + s.queue.length) % s.queue.length];
      ytPlayer.loadVideo(prev.youtubeId);
      return { ...s, currentSong: prev, currentTime: 0, isPlaying: true, duration: prev.durationSeconds };
    });
  }, [ytPlayer]);

  const seekTo = useCallback((seconds: number) => {
    ytPlayer.seekTo(seconds);
    setState((s) => ({ ...s, currentTime: seconds }));
  }, [ytPlayer]);

  const setVolume = useCallback((val: number) => {
    ytPlayer.setVolume(val);
    setState((s) => ({ ...s, volume: val }));
  }, [ytPlayer]);

  const toggleShuffle = useCallback(() => {
    setState((s) => ({ ...s, shuffle: !s.shuffle }));
  }, []);

  const toggleRepeat = useCallback(() => {
    setState((s) => ({ ...s, repeat: !s.repeat }));
  }, []);

  const setQueueFn = useCallback((newQueue: Song[]) => {
    setState((s) => ({ ...s, queue: newQueue }));
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        ...state,
        playSong,
        togglePlay,
        nextSong,
        prevSong,
        seekTo,
        setVolume,
        toggleShuffle,
        toggleRepeat,
        setQueue: setQueueFn,
        ytContainerRef: ytPlayer.containerRef,
      }}
    >
      {/* Hidden YouTube player container */}
      <div
        ref={ytPlayer.containerRef}
        style={{ position: "fixed", top: -9999, left: -9999, width: 1, height: 1, overflow: "hidden", pointerEvents: "none" }}
        aria-hidden="true"
      />
      {children}
    </PlayerContext.Provider>
  );
};
