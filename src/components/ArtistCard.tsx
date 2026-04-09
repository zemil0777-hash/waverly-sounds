import { Artist } from "@/data/mockData";

const ArtistCard = ({ artist }: { artist: Artist }) => {
  return (
    <div className="group flex flex-col items-center p-4 bg-card hover:bg-secondary rounded-lg transition-all duration-300 cursor-pointer hover-card-glow">
      <div className="relative mb-3">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-32 h-32 lg:w-36 lg:h-36 rounded-full object-cover shadow-lg group-hover:shadow-primary/20 transition-shadow duration-300"
          loading="lazy"
          width={144}
          height={144}
        />
      </div>
      <p className="text-sm font-semibold text-foreground">{artist.name}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{artist.genre}</p>
    </div>
  );
};

export default ArtistCard;
