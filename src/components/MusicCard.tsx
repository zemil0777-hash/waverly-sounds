import { Play } from "lucide-react";
import { Song } from "@/data/mockData";
import { usePlayer } from "@/context/PlayerContext";

interface MusicCardProps {
  song: Song;
}

const MusicCard = ({ song }: MusicCardProps) => {
  const { playSong, currentSong, isPlaying } = usePlayer();
  const isActive = currentSong?.id === song.id && isPlaying;

  return (
    <button
      onClick={() => playSong(song)}
      className="group bg-card hover:bg-secondary rounded-lg p-4 transition-all duration-300 text-left w-full hover-card-glow"
    >
      <div className="relative mb-4">
        <img
          src={song.cover}
          alt={song.title}
          className="w-full aspect-square rounded-md object-cover shadow-lg"
          loading="lazy"
          width={300}
          height={300}
        />
        <div
          className={`absolute bottom-2 right-2 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-xl transition-all duration-300 ${
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
          }`}
        >
          <Play className="w-4 h-4 text-primary-foreground ml-0.5 fill-current" />
        </div>
      </div>
      <p className="text-sm font-semibold text-foreground truncate">{song.title}</p>
      <p className="text-xs text-muted-foreground mt-1 truncate">{song.artist}</p>
    </button>
  );
};

export default MusicCard;
