import HeroBanner from "./HeroBanner";
import MusicCard from "./MusicCard";
import ArtistCard from "./ArtistCard";
import SearchView from "./SearchView";
import LibraryView from "./LibraryView";
import ArtistProfile from "./ArtistProfile";
import PlaylistDetail from "./PlaylistDetail";
import SpotifySection from "./SpotifySection";
import { songs, artists, newReleases } from "@/data/mockData";
import { TrendingUp, Flame, Sparkles } from "lucide-react";

interface MainContentProps {
  activeSection: string;
  navData?: any;
  onNavigate: (section: string, data?: any) => void;
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-8">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl sm:text-2xl font-bold text-foreground">{title}</h2>
    </div>
    {children}
  </section>
);

const MainContent = ({ activeSection, navData, onNavigate }: MainContentProps) => {
  const renderContent = () => {
    switch (activeSection) {
      case "search":
        return (
          <SearchView
            onNavigateArtist={(id) => onNavigate("artist", { artistId: id })}
          />
        );

      case "library":
        return (
          <LibraryView
            onNavigatePlaylist={(id) => onNavigate("playlist-detail", { playlistId: id })}
          />
        );

      case "artist":
        return (
          <ArtistProfile
            artistId={navData?.artistId}
            onBack={() => onNavigate("home")}
          />
        );

      case "playlist-detail":
        return (
          <PlaylistDetail
            playlistId={navData?.playlistId}
            onBack={() => onNavigate("library")}
          />
        );

      default:
        return (
          <div className="page-enter">
            <HeroBanner />

            {/* Spotify-powered sections with curated urban playlists */}
            <SpotifySection
              title="Trending Urbano"
              playlistId="37i9dQZF1DX10zKzsJ2jva"
              icon={<TrendingUp className="w-5 h-5 text-primary" />}
            />

            <SpotifySection
              title="Top Argentina"
              playlistId="37i9dQZEVXbMMy2roB9myp"
              icon={<Flame className="w-5 h-5 text-primary" />}
            />

            <SpotifySection
              title="Nuevos Lanzamientos"
              playlistId="37i9dQZF1DX4JAvHpjipBk"
              icon={<Sparkles className="w-5 h-5 text-primary" />}
            />

            {/* Fallback local content */}
            <Section title="Artistas destacados">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {artists.map((artist, i) => (
                  <ArtistCard
                    key={artist.id}
                    artist={artist}
                    index={i}
                    onClick={() => onNavigate("artist", { artistId: artist.id })}
                  />
                ))}
              </div>
            </Section>
          </div>
        );
    }
  };

  return (
    <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-28">
      {renderContent()}
    </main>
  );
};

export default MainContent;
