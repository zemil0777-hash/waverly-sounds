import heroBanner from "@/assets/hero-banner.jpg";
import { Play } from "lucide-react";
import { usePlayer } from "@/context/PlayerContext";
import { songs } from "@/data/mockData";

const HeroBanner = () => {
  const { playSong } = usePlayer();

  return (
    <div className="relative rounded-xl overflow-hidden mb-8">
      <img
        src={heroBanner}
        alt="WAVELY hero"
        className="w-full h-56 sm:h-72 lg:h-80 object-cover"
        width={1920}
        height={640}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
        <p className="text-sm font-medium text-primary mb-1 tracking-wider uppercase">Bienvenido a</p>
        <h1 className="text-3xl sm:text-5xl font-bold text-foreground mb-2">WAVELY</h1>
        <p className="text-sm sm:text-base text-muted-foreground mb-4 max-w-md">
          Tu música, tu estilo. Descubre nuevos artistas y sonidos únicos.
        </p>
        <button
          onClick={() => playSong(songs[0])}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-medium text-sm hover:scale-105 transition-transform shadow-lg shadow-primary/30"
        >
          <Play className="w-4 h-4 fill-current" />
          Reproducir
        </button>
      </div>
    </div>
  );
};

export default HeroBanner;
