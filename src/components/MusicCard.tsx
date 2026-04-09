import { Play, MoreHorizontal } from "lucide-react";
import { Song } from "@/data/mockData";
import { usePlayer } from "@/context/PlayerContext";
import { usePlaylistContext } from "@/context/PlaylistContext";
import { useState, useRef, useEffect } from "react";

interface MusicCardProps {
  song: Song;
  index?: number;
}

const MusicCard = ({ song, index = 0 }: MusicCardProps) => {
  const { playSong, currentSong, isPlaying } = usePlayer();
  const { userPlaylists, addSongToPlaylist } = usePlaylistContext();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isActive = currentSong?.id === song.id && isPlaying;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    if (showMenu) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showMenu]);

  return (
    <div
      className="group relative glass-card rounded-xl p-3.5 transition-all duration-300 hover-card-glow animate-fade-in"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="relative mb-3">
        <img
          src={song.cover}
          alt={song.title}
          className="w-full aspect-square rounded-lg object-cover shadow-lg"
          loading="lazy"
          width={300}
          height={300}
        />
        <button
          onClick={() => playSong(song)}
          className={`absolute bottom-2 right-2 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-xl transition-all duration-300 hover:bg-primary-hover hover:scale-110 active:scale-95 ${
            isActive
              ? "opacity-100 translate-y-0 animate-pulse-glow"
              : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
          }`}
        >
          <Play className="w-4 h-4 text-primary-foreground ml-0.5 fill-current" />
        </button>
      </div>
      <p className="text-sm font-semibold text-foreground truncate">{song.title}</p>
      <p className="text-xs text-muted-foreground mt-0.5 truncate">{song.artist}</p>

      {/* Context menu */}
      <div className="absolute top-3 right-3" ref={menuRef}>
        <button
          onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
          className="opacity-0 group-hover:opacity-100 w-7 h-7 rounded-full bg-background/60 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
        {showMenu && (
          <div className="absolute right-0 top-9 glass-surface rounded-lg py-1 min-w-[160px] shadow-xl z-20 animate-scale-up">
            {userPlaylists.map((pl) => (
              <button
                key={pl.id}
                onClick={() => { addSongToPlaylist(pl.id, song); setShowMenu(false); }}
                className="w-full text-left px-3 py-2 text-xs text-foreground hover:bg-secondary transition-colors"
              >
                Agregar a {pl.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicCard;
