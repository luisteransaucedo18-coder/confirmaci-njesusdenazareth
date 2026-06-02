import { Camera, Image as ImageIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/Card";
import { getGalleryItems } from "@/features/landing/services/landingService";
import { LandingFooter } from "@/features/landing/components/LandingFooter";
import { LandingHeader } from "@/features/landing/components/LandingHeader";

type GalleryItem = {
  id: string;
  titulo: string;
  descripcion?: string;
  public_url?: string;
  storage_path?: string;
};

import gallery1 from "@/assets/images/WhatsApp Image 2026-06-02 at 3.32.03 PM.jpeg";
import gallery2 from "@/assets/images/WhatsApp Image 2026-06-02 at 3.32.04 PM.jpeg";
import gallery3 from "@/assets/images/WhatsApp Image 2026-06-02 at 3.32.05 PM.jpeg";
import gallery4 from "@/assets/images/WhatsApp Image 2026-06-02 at 3.32.06 PM.jpeg";

export default function Galeria() {
  const { data: fotos = [] as GalleryItem[] } = useQuery<GalleryItem[]>({
    queryKey: ["landingGallery"],
    queryFn: getGalleryItems,
  });

  const galleryItems: GalleryItem[] = fotos.length
    ? fotos
    : [
        { id: "fallback-1", titulo: "Encuentro Juvenil", public_url: gallery1 },
        { id: "fallback-2", titulo: "Dinámicas de Integración", public_url: gallery2 },
        { id: "fallback-3", titulo: "Convivencia Parroquial", public_url: gallery3 },
        { id: "fallback-4", titulo: "Formación Cristiana", public_url: gallery4 },
        { id: "fallback-5", titulo: "Retiro Espiritual", public_url: gallery1 },
        { id: "fallback-6", titulo: "Actividades Pastorales", public_url: gallery2 },
        { id: "fallback-7", titulo: "Misión Juvenil", public_url: gallery3 },
        { id: "fallback-8", titulo: "Celebración Comunitaria", public_url: gallery4 },
      ];

  return (
    <>
      <LandingHeader />
      <main className="min-h-screen bg-[var(--background)] pt-24">
        <section className="bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 py-28 text-white">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <Camera className="mx-auto mb-6 h-16 w-16 text-yellow-400" />

            <h1 className="text-5xl font-black md:text-7xl">
              Galería
            </h1>

          <p className="mx-auto mt-6 max-w-3xl text-xl text-slate-300">
            Revive los mejores momentos de nuestro Grupo de
            Confirmación Juvenil a través de fotografías de
            encuentros, retiros, convivencias y actividades
            parroquiales.
          </p>
        </div>
      </section>

      {/* INTRO */}

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-4xl font-black">
            Momentos que construyen comunidad
          </h2>

          <p className="mt-4 text-lg text-[var(--muted-foreground)]">
            Cada fotografía representa experiencias de fe,
            amistad, aprendizaje y crecimiento espiritual
            vividas por nuestros jóvenes.
          </p>
        </div>
      </section>

      {/* GALERÍA */}

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {galleryItems.map((foto) => {
              const src = foto.public_url ?? foto.storage_path ?? gallery1;

              return (
                <Card
                  key={foto.id}
                  className="overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="overflow-hidden">
                    <img
                      src={src}
                      alt={foto.titulo}
                      className="h-72 w-full object-cover transition duration-500 hover:scale-110"
                    />
                  </div>

                  <div className="p-4">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="h-4 w-4 text-[var(--primary)]" />
                      <h3 className="font-semibold">
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

      {/* ESTADÍSTICAS */}

      <section className="bg-[var(--card)] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="text-center">
              <h3 className="text-5xl font-black text-[var(--primary)]">
                +500
              </h3>

              <p className="mt-3 font-semibold">
                Fotografías
              </p>
            </Card>

            <Card className="text-center">
              <h3 className="text-5xl font-black text-[var(--primary)]">
                +30
              </h3>

              <p className="mt-3 font-semibold">
                Eventos Realizados
              </p>
            </Card>

            <Card className="text-center">
              <h3 className="text-5xl font-black text-[var(--primary)]">
                +200
              </h3>

              <p className="mt-3 font-semibold">
                Jóvenes Participantes
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* MENSAJE FINAL */}

      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl font-black">
            Más que fotografías
          </h2>

          <p className="mt-6 text-lg text-[var(--muted-foreground)]">
            Cada imagen refleja el compromiso, la alegría y
            la fe de una comunidad juvenil que crece junto a
            Cristo y al servicio de la Iglesia.
          </p>
        </div>
      </section>
    </main>
    <LandingFooter />
    </>
  );
}