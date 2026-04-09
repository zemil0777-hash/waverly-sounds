import {
  Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat, Heart,
} from "lucide-react";
import { usePlayer } from "@/context/PlayerContext";

const PlayerBar = () => {
  const { currentSong, isPlaying, progress, volume, togglePlay, nextSong, prevSong, setProgress, setVolume } = usePlayer();

  if (!currentSong) return null;

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-20 bg-player border-t border-border flex items-center px-4 z-50">
      {/* Song info */}
      <div className="flex items-center gap-3 w-1/4 min-w-0">
        <img
          src={currentSong.cover}
          alt={currentSong.title}
          className="w-14 h-14 rounded-md object-cover"
          width={56}
          height={56}
        />
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground truncate">{currentSong.title}</p>
          <p className="text-xs text-muted-foreground truncate">{currentSong.artist}</p>
        </div>
        <button className="hidden sm:block text-muted-foreground hover:text-primary transition-colors ml-2">
          <Heart className="w-4 h-4" />
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center flex-1 max-w-lg mx-auto">
        <div className="flex items-center gap-4 mb-1">
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Shuffle className="w-4 h-4" />
          </button>
          <button onClick={prevSong} className="text-muted-foreground hover:text-foreground transition-colors">
            <SkipBack className="w-5 h-5 fill-current" />
          </button>
          <button
            onClick={togglePlay}
            className="w-9 h-9 rounded-full bg-foreground flex items-center justify-center hover:scale-105 transition-transform"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-background" />
            ) : (
              <Play className="w-4 h-4 text-background ml-0.5" />
            )}
          </button>
          <button onClick={nextSong} className="text-muted-foreground hover:text-foreground transition-colors">
            <SkipForward className="w-5 h-5 fill-current" />
          </button>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Repeat className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center gap-2 w-full">
          <span className="text-[11px] text-muted-foreground w-10 text-right">1:{String(Math.floor(progress * 0.42)).padStart(2, "0")}</span>
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="flex-1 h-1 accent-primary cursor-pointer"
            style={{
              background: `linear-gradient(to right, hsl(145 63% 42%) ${progress}%, hsl(0 0% 24%) ${progress}%)`,
            }}
          />
          <span className="text-[11px] text-muted-foreground w-10">{currentSong.duration}</span>
        </div>
      </div>

      {/* Volume */}
      <div className="hidden md:flex items-center gap-2 w-1/4 justify-end">
        <Volume2 className="w-4 h-4 text-muted-foreground" />
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-24 h-1 accent-primary cursor-pointer"
          style={{
            background: `linear-gradient(to right, hsl(0 0% 100%) ${volume}%, hsl(0 0% 24%) ${volume}%)`,
          }}
        />
      </div>
    </footer>
  );
};

export default PlayerBar;
