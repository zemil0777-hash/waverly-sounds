import {
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Shuffle, Repeat, Heart, ChevronDown,
} from "lucide-react";
import { usePlayer } from "@/context/PlayerContext";
import { usePlaylistContext } from "@/context/PlaylistContext";
import { formatTime } from "@/lib/formatTime";
import { useState } from "react";

const PlayerBar = () => {
  const {
    currentSong, isPlaying, currentTime, duration, volume, shuffle, repeat,
    togglePlay, nextSong, prevSong, seekTo, setVolume, toggleShuffle, toggleRepeat,
  } = usePlayer();
  const { toggleSavedSong, isSongSaved } = usePlaylistContext();
  const [expanded, setExpanded] = useState(false);

  if (!currentSong) return null;

  const saved = isSongSaved(currentSong.id);
  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pct = Number(e.target.value);
    const newTime = (pct / 100) * duration;
    seekTo(newTime);
  };

  // ── Expanded mobile player ──
  if (expanded) {
    return (
      <div className="fixed inset-0 z-[60] bg-background flex flex-col items-center justify-center p-8 page-enter">
        <button
          onClick={() => setExpanded(false)}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-2 transition-colors"
        >
          <ChevronDown className="w-6 h-6" />
        </button>

        <img
          src={currentSong.cover}
          alt={currentSong.title}
          className={`w-64 h-64 sm:w-72 sm:h-72 rounded-2xl object-cover shadow-2xl mb-8 transition-all duration-700 ${
            isPlaying ? "animate-pulse-glow scale-100" : "scale-95 opacity-80"
          }`}
          width={288}
          height={288}
        />

        <div className="text-center mb-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <h2 className="text-xl font-bold text-foreground">{currentSong.title}</h2>
          <p className="text-muted-foreground">{currentSong.artist}</p>
        </div>

        {/* Progress */}
        <div className="w-full max-w-sm mb-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
          <input
            type="range" min={0} max={100} value={progressPct}
            onChange={handleSeek}
            className="w-full h-1"
            style={{ background: `linear-gradient(to right, hsl(272 72% 46%) ${progressPct}%, hsl(240 10% 22%) ${progressPct}%)` }}
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-muted-foreground">{formatTime(currentTime)}</span>
            <span className="text-xs text-muted-foreground">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6 animate-fade-in" style={{ animationDelay: "300ms" }}>
          <button onClick={toggleShuffle} className={`transition-all duration-200 ${shuffle ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
            <Shuffle className="w-5 h-5" />
          </button>
          <button onClick={prevSong} className="text-foreground hover:scale-110 active:scale-95 transition-transform">
            <SkipBack className="w-6 h-6 fill-current" />
          </button>
          <button
            onClick={togglePlay}
            className="w-14 h-14 rounded-full bg-primary flex items-center justify-center hover:bg-primary-hover hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/30"
          >
            {isPlaying ? <Pause className="w-6 h-6 text-primary-foreground" /> : <Play className="w-6 h-6 text-primary-foreground ml-0.5" />}
          </button>
          <button onClick={nextSong} className="text-foreground hover:scale-110 active:scale-95 transition-transform">
            <SkipForward className="w-6 h-6 fill-current" />
          </button>
          <button onClick={toggleRepeat} className={`transition-all duration-200 ${repeat ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
            <Repeat className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={() => toggleSavedSong(currentSong)}
          className={`mt-6 transition-all duration-200 hover:scale-110 ${saved ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
        >
          <Heart className={`w-6 h-6 ${saved ? "fill-current" : ""}`} />
        </button>
      </div>
    );
  }

  // ── Desktop / mini player ──
  return (
    <footer className="fixed bottom-0 left-0 right-0 h-20 glass-surface z-50 flex items-center px-4">
      {/* Song info */}
      <div className="flex items-center gap-3 w-1/4 min-w-0">
        <button className="relative group shrink-0" onClick={() => setExpanded(true)}>
          <img
            src={currentSong.cover}
            alt={currentSong.title}
            className={`w-14 h-14 rounded-lg object-cover shadow-md transition-all duration-500 ${isPlaying ? "scale-100" : "scale-95 opacity-80"}`}
            width={56} height={56}
          />
          <div className="absolute inset-0 rounded-lg bg-background/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity md:hidden">
            <span className="text-xs text-foreground font-medium">Abrir</span>
          </div>
        </button>
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground truncate">{currentSong.title}</p>
          <p className="text-xs text-muted-foreground truncate">{currentSong.artist}</p>
        </div>
        <button
          onClick={() => toggleSavedSong(currentSong)}
          className={`hidden sm:block ml-2 transition-all duration-200 hover:scale-110 ${saved ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
        >
          <Heart className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
        </button>
      </div>

      {/* Controls + progress */}
      <div className="flex flex-col items-center flex-1 max-w-lg mx-auto">
        <div className="flex items-center gap-4 mb-1">
          <button onClick={toggleShuffle} className={`hidden sm:block transition-all duration-200 ${shuffle ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
            <Shuffle className="w-4 h-4" />
          </button>
          <button onClick={prevSong} className="text-muted-foreground hover:text-foreground transition-all hover:scale-110 active:scale-95">
            <SkipBack className="w-5 h-5 fill-current" />
          </button>
          <button
            onClick={togglePlay}
            className="w-9 h-9 rounded-full bg-foreground flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200"
          >
            {isPlaying ? <Pause className="w-4 h-4 text-background" /> : <Play className="w-4 h-4 text-background ml-0.5" />}
          </button>
          <button onClick={nextSong} className="text-muted-foreground hover:text-foreground transition-all hover:scale-110 active:scale-95">
            <SkipForward className="w-5 h-5 fill-current" />
          </button>
          <button onClick={toggleRepeat} className={`hidden sm:block transition-all duration-200 ${repeat ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
            <Repeat className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center gap-2 w-full">
          <span className="text-[11px] text-muted-foreground w-10 text-right tabular-nums">
            {formatTime(currentTime)}
          </span>
          <input
            type="range" min={0} max={100} value={progressPct}
            onChange={handleSeek}
            className="flex-1 h-1"
            style={{ background: `linear-gradient(to right, hsl(272 72% 46%) ${progressPct}%, hsl(240 10% 22%) ${progressPct}%)` }}
          />
          <span className="text-[11px] text-muted-foreground w-10 tabular-nums">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Volume */}
      <div className="hidden md:flex items-center gap-2 w-1/4 justify-end">
        <button onClick={() => setVolume(volume > 0 ? 0 : 70)} className="text-muted-foreground hover:text-foreground transition-colors">
          {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
        <input
          type="range" min={0} max={100} value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-24 h-1"
          style={{ background: `linear-gradient(to right, hsl(0 0% 100%) ${volume}%, hsl(240 10% 22%) ${volume}%)` }}
        />
      </div>
    </footer>
  );
};

export default PlayerBar;
