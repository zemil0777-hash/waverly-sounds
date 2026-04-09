import { ArrowLeft, Play, Shuffle, Loader2, Disc, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { usePlayer } from "@/context/PlayerContext";
import { getArtistProfile, spotifyTrackToSong, searchYouTube, SpotifyTrack, SpotifyArtist, SpotifyAlbum } from "@/lib/spotifyApi";
import { artists as mockArtists, songs as mockSongs } from "@/data/mockData";

interface ArtistProfileProps {
  artistId: string;
  onBack: () => void;
}

const ArtistProfile = ({ artistId, onBack }: ArtistProfileProps) => {
  const { playSong, setQueue } = usePlayer();
  const [loading, setLoading] = useState(true);
  const [artist, setArtist] = useState<SpotifyArtist | null>(null);
  const [topTracks, setTopTracks] = useState<SpotifyTrack[]>([]);
  const [albums, setAlbums] = useState<SpotifyAlbum[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    getArtistProfile(artistId)
      .then((data) => {
        if (cancelled) return;
        setArtist(data.artist);
        setTopTracks(data.topTracks || []);
        setAlbums(data.albums || []);
      })
      .catch((err) => {
        console.error("Artist profile error:", err);
        // Fallback to mock
        const mock = mockArtists.find((a) => a.id === artistId);
        if (mock) {
          setArtist({
            id: mock.id,
            name: mock.name,
            images: [{ url: mock.image, width: 300, height: 300 }],
            genres: [mock.genre],
            followers: { total: 0 },
            popularity: 0,
          } as SpotifyArtist);
        }
      })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [artistId]);

  const handlePlayTrack = async (track: SpotifyTrack) => {
    setPlayingId(track.id);
    const song = spotifyTrackToSong(track);
    const ytQuery = `${track.name} ${track.artists[0]?.name} official audio`;
    const videoId = await searchYouTube(ytQuery);
    song.youtubeId = videoId;
    playSong(song);
    setPlayingId(null);
  };

  const handlePlayAll = async () => {
    if (topTracks.length === 0) return;
    const allSongs = topTracks.map(spotifyTrackToSong);
    setQueue(allSongs);
    // Play first with YouTube
    handlePlayTrack(topTracks[0]);
  };

  const handleShuffle = () => {
    if (topTracks.length === 0) return;
    const randomIdx = Math.floor(Math.random() * topTracks.length);
    handlePlayTrack(topTracks[randomIdx]);
  };

  if (loading) {
    return (
      <div className="page-enter flex items-center justify-center py-24">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!artist) return null;

  const artistImage = artist.images?.[0]?.url || "/placeholder.svg";
  const formattedFollowers = artist.followers?.total
    ? artist.followers.total > 1000000
      ? `${(artist.followers.total / 1000000).toFixed(1)}M`
      : `${(artist.followers.total / 1000).toFixed(0)}K`
    : null;

  return (
    <div className="page-enter">
      <button
        onClick={onBack}
        className="w-9 h-9 rounded-full glass-surface flex items-center justify-center text-foreground hover:bg-secondary transition-colors mb-4"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 animate-fade-in">
        <img
          src={artistImage}
          alt={artist.name}
          className="w-40 h-40 sm:w-48 sm:h-48 rounded-full object-cover shadow-2xl shadow-primary/20 ring-4 ring-primary/10"
          width={192}
          height={192}
        />
        <div className="text-center sm:text-left">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">Artista</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-1">{artist.name}</h1>
          <p className="text-muted-foreground text-sm mb-1">
            {artist.genres?.slice(0, 3).join(", ") || "Música"}
          </p>
          {formattedFollowers && (
            <p className="text-xs text-muted-foreground mb-4">{formattedFollowers} seguidores · Popularidad {artist.popularity}/100</p>
          )}
          <div className="flex gap-3 justify-center sm:justify-start">
            <button
              onClick={handlePlayAll}
              disabled={topTracks.length === 0}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-primary-hover hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/30 disabled:opacity-40"
            >
              <Play className="w-4 h-4 fill-current" />
              Reproducir
            </button>
            <button
              onClick={handleShuffle}
              disabled={topTracks.length === 0}
              className="inline-flex items-center gap-2 bg-secondary text-foreground px-5 py-2.5 rounded-full font-medium text-sm hover:bg-surface-hover transition-all disabled:opacity-40"
            >
              <Shuffle className="w-4 h-4" />
              Aleatorio
            </button>
          </div>
        </div>
      </div>

      {/* Top Tracks */}
      {topTracks.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-foreground mb-3">Canciones populares</h2>
          <div className="space-y-1">
            {topTracks.slice(0, 10).map((track, i) => {
              const isLoading = playingId === track.id;
              return (
                <button
                  key={track.id}
                  onClick={() => handlePlayTrack(track)}
                  disabled={isLoading}
                  className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-secondary transition-all duration-200 group animate-fade-in disabled:opacity-60"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <span className="text-sm text-muted-foreground w-6 text-center group-hover:hidden">{i + 1}</span>
                  <span className="text-sm text-primary w-6 text-center hidden group-hover:flex items-center justify-center">
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
                  </span>
                  <img
                    src={track.album.images?.[track.album.images.length - 1]?.url || "/placeholder.svg"}
                    alt={track.name}
                    className="w-10 h-10 rounded-md object-cover"
                    width={40}
                    height={40}
                  />
                  <div className="text-left flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{track.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{track.album.name}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                    <span className="text-[10px] text-muted-foreground">{track.popularity}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Albums */}
      {albums.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">Discografía</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {albums.map((album, i) => (
              <div
                key={album.id}
                className="glass-card rounded-xl p-3 hover-card-glow animate-fade-in"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <img
                  src={album.images?.[0]?.url || "/placeholder.svg"}
                  alt={album.name}
                  className="w-full aspect-square rounded-lg object-cover shadow-md mb-2"
                  loading="lazy"
                  width={300}
                  height={300}
                />
                <p className="text-sm font-semibold text-foreground truncate">{album.name}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Calendar className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{album.release_date?.slice(0, 4)}</span>
                  <span className="text-xs text-muted-foreground">· {album.total_tracks} tracks</span>
                </div>
                <p className="text-[10px] text-muted-foreground/60 uppercase mt-1">{album.album_type}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ArtistProfile;
