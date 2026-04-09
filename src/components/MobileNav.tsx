import { Home, Search, Library } from "lucide-react";

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
    <nav className="fixed bottom-20 left-0 right-0 md:hidden glass-surface flex items-center justify-around py-2.5 z-40">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`flex flex-col items-center gap-0.5 px-6 py-1 transition-all duration-200 ${
            activeSection === item.id
              ? "text-primary"
              : "text-muted-foreground active:scale-95"
          }`}
        >
          <item.icon className={`w-5 h-5 transition-transform ${activeSection === item.id ? "scale-110" : ""}`} />
          <span className="text-[10px] font-semibold">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default MobileNav;
