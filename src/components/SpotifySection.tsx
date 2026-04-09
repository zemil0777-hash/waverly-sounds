import { useEffect, useState } from "react";
import { Loader2, Play, TrendingUp } from "lucide-react";
import { getPlaylistTracks, spotifyTrackToSong, searchYouTube, SpotifyTrack } from "@/lib/spotifyApi";
import { usePlayer } from "@/context/PlayerContext";

interface SpotifySectionProps {
  title: string;
  playlistId: string;
  icon?: React.ReactNode;
}

const SpotifySection = ({ title, playlistId, icon }: SpotifySectionProps) => {
  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const { playSong } = usePlayer();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getPlaylistTracks(playlistId, 10)
      .then((data) => {
        if (cancelled) return;
        const items = (data.items || [])
          .map((item: any) => item.track)
          .filter((t: any) => t && t.id);
        setTracks(items);
      })
      .catch((err) => {
        console.error(`Failed to load playlist ${playlistId}:`, err);
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [playlistId]);

  const handlePlay = async (track: SpotifyTrack) => {
    setPlayingId(track.id);
    const song = spotifyTrackToSong(track);
    const videoId = await searchYouTube(`${track.name} ${track.artists[0]?.name} official audio`);
    song.youtubeId = videoId;
    playSong(song);
    setPlayingId(null);
  };

  if (loading) {
    return (
      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
          {icon}
          {title}
        </h2>
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-5 h-5 text-primary animate-spin" />
        </div>
      </section>
    );
  }

  if (tracks.length === 0) return null;

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
          {icon}
          {title}
        </h2>
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {tracks.length} canciones
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {tracks.slice(0, 10).map((track, i) => {
          const isLoading = playingId === track.id;
          return (
            <button
              key={track.id}
              onClick={() => handlePlay(track)}
              disabled={isLoading}
              className="group glass-card rounded-xl p-3.5 transition-all duration-300 hover-card-glow text-left animate-fade-in disabled:opacity-60"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="relative mb-3">
                <img
                  src={track.album.images?.[0]?.url || "/placeholder.svg"}
                  alt={track.name}
                  className="w-full aspect-square rounded-lg object-cover shadow-lg"
                  loading="lazy"
                  width={300}
                  height={300}
                />
                <div
                  className={`absolute bottom-2 right-2 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-xl transition-all duration-300 hover:bg-primary-hover ${
                    isLoading
                      ? "opacity-100"
                      : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
                  }`}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 text-primary-foreground animate-spin" />
                  ) : (
                    <Play className="w-4 h-4 text-primary-foreground ml-0.5 fill-current" />
                  )}
                </div>
              </div>
              <p className="text-sm font-semibold text-foreground truncate">{track.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">
                {track.artists.map((a) => a.name).join(", ")}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default SpotifySection;
