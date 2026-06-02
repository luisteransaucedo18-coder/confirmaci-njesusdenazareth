import { BarChart3, Boxes, CalendarDays, CheckSquare, LogOut, Menu, Moon, Settings, Sun, Users, UserRound } from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { GlobalSearch } from "@/components/GlobalSearch";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/app", label: "Dashboard", icon: BarChart3 },
  { href: "/app/confirmantes", label: "Confirmantes", icon: Users },
  { href: "/app/asistencias", label: "Asistencias", icon: CheckSquare },
  { href: "/app/inventario", label: "Inventario", icon: Boxes },
  { href: "/app/catequistas", label: "Catequistas", icon: UserRound },
  { href: "/app/grupos", label: "Grupos", icon: Users },
  { href: "/app/eventos", label: "Eventos", icon: CalendarDays },
  { href: "/app/reportes", label: "Reportes", icon: BarChart3 },
  { href: "/app/configuracion", label: "Configuracion", icon: Settings },
];

export function AppLayout() {
  const [open, setOpen] = useState(false);
  const { signOut, profile } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <aside className={cn("fixed inset-y-0 left-0 z-40 w-72 border-r border-[var(--border)] bg-[var(--card)] p-4 transition lg:translate-x-0", open ? "translate-x-0" : "-translate-x-full")}>
        <div className="mb-6">
          <p className="text-lg font-black">Jesus de Nazareth</p>
          <p className="text-xs text-[var(--muted-foreground)]">Gestion de Confirmacion</p>
        </div>
        <nav className="space-y-1">
          {nav.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === "/app"}
              className={({ isActive }) =>
                cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-[var(--muted)]", isActive && "bg-[var(--primary)] text-[var(--on-primary)]")
              }
              onClick={() => setOpen(false)}
            >
              <item.icon className="h-4 w-4" /> {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--background)]/95 px-4 py-3 backdrop-blur">
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="h-10 w-10 px-0 lg:hidden" onClick={() => setOpen(true)} aria-label="Abrir menu">
              <Menu className="h-5 w-5" />
            </Button>
            <GlobalSearch />
            <div className="ml-auto flex items-center gap-2">
              <Button variant="ghost" className="h-10 w-10 px-0" onClick={toggleTheme} aria-label="Cambiar tema">
                {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
              <span className="hidden text-right text-xs text-[var(--muted-foreground)] sm:block">
                {profile?.full_name ?? "Usuario"}<br />{profile?.role ?? ""}
              </span>
              <Button variant="ghost" className="h-10 w-10 px-0" onClick={signOut} aria-label="Cerrar sesion">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
