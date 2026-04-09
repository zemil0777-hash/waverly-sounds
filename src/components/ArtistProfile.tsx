import { ArrowLeft, Play, Shuffle } from "lucide-react";
import { artists, songs } from "@/data/mockData";
import { usePlayer } from "@/context/PlayerContext";

interface ArtistProfileProps {
  artistId: string;
  onBack: () => void;
}

const ArtistProfile = ({ artistId, onBack }: ArtistProfileProps) => {
  const artist = artists.find((a) => a.id === artistId);
  const { playSong, setQueue } = usePlayer();

  if (!artist) return null;

  const artistSongs = songs.filter((s) => s.artist === artist.name);

  const playAll = () => {
    if (artistSongs.length > 0) {
      setQueue(artistSongs);
      playSong(artistSongs[0]);
    }
  };

  return (
    <div className="page-enter">
      {/* Header */}
      <div className="relative mb-6">
        <button
          onClick={onBack}
          className="absolute top-0 left-0 z-10 w-9 h-9 rounded-full glass-surface flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex flex-col sm:flex-row items-center gap-6 pt-12 sm:pt-0">
          <img
            src={artist.image}
            alt={artist.name}
            className="w-40 h-40 sm:w-48 sm:h-48 rounded-full object-cover shadow-2xl shadow-primary/20 ring-4 ring-primary/10"
            width={192}
            height={192}
          />
          <div className="text-center sm:text-left">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">Artista</p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-2">{artist.name}</h1>
            <p className="text-muted-foreground text-sm mb-4">{artist.genre} · {artistSongs.length} canciones</p>
            <div className="flex gap-3 justify-center sm:justify-start">
              <button
                onClick={playAll}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-primary-hover hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/30"
              >
                <Play className="w-4 h-4 fill-current" />
                Reproducir
              </button>
              <button
                onClick={() => { setQueue(artistSongs); if (artistSongs.length > 0) playSong(artistSongs[Math.floor(Math.random() * artistSongs.length)]); }}
                className="inline-flex items-center gap-2 bg-secondary text-foreground px-5 py-2.5 rounded-full font-medium text-sm hover:bg-surface-hover transition-all"
              >
                <Shuffle className="w-4 h-4" />
                Aleatorio
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Songs */}
      <h2 className="text-lg font-bold text-foreground mb-3">Canciones populares</h2>
      <div className="space-y-1">
        {artistSongs.map((song, i) => (
          <button
            key={song.id}
            onClick={() => playSong(song)}
            className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-secondary transition-all duration-200 group animate-fade-in"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <span className="text-sm text-muted-foreground w-6 text-center group-hover:hidden">{i + 1}</span>
            <span className="text-sm text-primary w-6 text-center hidden group-hover:block">
              <Play className="w-4 h-4 fill-current mx-auto" />
            </span>
            <img src={song.cover} alt={song.title} className="w-10 h-10 rounded-md object-cover" width={40} height={40} />
            <div className="text-left flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{song.title}</p>
              <p className="text-xs text-muted-foreground truncate">{song.album}</p>
            </div>
            <span className="text-xs text-muted-foreground">{song.duration}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ArtistProfile;
