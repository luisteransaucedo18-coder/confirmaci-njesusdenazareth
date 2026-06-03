import { Link } from "react-router-dom";
import { Mail, MapPin, Heart } from "lucide-react";
import {
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";

import logoImage from "@/assets/images/Logo.jpg";

export function LandingFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--border)] bg-[var(--card)]">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 via-transparent to-[var(--accent)]/10" />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Logo y descripción */}
          <div>
            <div className="mb-4 flex items-center gap-4">
              <img
                src={logoImage}
                alt="Logo Jesús de Nazareth"
                className="h-16 w-16 rounded-full border-2 border-[var(--primary)] object-cover shadow-lg"
              />

              <div>
                <h3 className="text-xl font-black text-[var(--foreground)]">
                  Jesús de Nazareth
                </h3>

                <p className="text-sm text-[var(--primary)]">
                  Confirmación Juvenil
                </p>
              </div>
            </div>

            <p className="leading-7 text-[var(--muted-foreground)]">
              Formamos jóvenes comprometidos con Cristo,
              fortaleciendo la fe, la amistad y el servicio
              a la comunidad.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h4 className="mb-5 text-lg font-bold text-[var(--foreground)]">
              Navegación
            </h4>

            <div className="space-y-3">
              <Link
                to="/"
                className="block transition hover:text-[var(--primary)]"
              >
                Inicio
              </Link>

              <Link
                to="/nosotros"
                className="block transition hover:text-[var(--primary)]"
              >
                Nosotros
              </Link>

              <Link
                to="/catequesis"
                className="block transition hover:text-[var(--primary)]"
              >
                Catequesis
              </Link>

              <Link
                to="/actividades"
                className="block transition hover:text-[var(--primary)]"
              >
                Actividades
              </Link>

              <Link
                to="/galeria"
                className="block transition hover:text-[var(--primary)]"
              >
                Galería
              </Link>

              <Link
                to="/contacto"
                className="block transition hover:text-[var(--primary)]"
              >
                Contacto
              </Link>
            </div>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="mb-5 text-lg font-bold text-[var(--foreground)]">
              Contacto
            </h4>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[var(--primary)]" />

                <span className="text-[var(--muted-foreground)]">
                  contacto@jesusdenazareth.pe
                </span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-[var(--primary)]" />

                <span className="text-[var(--muted-foreground)]">
                  Trujillo, Perú
                </span>
              </div>
            </div>
          </div>

          {/* Redes sociales */}
          <div>
            <h4 className="mb-5 text-lg font-bold text-[var(--foreground)]">
              Síguenos
            </h4>

            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/confirmacionsjoven_trux/"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-[var(--border)] p-3 transition-all duration-300 hover:bg-[var(--primary)] hover:text-white hover:shadow-lg"
              >
                <FaInstagram size={20} />
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=100069413516821"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-[var(--border)] p-3 transition-all duration-300 hover:bg-[var(--primary)] hover:text-white hover:shadow-lg"
              >
                <FaFacebookF size={20} />
              </a>

              
            </div>

            <p className="mt-5 text-sm text-[var(--muted-foreground)]">
              Mantente informado sobre nuestras actividades,
              encuentros y eventos juveniles.
            </p>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="mt-12 border-t border-[var(--border)] pt-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-[var(--muted-foreground)]">
              © {new Date().getFullYear()} Confirmación Juvenil Jesús de Nazareth.
            </p>

            <p className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
              Hecho con
              <Heart className="h-4 w-4 fill-current text-[var(--primary)]" />
              para la comunidad juvenil.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}