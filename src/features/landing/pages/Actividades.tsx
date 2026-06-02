import {
  CalendarDays,
  Users,
  Church,
  Heart,
  Star,
  Clock,
} from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getUpcomingEventos } from "@/features/landing/services/landingService";
import { LandingFooter } from "@/features/landing/components/LandingFooter";
import { LandingHeader } from "@/features/landing/components/LandingHeader";

export default function Actividades() {
  const { data: eventos = [] } = useQuery({
    queryKey: ["landingUpcomingEventos"],
    queryFn: getUpcomingEventos,
  });

  const actividades = eventos.length
    ? eventos.map((evento) => ({
        id: evento.id,
        titulo: evento.nombre,
        fecha: evento.fecha
          ? new Date(evento.fecha).toLocaleDateString("es-PE", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          : "Fecha próxima",
        descripcion: evento.descripcion ?? "No hay descripción disponible.",
      }))
    : [
        {
          id: "fallback-1",
          titulo: "Retiro Espiritual Juvenil",
          fecha: "15 Julio 2026",
          descripcion:
            "Encuentro de reflexión y crecimiento espiritual para todos los confirmantes.",
        },
        {
          id: "fallback-2",
          titulo: "Convivencia Juvenil",
          fecha: "28 Julio 2026",
          descripcion:
            "Jornada de integración, dinámicas y fortalecimiento de la comunidad.",
        },
        {
          id: "fallback-3",
          titulo: "Misión Parroquial",
          fecha: "10 Agosto 2026",
          descripcion:
            "Actividad de servicio y evangelización en distintos sectores de la parroquia.",
        },
      ];

  const permanentes = [
    {
      icon: Church,
      titulo: "Catequesis Semanal",
      descripcion:
        "Encuentros de formación cristiana y preparación para la confirmación.",
    },
    {
      icon: Heart,
      titulo: "Oración Comunitaria",
      descripcion:
        "Espacios de encuentro con Dios mediante la oración y reflexión.",
    },
    {
      icon: Users,
      titulo: "Dinámicas Grupales",
      descripcion:
        "Actividades que fortalecen la amistad y el trabajo en equipo.",
    },
    {
      icon: Star,
      titulo: "Servicio Solidario",
      descripcion:
        "Participación activa en campañas y proyectos de ayuda social.",
    },
  ];

  return (
    <>
      <LandingHeader />
      <main className="min-h-screen bg-[var(--background)] pt-24">
      {/* HERO */}

      <section className="bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 py-28 text-white">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <CalendarDays className="mx-auto mb-6 h-16 w-16 text-yellow-400" />

          <h1 className="text-5xl font-black md:text-7xl">
            Actividades
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-xl text-slate-300">
            Vivimos nuestra fe mediante encuentros, retiros,
            convivencias y actividades de servicio que fortalecen
            nuestra formación cristiana.
          </p>
        </div>
      </section>

      {/* PRÓXIMOS EVENTOS */}

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-center text-4xl font-black">
            Próximos Eventos
          </h2>

          <div className="grid gap-6 lg:grid-cols-3">
            {actividades.map((actividad) => (
              <Card key={actividad.titulo}>
                <CalendarDays className="mb-4 h-10 w-10 text-[var(--primary)]" />

                <h3 className="text-xl font-bold">
                  {actividad.titulo}
                </h3>

                <p className="mt-2 text-sm font-semibold text-[var(--primary)]">
                  {actividad.fecha}
                </p>

                <p className="mt-4 text-[var(--muted-foreground)]">
                  {actividad.descripcion}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ACTIVIDADES PERMANENTES */}

      <section className="bg-[var(--card)] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-center text-4xl font-black">
            Actividades Permanentes
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {permanentes.map((actividad) => {
              const Icon = actividad.icon;

              return (
                <Card key={actividad.titulo}>
                  <Icon className="mb-4 h-10 w-10 text-[var(--primary)]" />

                  <h3 className="mb-3 text-xl font-bold">
                    {actividad.titulo}
                  </h3>

                  <p className="text-sm text-[var(--muted-foreground)]">
                    {actividad.descripcion}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CRONOGRAMA */}

      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-12 text-center text-4xl font-black">
            Cronograma General
          </h2>

          <Card>
            <div className="space-y-6">
              <div className="flex items-center gap-4 border-b pb-4">
                <Clock className="h-6 w-6 text-[var(--primary)]" />
                <div>
                  <h4 className="font-bold">
                    Reunión Semanal
                  </h4>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    Todos los sábados - 4:00 PM
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 border-b pb-4">
                <Clock className="h-6 w-6 text-[var(--primary)]" />
                <div>
                  <h4 className="font-bold">
                    Formación Catequética
                  </h4>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    Todos los domingos - 10:00 AM
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Clock className="h-6 w-6 text-[var(--primary)]" />
                <div>
                  <h4 className="font-bold">
                    Actividades Especiales
                  </h4>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    Según programación mensual.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* ESTADÍSTICAS */}

      <section className="bg-[var(--card)] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-4">
            <Card className="text-center">
              <h3 className="text-5xl font-black text-[var(--primary)]">
                30+
              </h3>
              <p className="mt-3 font-semibold">
                Eventos por Año
              </p>
            </Card>

            <Card className="text-center">
              <h3 className="text-5xl font-black text-[var(--primary)]">
                200+
              </h3>
              <p className="mt-3 font-semibold">
                Participantes
              </p>
            </Card>

            <Card className="text-center">
              <h3 className="text-5xl font-black text-[var(--primary)]">
                15+
              </h3>
              <p className="mt-3 font-semibold">
                Catequistas
              </p>
            </Card>

            <Card className="text-center">
              <h3 className="text-5xl font-black text-[var(--primary)]">
                10+
              </h3>
              <p className="mt-3 font-semibold">
                Años de Servicio
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl font-black">
            Participa con Nosotros
          </h2>

          <p className="mt-6 text-lg text-[var(--muted-foreground)]">
            Te invitamos a formar parte de nuestras actividades,
            fortalecer tu fe y vivir una experiencia única junto
            a otros jóvenes comprometidos con Cristo.
          </p>

          <div className="mt-8">
            <Button>
              Quiero Participar
            </Button>
          </div>
        </div>
      </section>
    </main>
    <LandingFooter />
    </>
  );
}