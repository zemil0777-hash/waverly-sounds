import { useState, useCallback } from "react";
import { PlayerProvider } from "@/context/PlayerContext";
import { PlaylistProvider } from "@/context/PlaylistContext";
import WavelySidebar from "@/components/WavelySidebar";
import MainContent from "@/components/MainContent";
import PlayerBar from "@/components/PlayerBar";
import MobileNav from "@/components/MobileNav";
import SplashScreen from "@/components/SplashScreen";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [navData, setNavData] = useState<any>(null);

  const handleNavigate = useCallback((section: string, data?: any) => {
    setActiveSection(section);
    setNavData(data || null);
  }, []);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <PlaylistProvider>
      <PlayerProvider>
        <div className="h-screen flex flex-col bg-background">
          <div className="flex flex-1 overflow-hidden">
            <WavelySidebar activeSection={activeSection} onNavigate={handleNavigate} />
            <MainContent activeSection={activeSection} navData={navData} onNavigate={handleNavigate} />
          </div>
          <MobileNav activeSection={activeSection} onNavigate={handleNavigate} />
          <PlayerBar />
        </div>
      </PlayerProvider>
    </PlaylistProvider>
  );
};

export default Index;
