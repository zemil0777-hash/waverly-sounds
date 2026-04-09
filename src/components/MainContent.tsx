import HeroBanner from "./HeroBanner";
import MusicCard from "./MusicCard";
import ArtistCard from "./ArtistCard";
import { songs, artists, newReleases } from "@/data/mockData";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-8">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl sm:text-2xl font-bold text-foreground">{title}</h2>
      <button className="text-xs font-semibold text-muted-foreground hover:text-foreground uppercase tracking-wider transition-colors">
        Ver todo
      </button>
    </div>
    {children}
  </section>
);

const MainContent = () => {
  return (
    <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-28">
      <HeroBanner />

      <Section title="Recomendados para ti">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {songs.slice(0, 5).map((song, i) => (
            <div key={song.id} className="animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
              <MusicCard song={song} />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Artistas destacados">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {artists.map((artist, i) => (
            <div key={artist.id} className="animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
              <ArtistCard artist={artist} />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Nuevos lanzamientos">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {newReleases.map((song, i) => (
            <div key={song.id} className="animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
              <MusicCard song={song} />
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
};

export default MainContent;
