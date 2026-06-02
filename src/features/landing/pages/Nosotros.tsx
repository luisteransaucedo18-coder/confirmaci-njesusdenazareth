import {
  Heart,
  Users,
  Church,
  Star,
  Target,
  Eye,
  ShieldCheck,
} from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Link } from "react-router-dom";
import { getLandingStats } from "@/features/landing/services/landingService";
import { LandingFooter } from "@/features/landing/components/LandingFooter";
import { LandingHeader } from "@/features/landing/components/LandingHeader";

export default function Nosotros() {
  const valores = [
    {
      icon: Heart,
      titulo: "Fe",
      descripcion:
        "Vivimos nuestra relación con Dios mediante la oración, los sacramentos y el servicio.",
    },
    {
      icon: Users,
      titulo: "Comunidad",
      descripcion:
        "Caminamos juntos como hermanos formando una familia cristiana.",
    },
    {
      icon: ShieldCheck,
      titulo: "Responsabilidad",
      descripcion:
        "Asumimos con compromiso nuestra formación humana y espiritual.",
    },
    {
      icon: Star,
      titulo: "Servicio",
      descripcion:
        "Ponemos nuestros talentos al servicio de la Iglesia y la sociedad.",
    },
  ];

  const { data: stats = { catequistas: 0, eventosProximos: 0, confirmantesActivos: 0 } } = useQuery({
    queryKey: ["landingStats"],
    queryFn: getLandingStats,
  });

  const estadisticas = [
    {
      numero: `${stats.confirmantesActivos}`,
      titulo: "Jóvenes Activos",
    },
    {
      numero: `${stats.catequistas}`,
      titulo: "Catequistas",
    },
    {
      numero: `${stats.eventosProximos}`,
      titulo: "Eventos Próximos",
    },
    {
      numero: "+10",
      titulo: "Años de Servicio",
    },
  ];

  return (
    <>
      <LandingHeader />
      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-24">
      {/* HERO */}

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 py-32 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <Church className="mx-auto mb-6 h-16 w-16 text-yellow-400" />

          <h1 className="text-5xl font-black md:text-7xl">
            Nosotros
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-xl text-slate-300">
            Somos el Grupo de Confirmación Juvenil de la Parroquia
            Jesús de Nazareth, una comunidad que acompaña a los jóvenes
            en su crecimiento espiritual, humano y comunitario.
          </p>
        </div>
      </section>

      {/* HISTORIA */}

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-4xl font-black">
                Nuestra Historia
              </h2>

              <p className="mb-5 text-lg leading-relaxed text-[var(--muted-foreground)]">
                El Grupo de Confirmación Juvenil nace con el propósito
                de acompañar a los jóvenes en su preparación para
                recibir el Sacramento de la Confirmación y fortalecer
                su encuentro personal con Jesucristo.
              </p>

              <p className="mb-5 text-lg leading-relaxed text-[var(--muted-foreground)]">
                A través de los años hemos desarrollado encuentros,
                retiros espirituales, convivencias, actividades
                parroquiales y experiencias de servicio que permiten
                a cada integrante crecer en la fe y convertirse en un
                verdadero discípulo misionero.
              </p>

              <p className="text-lg leading-relaxed text-[var(--muted-foreground)]">
                Nuestra comunidad continúa creciendo gracias al trabajo
                de catequistas, coordinadores, sacerdotes y jóvenes
                comprometidos con la misión evangelizadora de la Iglesia.
              </p>
            </div>

            <Card className="flex items-center justify-center p-12">
              <Church className="h-32 w-32 text-[var(--primary)]" />
            </Card>
          </div>
        </div>
      </section>

      {/* ESTADISTICAS */}

      <section className="bg-[var(--card)] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {estadisticas.map((item) => (
              <Card
                key={item.titulo}
                className="text-center"
              >
                <h3 className="text-5xl font-black text-[var(--primary)]">
                  {item.numero}
                </h3>

                <p className="mt-3 font-semibold">
                  {item.titulo}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* MISION Y VISION */}

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <Card>
              <Target className="mb-5 h-12 w-12 text-[var(--primary)]" />

              <h2 className="mb-4 text-3xl font-black">
                Misión
              </h2>

              <p className="leading-relaxed text-[var(--muted-foreground)]">
                Formar jóvenes comprometidos con Cristo,
                fortaleciendo su vida espiritual, humana y
                comunitaria para que sean testigos activos
                del Evangelio en la Iglesia y la sociedad.
              </p>
            </Card>

            <Card>
              <Eye className="mb-5 h-12 w-12 text-[var(--primary)]" />

              <h2 className="mb-4 text-3xl font-black">
                Visión
              </h2>

              <p className="leading-relaxed text-[var(--muted-foreground)]">
                Ser una comunidad juvenil sólida, organizada
                y evangelizadora, reconocida por formar
                líderes cristianos comprometidos con el servicio
                y la misión de la Iglesia.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* VALORES */}

      <section className="bg-[var(--card)] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-4xl font-black">
              Nuestros Valores
            </h2>

            <p className="mt-4 text-[var(--muted-foreground)]">
              Principios que guían nuestro camino de formación.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {valores.map((valor) => {
              const Icon = valor.icon;

              return (
                <Card key={valor.titulo}>
                  <Icon className="mb-4 h-10 w-10 text-[var(--primary)]" />

                  <h3 className="mb-3 text-xl font-bold">
                    {valor.titulo}
                  </h3>

                  <p className="text-sm text-[var(--muted-foreground)]">
                    {valor.descripcion}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* OBJETIVOS */}

      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-12 text-center text-4xl font-black">
            Objetivos del Grupo
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            {[
              "Fortalecer la fe de los jóvenes.",
              "Preparar para el Sacramento de la Confirmación.",
              "Promover la participación parroquial.",
              "Desarrollar liderazgo cristiano.",
              "Fomentar el servicio solidario.",
              "Crear espacios de integración juvenil.",
            ].map((item) => (
              <Card key={item}>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-green-600" />
                  <span>{item}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="bg-gradient-to-r from-[var(--primary)] to-blue-700 py-24 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl font-black">
            Forma parte de nuestra comunidad
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90">
            Te invitamos a vivir una experiencia de fe,
            amistad y crecimiento espiritual junto a otros jóvenes.
          </p>

          <div className="mt-8 flex justify-center">
            <Link to="/contacto">
              <Button variant="secondary">
                Solicitar Información
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
    <LandingFooter />
    </>
  );
}