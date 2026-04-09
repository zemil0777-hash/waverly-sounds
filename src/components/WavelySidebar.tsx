import { Home, Search, Library, Music, Plus } from "lucide-react";
import { usePlaylistContext } from "@/context/PlaylistContext";
import { playlists as defaultPlaylists } from "@/data/mockData";

interface SidebarProps {
  activeSection: string;
  onNavigate: (section: string, data?: any) => void;
}

const WavelySidebar = ({ activeSection, onNavigate }: SidebarProps) => {
  const { userPlaylists, createPlaylist } = usePlaylistContext();
  const allPlaylists = [...defaultPlaylists, ...userPlaylists];

  const navItems = [
    { id: "home", label: "Inicio", icon: Home },
    { id: "search", label: "Buscar", icon: Search },
    { id: "library", label: "Biblioteca", icon: Library },
  ];

  const handleNewPlaylist = () => {
    const name = prompt("Nombre de la nueva playlist:");
    if (name?.trim()) createPlaylist(name.trim());
  };

  return (
    <aside className="hidden md:flex flex-col w-64 lg:w-72 h-full gap-2 p-2 shrink-0">
      {/* Logo + Nav */}
      <div className="glass-card rounded-xl p-5">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2.5 mb-6 group"
        >
          <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
            <Music className="w-5 h-5 text-primary" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-foreground">WAVELY</span>
        </button>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeSection === item.id
                  ? "text-foreground bg-primary/15 shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <item.icon className={`w-5 h-5 transition-colors ${activeSection === item.id ? "text-primary" : ""}`} />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Playlists */}
      <div className="glass-card rounded-xl p-4 flex-1 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
            Playlists
          </span>
          <button
            onClick={handleNewPlaylist}
            className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all duration-200 text-muted-foreground"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-0.5">
          {allPlaylists.map((pl) => (
            <button
              key={pl.id}
              onClick={() => onNavigate("playlist-detail", { playlistId: pl.id })}
              className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-secondary transition-all duration-200 group"
            >
              <img
                src={pl.cover}
                alt={pl.name}
                className="w-10 h-10 rounded-md object-cover shadow-md"
                loading="lazy"
                width={40}
                height={40}
              />
              <div className="text-left min-w-0">
                <p className="text-sm text-foreground truncate group-hover:text-primary transition-colors">
                  {pl.name}
                </p>
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
