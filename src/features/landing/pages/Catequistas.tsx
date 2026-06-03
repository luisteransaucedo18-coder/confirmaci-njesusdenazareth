import {
  User,
  Users,
  GraduationCap,
  HeartHandshake,
  Church,
} from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/Card";
import { getCatequistasList } from "@/features/landing/services/landingService";
import { LandingFooter } from "@/features/landing/components/LandingFooter";
import { LandingHeader } from "@/features/landing/components/LandingHeader";
import catequistasBackground from "@/assets/images/catequistas-background.jpeg";

type CatequistaCard = {
  id: string;
  nombre: string;
  cargo: string;
  descripcion: string;
};

type CatequistaRow = {
  id: string;
  nombre: string;
  correo?: string;
  telefono?: string;
  rol?: string;
};

export default function Catequistas() {
  const { data: equipo = [] as CatequistaRow[] } = useQuery<CatequistaRow[]>({
    queryKey: ["landingCatequistas"],
    queryFn: getCatequistasList,
  });

  const fallbackEquipo: CatequistaCard[] = [
    {
      id: "fallback-1",
      nombre: "Juan Pérez",
      cargo: "Coordinador General",
      descripcion:
        "Responsable de la organización y acompañamiento general del grupo juvenil.",
    },
    {
      id: "fallback-2",
      nombre: "María López",
      cargo: "Catequista",
      descripcion:
        "Encargada de la formación doctrinal y espiritual de los confirmantes.",
    },
    {
      id: "fallback-3",
      nombre: "Carlos Ramírez",
      cargo: "Catequista",
      descripcion:
        "Acompaña los encuentros formativos y actividades pastorales.",
    },
    {
      id: "fallback-4",
      nombre: "Ana Torres",
      cargo: "Animadora Juvenil",
      descripcion:
        "Promueve la integración y participación activa de los jóvenes.",
    },
  ];

  const equipoVisible: CatequistaCard[] =
    equipo.length > 0
      ? equipo.map((item) => ({
          id: item.id,
          nombre: item.nombre,
          cargo: item.rol ?? "Catequista",
          descripcion: `Correo: ${item.correo ?? "no disponible"} • Tel: ${item.telefono ?? "no disponible"}`,
        }))
      : fallbackEquipo;

  return (
    <>
      <LandingHeader />
      <main className="bg-[var(--background)] text-[var(--foreground)]">
        
        {/* HERO (Mismo diseño e inclinación visual que Inicio) */}
        <section
          className="relative min-h-screen overflow-hidden bg-cover bg-center flex items-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.75)), url(${catequistasBackground})`,
          }}
        >
          <div className="mx-auto flex w-full max-w-7xl items-center px-6 py-20">
            <div className="max-w-4xl text-white">
              <span className="inline-flex rounded-full bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] backdrop-blur-md">
                Acompañamiento
              </span>

              <h1 className="mt-8 text-5xl font-black leading-tight md:text-7xl">
                Equipo de
                <br />
                Catequistas.
              </h1>

              <p className="mt-8 max-w-2xl text-xl text-white/80">
                Conoce a las personas que acompañan y guían a nuestros
                jóvenes durante su proceso de formación para el
                Sacramento de la Confirmación.
              </p>
            </div>
          </div>
        </section>

        {/* INTRODUCCIÓN Y EQUIPO (Cards centradas con avatares minimalistas) */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            
            <div className="mb-16 text-center">
              <span className="inline-flex rounded-full bg-[var(--primary)]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-[var(--primary)]">
                Vocación y Servicio
              </span>
              <h2 className="mt-6 text-4xl font-black md:text-5xl">
                Una misión al servicio de la fe
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-lg text-[var(--muted-foreground)]">
                Nuestro equipo está conformado por catequistas, coordinadores y animadores 
                comprometidos con la evangelización y el acompañamiento integral de los jóvenes.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {equipoVisible.map((persona) => (
                <Card
                  key={persona.id ?? persona.nombre}
                  className="rounded-3xl p-8 text-center transition hover:-translate-y-2 shadow-xl shadow-[rgba(0,0,0,0.02)]"
                >
                  <div className="mb-6 flex justify-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[var(--primary)]/10">
                      <User className="h-12 w-12 text-[var(--primary)]" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-[var(--foreground)]">
                    {persona.nombre}
                  </h3>

                  <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
                    {persona.cargo}
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-[var(--muted-foreground)]">
                    {persona.descripcion}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* RESPONSABILIDADES (Fondo alterno --card) */}
        <section className="bg-[var(--card)] py-24">
          <div className="mx-auto max-w-7xl px-6">
            
            <div className="mb-16 text-center">
              <h2 className="text-4xl font-black md:text-5xl">
                Nuestra Labor
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg text-[var(--muted-foreground)]">
                Pilares fundamentales de nuestra entrega hacia la comunidad juvenil.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Card className="rounded-3xl p-8 transition hover:-translate-y-2">
                <Church className="mb-5 h-12 w-12 text-[var(--primary)]" />
                <h3 className="text-2xl font-bold">Formación Espiritual</h3>
                <p className="mt-4 text-[var(--muted-foreground)]">
                  Preparar a los jóvenes para vivir plenamente su fe.
                </p>
              </Card>

              <Card className="rounded-3xl p-8 transition hover:-translate-y-2">
                <HeartHandshake className="mb-5 h-12 w-12 text-[var(--secondary)]" />
                <h3 className="text-2xl font-bold">Acompañamiento</h3>
                <p className="mt-4 text-[var(--muted-foreground)]">
                  Escuchar, orientar y apoyar a cada integrante.
                </p>
              </Card>

              <Card className="rounded-3xl p-8 transition hover:-translate-y-2">
                <GraduationCap className="mb-5 h-12 w-12 text-[var(--accent)]" />
                <h3 className="text-2xl font-bold">Enseñanza</h3>
                <p className="mt-4 text-[var(--muted-foreground)]">
                  Compartir el mensaje del Evangelio y la doctrina cristiana.
                </p>
              </Card>

              <Card className="rounded-3xl p-8 transition hover:-translate-y-2">
                <Users className="mb-5 h-12 w-12 text-[var(--primary)]" />
                <h3 className="text-2xl font-bold">Comunidad</h3>
                <p className="mt-4 text-[var(--muted-foreground)]">
                  Fortalecer la fraternidad y la participación parroquial.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* ESTADÍSTICAS (Mismo formato de bloques difuminados de Inicio, pero adaptado para 4 columnas) */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-6 md:grid-cols-4">
              
              <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 text-center shadow-md">
                <span className="block text-5xl font-black text-[var(--primary)]">
                  15+
                </span>
                <span className="mt-3 block font-semibold text-[var(--muted-foreground)]">
                  Catequistas
                </span>
              </div>

              <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 text-center shadow-md">
                <span className="block text-5xl font-black text-[var(--secondary)]">
                  200+
                </span>
                <span className="mt-3 block font-semibold text-[var(--muted-foreground)]">
                  Jóvenes Formados
                </span>
              </div>

              <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 text-center shadow-md">
                <span className="block text-5xl font-black text-[var(--accent)]">
                  10+
                </span>
                <span className="mt-3 block font-semibold text-[var(--muted-foreground)]">
                  Años de Servicio
                </span>
              </div>

              <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 text-center shadow-md">
                <span className="block text-5xl font-black text-[var(--primary)]">
                  30+
                </span>
                <span className="mt-3 block font-semibold text-[var(--muted-foreground)]">
                  Actividades Anuales
                </span>
              </div>

            </div>
          </div>
        </section>

      </main>
      <LandingFooter />
    </>
  );
}