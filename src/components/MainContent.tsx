import HeroBanner from "./HeroBanner";
import MusicCard from "./MusicCard";
import ArtistCard from "./ArtistCard";
import SearchView from "./SearchView";
import LibraryView from "./LibraryView";
import ArtistProfile from "./ArtistProfile";
import PlaylistDetail from "./PlaylistDetail";
import { songs, artists, newReleases } from "@/data/mockData";

interface MainContentProps {
  activeSection: string;
  navData?: any;
  onNavigate: (section: string, data?: any) => void;
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-8">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl sm:text-2xl font-bold text-foreground">{title}</h2>
      <button className="text-xs font-semibold text-muted-foreground hover:text-primary uppercase tracking-wider transition-colors">
        Ver todo
      </button>
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

            <Section title="Recomendados para ti">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {songs.slice(0, 5).map((song, i) => (
                  <MusicCard key={song.id} song={song} index={i} />
                ))}
              </div>
            </Section>

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

            <Section title="Nuevos lanzamientos">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {newReleases.map((song, i) => (
                  <MusicCard key={song.id} song={song} index={i} />
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
