import { Home, Search, Library, Music, Plus } from "lucide-react";
import { playlists } from "@/data/mockData";

interface SidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const WavelySidebar = ({ activeSection, onNavigate }: SidebarProps) => {
  const navItems = [
    { id: "home", label: "Inicio", icon: Home },
    { id: "search", label: "Buscar", icon: Search },
    { id: "library", label: "Biblioteca", icon: Library },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-sidebar h-full gap-2 p-2">
      {/* Logo */}
      <div className="bg-card rounded-lg p-5">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Music className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">WAVELY</span>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                activeSection === item.id
                  ? "text-foreground bg-secondary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Playlists */}
      <div className="bg-card rounded-lg p-4 flex-1 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Playlists</span>
          <button className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center hover:bg-surface-hover transition-colors">
            <Plus className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
        <div className="space-y-1">
          {playlists.map((pl) => (
            <button
              key={pl.id}
              onClick={() => onNavigate("playlist")}
              className="w-full flex items-center gap-3 px-2 py-2 rounded-md hover:bg-secondary transition-colors group"
            >
              <img
                src={pl.cover}
                alt={pl.name}
                className="w-10 h-10 rounded object-cover"
                loading="lazy"
                width={40}
                height={40}
              />
              <div className="text-left min-w-0">
                <p className="text-sm text-foreground truncate group-hover:text-primary transition-colors">{pl.name}</p>
                <p className="text-xs text-muted-foreground">{pl.songCount} canciones</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default WavelySidebar;
