import { Camera, Image as ImageIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { LandingFooter } from "@/features/landing/components/LandingFooter";
import { LandingHeader } from "@/features/landing/components/LandingHeader";

import gallery1 from "@/assets/images/WhatsApp Image 2026-06-02 at 3.32.03 PM.jpeg";
import gallery2 from "@/assets/images/WhatsApp Image 2026-06-02 at 3.32.04 PM.jpeg";
import gallery3 from "@/assets/images/WhatsApp Image 2026-06-02 at 3.32.05 PM.jpeg";
import gallery4 from "@/assets/images/WhatsApp Image 2026-06-02 at 3.32.06 PM.jpeg";

const galleryItems = [
  { id: "gallery-1", titulo: "Encuentro Juvenil", public_url: gallery1 },
  { id: "gallery-2", titulo: "Dinámicas de Integración", public_url: gallery2 },
  { id: "gallery-3", titulo: "Convivencia Parroquial", public_url: gallery3 },
  { id: "gallery-4", titulo: "Formación Cristiana", public_url: gallery4 },
  { id: "gallery-5", titulo: "Retiro Espiritual", public_url: gallery1 },
  { id: "gallery-6", titulo: "Actividades Pastorales", public_url: gallery2 },
  { id: "gallery-7", titulo: "Misión Juvenil", public_url: gallery3 },
  { id: "gallery-8", titulo: "Celebración Comunitaria", public_url: gallery4 },
];

export default function Galeria() {
  return (
    <>
      <LandingHeader />
      <main className="bg-[var(--background)] text-[var(--foreground)]">

        {/* HERO (Mismo diseño inmersivo, tipografías y badge difuminado) */}
        <section
          className="relative min-h-screen overflow-hidden bg-cover bg-center flex items-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.75)), url(${gallery1})`,
          }}
        >
          <div className="mx-auto flex w-full max-w-7xl items-center px-6 py-24">
            <div className="max-w-4xl text-white">
              <span className="inline-flex rounded-full bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] backdrop-blur-md">
                Recuerdos
              </span>

              <h1 className="mt-8 text-5xl font-black leading-tight md:text-7xl">
                Nuestra Galería
                <br />
                de Momentos.
              </h1>

              <p className="mt-8 max-w-2xl text-xl text-white/80">
                Revive los mejores momentos de nuestro Grupo de Confirmación Juvenil 
                a través de fotografías de encuentros, retiros, convivencias y actividades parroquiales.
              </p>
            </div>
          </div>
        </section>

        {/* INTRODUCCIÓN Y GRILLA DE IMÁGENES (Bordes redondeados curvos y efectos hover fluidos) */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            
            <div className="mb-16 text-center">
              <span className="inline-flex rounded-full bg-[var(--primary)]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-[var(--primary)]">
                Comunidad en Imágenes
              </span>
              <h2 className="mt-6 text-4xl font-black md:text-5xl">
                Momentos que construyen comunidad
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-lg text-[var(--muted-foreground)]">
                Cada fotografía representa experiencias de fe, amistad, aprendizaje 
                y crecimiento espiritual vividas por nuestros jóvenes.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {galleryItems.map((foto) => {
                const src = foto.public_url;

                return (
                  <Card
                    key={foto.id}
                    className="group overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--card)] transition duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[rgba(0,0,0,0.06)]"
                  >
                    <div className="overflow-hidden aspect-[4/3]">
                      <img
                        src={src}
                        alt={foto.titulo}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/10">
                          <ImageIcon className="h-4 w-4 text-[var(--primary)]" />
                        </div>
                        <h3 className="font-bold text-[var(--foreground)] line-clamp-1">
                          {foto.titulo}
                        </h3>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* ESTADÍSTICAS (Fondo alterno --card con bloques estilizados usando las variables de la paleta) */}
        <section className="bg-[var(--card)] py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-6 md:grid-cols-3">
              
              <div className="rounded-3xl border border-[var(--border)] bg-[var(--background)] p-8 text-center shadow-md transition hover:-translate-y-1">
                <span className="block text-5xl font-black text-[var(--primary)]">
                  +500
                </span>
                <span className="mt-3 block font-semibold text-[var(--muted-foreground)]">
                  Fotografías
                </span>
              </div>

              <div className="rounded-3xl border border-[var(--border)] bg-[var(--background)] p-8 text-center shadow-md transition hover:-translate-y-1">
                <span className="block text-5xl font-black text-[var(--secondary)]">
                  +30
                </span>
                <span className="mt-3 block font-semibold text-[var(--muted-foreground)]">
                  Eventos Realizados
                </span>
              </div>

              <div className="rounded-3xl border border-[var(--border)] bg-[var(--background)] p-8 text-center shadow-md transition hover:-translate-y-1">
                <span className="block text-5xl font-black text-[var(--accent)]">
                  +200
                </span>
                <span className="mt-3 block font-semibold text-[var(--muted-foreground)]">
                  Jóvenes Participantes
                </span>
              </div>

            </div>
          </div>
        </section>

        {/* SECCIÓN FINAL (Estilo Banner Centrado Limpio) */}
        <section className="py-24">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--primary)]/10 mb-6">
              <Camera className="h-7 w-7 text-[var(--primary)]" />
            </div>
            <h2 className="text-4xl font-black md:text-5xl">
              Más que fotografías
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--muted-foreground)] leading-relaxed">
              Cada imagen refleja el compromiso, la alegría y la fe de una comunidad 
              juvenil que crece junto a Cristo y al servicio de la Iglesia.
            </p>
          </div>
        </section>

      </main>
      <LandingFooter />
    </>
  );
}