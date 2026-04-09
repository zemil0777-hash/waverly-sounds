import { Home, Search, Library, Music } from "lucide-react";

interface MobileNavProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const MobileNav = ({ activeSection, onNavigate }: MobileNavProps) => {
  const items = [
    { id: "home", label: "Inicio", icon: Home },
    { id: "search", label: "Buscar", icon: Search },
    { id: "library", label: "Biblioteca", icon: Library },
  ];

  return (
    <nav className="fixed bottom-20 left-0 right-0 md:hidden bg-player border-t border-border flex items-center justify-around py-2 z-40">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`flex flex-col items-center gap-0.5 px-4 py-1 transition-colors ${
            activeSection === item.id ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          <item.icon className="w-5 h-5" />
          <span className="text-[10px] font-medium">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default MobileNav;
