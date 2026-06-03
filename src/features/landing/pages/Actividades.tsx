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
import actividadesBackground from "@/assets/images/actividades-background.jpeg";

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
      color: "text-[var(--primary)]",
    },
    {
      icon: Heart,
      titulo: "Oración Comunitaria",
      descripcion:
        "Espacios de encuentro con Dios mediante la oración y reflexión.",
      color: "text-[var(--secondary)]",
    },
    {
      icon: Users,
      titulo: "Dinámicas Grupales",
      descripcion:
        "Actividades que fortalecen la amistad y el trabajo en equipo.",
      color: "text-[var(--accent)]",
    },
    {
      icon: Star,
      titulo: "Servicio Solidario",
      descripcion:
        "Participación activa en campañas y proyectos de ayuda social.",
      color: "text-[var(--primary)]",
    },
  ];

  return (
    <>
      <LandingHeader />
      <main className="bg-[var(--background)] text-[var(--foreground)]">

        {/* HERO (Misma cuadrícula asimétrica premium, pero con tipografías y desenfoques unificados) */}
        <section
          className="relative min-h-screen overflow-hidden bg-cover bg-center flex items-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.75)), url(${actividadesBackground})`,
          }}
        >
          <div className="mx-auto w-full max-w-7xl px-6 py-24">
            <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div className="text-white">
                <span className="inline-flex rounded-full bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] backdrop-blur-md">
                  Calendario
                </span>
                <h1 className="mt-8 text-5xl font-black leading-tight md:text-7xl">
                  Vive encuentros
                  <br />
                  que transforman.
                </h1>
                <p className="mt-8 max-w-2xl text-xl text-white/80">
                  Participa en retiros, convivencias y jornadas de servicio diseñadas para crecer en fe y comunidad.
                </p>
                <div className="mt-10">
                  <Button className="rounded-full px-8 py-3">
                    Ver actividades
                  </Button>
                </div>
              </div>

              <div className="rounded-[2.5rem] bg-white/10 p-8 text-white backdrop-blur-md border border-white/10 shadow-2xl">
                <CalendarDays className="mb-5 h-12 w-12 text-[var(--accent)]" />
                <h2 className="text-3xl font-bold">Agenda juvenil</h2>
                <p className="mt-4 text-white/80 leading-relaxed">
                  Actividades pensadas para acompañar tu crecimiento espiritual y tu vida en comunidad.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PRÓXIMOS EVENTOS (Cards anchas de 2 columnas con transiciones) */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <span className="inline-flex rounded-full bg-[var(--primary)]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-[var(--primary)]">
                Próximos eventos
              </span>
              <h2 className="mt-6 text-4xl font-black md:text-5xl">
                Cronograma de crecimiento
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-lg text-[var(--muted-foreground)]">
                Descubre los eventos preparados para los próximos meses y únete a nuestra experiencia juvenil.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {actividades.map((actividad) => (
                <Card 
                  key={actividad.id} 
                  className="rounded-3xl p-8 transition hover:-translate-y-2 shadow-xl shadow-[rgba(0,0,0,0.02)]"
                >
                  <CalendarDays className="mb-5 h-12 w-12 text-[var(--primary)]" />
                  <h3 className="text-2xl font-bold">{actividad.titulo}</h3>
                  <p className="mt-2 text-sm font-bold uppercase tracking-wider text-[var(--secondary)]">
                    {actividad.fecha}
                  </p>
                  <p className="mt-4 text-[var(--muted-foreground)] leading-relaxed">
                    {actividad.descripcion}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ACTIVIDADES PERMANENTES (Fondo alterno --card y variedad de colores temáticos) */}
        <section className="bg-[var(--card)] py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <h2 className="text-4xl font-black md:text-5xl">
                Actividades permanentes
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-lg text-[var(--muted-foreground)]">
                Actividades regulares que acompañan el crecimiento espiritual y la convivencia juvenil.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {permanentes.map((actividad) => {
                const Icon = actividad.icon;
                return (
                  <Card 
                    key={actividad.titulo} 
                    className="rounded-3xl p-8 transition hover:-translate-y-2"
                  >
                    <Icon className={`mb-5 h-12 w-12 ${actividad.color}`} />
                    <h3 className="text-2xl font-bold">{actividad.titulo}</h3>
                    <p className="mt-4 text-sm text-[var(--muted-foreground)] leading-relaxed">
                      {actividad.descripcion}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* HORARIOS (Estructura interna limpia con bordes sumamente curvos) */}
        <section className="py-24">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="mb-12 text-center text-4xl font-black">
              Cronograma general
            </h2>
            
            <Card className="rounded-[2.5rem] p-10 shadow-xl shadow-[rgba(0,0,0,0.03)] border border-[var(--border)]">
              <div className="space-y-8">
                <div className="flex items-start gap-5 border-b border-[var(--border)] pb-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/10">
                    <Clock className="h-6 w-6 text-[var(--primary)]" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">Reunión Semanal</h4>
                    <p className="mt-1 text-[var(--muted-foreground)]">Todos los sábados — 4:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 border-b border-[var(--border)] pb-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--secondary)]/10">
                    <Clock className="h-6 w-6 text-[var(--secondary)]" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">Formación Catequética</h4>
                    <p className="mt-1 text-[var(--muted-foreground)]">Todos los domingos — 10:00 AM</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/10">
                    <Clock className="h-6 w-6 text-[var(--accent)]" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">Actividades Especiales</h4>
                    <p className="mt-1 text-[var(--muted-foreground)]">Según programación mensual.</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* SECCIÓN FINAL DE PARTICIPACIÓN (Estilo Banner Centrado Limpio) */}
        <section className="bg-[var(--card)] py-24">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-4xl font-black md:text-5xl">
              Participa con nosotros
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--muted-foreground)]">
              Inscríbete y acompáñanos en el camino de la Confirmación con actividades pensadas para tu crecimiento.
            </p>
            <div className="mt-10">
              <Button className="rounded-full px-10 py-4 font-semibold text-md">
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