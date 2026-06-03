import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  Moon,
  Sun,
  X,
  ChevronRight,
} from "lucide-react";

import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/Button";

import logoImage from "@/assets/images/Logo.jpg";

const nav = [
  { label: "Inicio", to: "/inicio" },
  { label: "Nosotros", to: "/nosotros" },
  { label: "Catequesis", to: "/catequesis" },
  { label: "Actividades", to: "/actividades" },
  { label: "Galería", to: "/galeria" },
  { label: "Contacto", to: "/contacto" },
];

export function LandingHeader() {
  const [open, setOpen] = useState(false);

  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 pt-4">
        <nav className="flex items-center rounded-3xl border border-white/10 bg-black/30 px-5 py-3 shadow-2xl backdrop-blur-xl">

          {/* Logo */}
          <Link
            to="/inicio"
            className="flex items-center gap-3"
          >
            <img
              src={logoImage}
              alt="Logo"
              className="h-12 w-12 rounded-2xl border border-white/10 object-cover"
            />

            <div className="hidden sm:block">
              <h1 className="text-sm font-black uppercase tracking-wider text-white">
                Confirmación Jesús de Nazareth
              </h1>

              <p className="text-xs text-white/60">
                Confirmación Juvenil
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="mx-auto hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Actions */}
          <div className="ml-auto hidden items-center gap-3 lg:flex">
            <Button
              variant="ghost"
              onClick={toggleTheme}
              className="h-11 w-11 rounded-xl p-0"
            >
              {theme === "light" ? (
                <Moon size={18} />
              ) : (
                <Sun size={18} />
              )}
            </Button>

            <Link
              to="/login"
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-[var(--primary)]
                px-5
                py-2.5
                font-semibold
                text-white
                shadow-lg
                transition-all
                hover:scale-105
              "
            >
              Iniciar Sesión
              <ChevronRight size={16} />
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setOpen(!open)}
            className="ml-auto lg:hidden"
          >
            {open ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {open && (
          <div className="mt-3 overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-4 backdrop-blur-xl lg:hidden">
            <div className="space-y-2">

              {nav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-3 transition ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-white/80 hover:bg-white/5"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              <div className="mt-4 flex gap-3">
                <Button
                  variant="ghost"
                  onClick={toggleTheme}
                  className="flex-1"
                >
                  {theme === "light" ? (
                    <Moon size={18} />
                  ) : (
                    <Sun size={18} />
                  )}
                </Button>

                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="
                    flex-1
                    rounded-xl
                    bg-[var(--primary)]
                    px-4
                    py-3
                    text-center
                    font-semibold
                    text-white
                  "
                >
                  Ingresar
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}