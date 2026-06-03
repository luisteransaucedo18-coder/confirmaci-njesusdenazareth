import {
  Heart,
  Users,
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
import nosotrosImage from "@/assets/images/WhatsApp Image 2026-06-02 at 3.32.02 PM.jpeg";

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
      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">

       <section
  className="relative min-h-screen overflow-hidden bg-cover bg-center"
  style={{
    backgroundImage: `linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.75)), url(${nosotrosImage})`,
  }}
>
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />

  <div className="relative mx-auto flex min-h-[85vh] max-w-7xl items-center px-6">
    <div className="max-w-4xl text-white">

      <span className="inline-flex rounded-full bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] backdrop-blur-md">
        Nuestra Comunidad
      </span>

      <h1 className="mt-8 text-5xl font-black leading-tight md:text-7xl">
        Conoce quiénes somos
      </h1>

      <p className="mt-8 max-w-3xl text-xl text-white/80">
        Somos una comunidad juvenil comprometida con la formación
        espiritual, humana y comunitaria de los jóvenes que se preparan
        para recibir el Sacramento de la Confirmación.
      </p>

    </div>
  </div>
</section>

      {/* HISTORIA */}

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2">

                <div>
                    <span className="inline-flex rounded-full bg-[var(--primary)]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-[var(--primary)]">
                    Nuestra Historia
                    </span>

                    <h2 className="mt-6 text-5xl font-black">
                    Una comunidad que sigue creciendo
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-[var(--muted-foreground)]">
                    Nuestro grupo nació con la misión de acompañar a los jóvenes
                    en su encuentro personal con Cristo y en su preparación para
                    recibir el Sacramento de la Confirmación.
                    </p>

                    <p className="mt-5 text-lg leading-8 text-[var(--muted-foreground)]">
                    Durante los años hemos desarrollado encuentros,
                    convivencias, retiros espirituales y actividades de servicio
                    que fortalecen la fe y construyen una verdadera comunidad.
                    </p>

                    <p className="mt-5 text-lg leading-8 text-[var(--muted-foreground)]">
                    Hoy seguimos formando jóvenes comprometidos con el Evangelio,
                    capaces de transformar su entorno mediante el amor y el servicio.
                    </p>
                </div>

                <Card className="overflow-hidden rounded-[2rem] p-0 shadow-2xl">
                    <img
                    src={nosotrosImage}
                    alt="Grupo Juvenil"
                    className="h-[550px] w-full object-cover"
                    />
                </Card>
            </div>
        </div>
    </section>

      {/* ESTADISTICAS */}

    <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

            {estadisticas.map((item) => (
                <Card
                key={item.titulo}
                className="rounded-[2rem] border-0 text-center shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                <h3 className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-6xl font-black text-transparent">
                    {item.numero}
                </h3>

                <p className="mt-4 text-lg font-semibold">
                    {item.titulo}
                </p>
                </Card>
            ))}

            </div>

        </div>
    </section>

      {/* MISION Y VISION */}

      <section className="bg-[var(--card)] py-24">
        <div className="mx-auto max-w-7xl px-6">

            <div className="grid gap-8 lg:grid-cols-2">

            <Card className="rounded-[2rem] border-0 p-10 shadow-xl">

                <Target className="mb-6 h-14 w-14 text-[var(--primary)]" />

                <h2 className="mb-5 text-4xl font-black">
                Misión
                </h2>

                <p className="text-lg leading-8 text-[var(--muted-foreground)]">
                Formar jóvenes comprometidos con Cristo fortaleciendo
                su vida espiritual, humana y comunitaria para que sean
                auténticos testigos del Evangelio.
                </p>

            </Card>

            <Card className="rounded-[2rem] border-0 p-10 shadow-xl">

                <Eye className="mb-6 h-14 w-14 text-[var(--secondary)]" />

                <h2 className="mb-5 text-4xl font-black">
                Visión
                </h2>

                <p className="text-lg leading-8 text-[var(--muted-foreground)]">
                Ser una comunidad juvenil evangelizadora que forme líderes
                cristianos comprometidos con el servicio y la transformación
                de la sociedad.
                </p>

            </Card>

            </div>
        </div>
    </section>

      {/* VALORES */}

      <section className="bg-[var(--card)] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-4xl font-black">Nuestros Valores</h2>
            <p className="mt-4 text-[var(--muted-foreground)]">Principios que guían nuestro camino de formación.</p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {valores.map((valor) => {
              const Icon = valor.icon;
              return (
                <Card key={valor.titulo} className="rounded-[2rem] p-8 shadow-xl shadow-[rgba(0,0,0,0.08)]">
                  <Icon className="mb-4 h-10 w-10 text-[var(--primary)]" />
                  <h3 className="mb-3 text-xl font-bold">{valor.titulo}</h3>
                  <p className="text-sm text-[var(--muted-foreground)]">{valor.descripcion}</p>
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

      <section className="bg-gradient-to-r from-[var(--primary)] to-lightblue-700 py-24 text-white">
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