import { Link } from "react-router-dom";

const nav = [
  { label: "Inicio", to: "/" },
  { label: "Nosotros", to: "/nosotros" },
  { label: "Catequesis", to: "/catequesis" },
  { label: "Actividades", to: "/actividades" },
  { label: "Galeria", to: "/galeria" },
  { label: "Contacto", to: "/contacto" },
];

export function LandingHeader() {
  return (
    <nav className="fixed inset-x-0 top-0 z-40 border-b border-transparent bg-[var(--secondary)]/95 px-5 py-3 text-white backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-5">
        <Link to="/" className="text-base font-black">
          Jesus de Nazareth
        </Link>

        <div className="ml-auto hidden gap-5 text-sm md:flex">
          {nav.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="transition hover:text-[var(--primary)]"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          to="/login"
          className="rounded-md bg-[var(--primary)] px-3 py-2 text-sm font-semibold text-[var(--on-primary)] shadow-sm shadow-[var(--primary)]/20 transition hover:opacity-90"
        >
          Iniciar Sesion
        </Link>
      </div>
    </nav>
  );
}
