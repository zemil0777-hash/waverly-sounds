import { useState } from "react";
import { PlayerProvider } from "@/context/PlayerContext";
import WavelySidebar from "@/components/WavelySidebar";
import MainContent from "@/components/MainContent";
import PlayerBar from "@/components/PlayerBar";
import MobileNav from "@/components/MobileNav";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");

  return (
    <PlayerProvider>
      <div className="h-screen flex flex-col bg-background">
        <div className="flex flex-1 overflow-hidden">
          <WavelySidebar activeSection={activeSection} onNavigate={setActiveSection} />
          <MainContent />
        </div>
        <MobileNav activeSection={activeSection} onNavigate={setActiveSection} />
        <PlayerBar />
      </div>
    </PlayerProvider>
  );
};

export default Index;
