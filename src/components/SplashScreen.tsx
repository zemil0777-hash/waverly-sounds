import { Music } from "lucide-react";
import { useEffect, useState } from "react";

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"logo" | "fade-out">("logo");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("fade-out"), 1800);
    const t2 = setTimeout(onComplete, 2300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        phase === "fade-out" ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-4 animate-scale-up">
        <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center animate-pulse-glow">
          <Music className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
          WAVELY
        </h1>
        <div className="w-32 h-1 rounded-full overflow-hidden bg-muted mt-2">
          <div className="h-full bg-primary rounded-full animate-[shimmer_1.5s_ease-in-out]" 
               style={{ animation: "loading 1.5s ease-in-out forwards" }} />
        </div>
      </div>
      <style>{`
        @keyframes loading {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
