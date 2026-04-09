import { Artist } from "@/data/mockData";

interface ArtistCardProps {
  artist: Artist;
  index?: number;
  onClick?: () => void;
}

const ArtistCard = ({ artist, index = 0, onClick }: ArtistCardProps) => {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center p-4 glass-card rounded-xl transition-all duration-300 cursor-pointer hover-card-glow animate-fade-in w-full"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="relative mb-3">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-28 h-28 lg:w-32 lg:h-32 rounded-full object-cover shadow-lg group-hover:shadow-primary/20 transition-all duration-300 group-hover:scale-105"
          loading="lazy"
          width={128}
          height={128}
        />
        <div className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
      </div>
      <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{artist.name}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{artist.genre}</p>
    </button>
  );
};

export default ArtistCard;
