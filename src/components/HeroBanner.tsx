import heroBanner from "@/assets/hero-banner.jpg";
import { Play } from "lucide-react";
import { usePlayer } from "@/context/PlayerContext";
import { songs } from "@/data/mockData";

const HeroBanner = () => {
  const { playSong } = usePlayer();

  return (
    <div className="relative rounded-2xl overflow-hidden mb-8 group">
      <img
        src={heroBanner}
        alt="WAVELY hero"
        className="w-full h-48 sm:h-64 lg:h-72 object-cover transition-transform duration-700 group-hover:scale-105"
        width={1920}
        height={640}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent" />
      <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7">
        <p className="text-xs font-semibold text-primary mb-1 tracking-widest uppercase animate-fade-in">
          Bienvenido a
        </p>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground mb-1.5 animate-slide-up">
          WAVELY
        </h1>
        <p className="text-sm text-muted-foreground mb-4 max-w-md animate-fade-in" style={{ animationDelay: "200ms" }}>
          Tu música, tu estilo. Descubre nuevos artistas y sonidos únicos.
        </p>
        <button
          onClick={() => playSong(songs[0])}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-primary-hover hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-primary/30 animate-fade-in"
          style={{ animationDelay: "300ms" }}
        >
          <Play className="w-4 h-4 fill-current" />
          Reproducir
        </button>
      </div>
    </div>
  );
};

export default HeroBanner;
