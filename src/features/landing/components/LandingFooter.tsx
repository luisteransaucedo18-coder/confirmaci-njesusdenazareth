import { Link } from "react-router-dom";

export function LandingFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--secondary)]/5 text-[var(--muted-foreground)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-12 md:flex-row md:items-start md:justify-between">
        <div className="space-y-3">
          <p className="text-lg font-bold text-[var(--foreground)]">Jesus de Nazareth</p>
          <p className="max-w-sm text-sm leading-6">
            Grupo de Confirmación Juvenil. Acompañamos a jóvenes en su proceso de formación espiritual,
            comunitaria y sacramental.
          </p>
        </div>

        <div className="grid gap-3 text-sm md:text-right">
          <p className="font-semibold text-[var(--foreground)]">Ir a</p>
          <Link to="/" className="block hover:text-[var(--primary)]">Inicio</Link>
          <Link to="/nosotros" className="block hover:text-[var(--primary)]">Nosotros</Link>
          <Link to="/catequesis" className="block hover:text-[var(--primary)]">Catequesis</Link>
          <Link to="/actividades" className="block hover:text-[var(--primary)]">Actividades</Link>
          <Link to="/galeria" className="block hover:text-[var(--primary)]">Galería</Link>
          <Link to="/contacto" className="block hover:text-[var(--primary)]">Contacto</Link>
        </div>

        <div className="text-sm">
          <p className="font-semibold text-[var(--foreground)]">Contacto</p>
          <p>contacto@jesusdenazareth.pe</p>
          <p>Trujillo - Perú</p>
          <p className="mt-3">© {new Date().getFullYear()} Jesus de Nazareth</p>
        </div>
      </div>
    </footer>
  );
}
