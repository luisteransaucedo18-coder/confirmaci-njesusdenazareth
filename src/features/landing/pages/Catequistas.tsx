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
      <main className="min-h-screen bg-[var(--background)] pt-24">
      {/* HERO */}

      <section className="bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 py-28 text-white">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <GraduationCap className="mx-auto mb-6 h-16 w-16 text-yellow-400" />

          <h1 className="text-5xl font-black md:text-7xl">
            Equipo de Catequistas
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-xl text-slate-300">
            Conoce a las personas que acompañan y guían a nuestros
            jóvenes durante su proceso de formación para el
            Sacramento de la Confirmación.
          </p>
        </div>
      </section>

      {/* INTRODUCCIÓN */}

      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-4xl font-black">
            Una misión al servicio de la fe
          </h2>

          <p className="mt-6 text-lg text-[var(--muted-foreground)]">
            Nuestro equipo está conformado por catequistas,
            coordinadores y animadores comprometidos con la
            evangelización y el acompañamiento integral de los jóvenes.
          </p>
        </div>
      </section>

      {/* EQUIPO */}

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {equipoVisible.map((persona) => (
              <Card
                key={persona.id ?? persona.nombre}
                className="text-center"
              >
                <div className="mb-4 flex justify-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[var(--primary)]/10">
                    <User className="h-12 w-12 text-[var(--primary)]" />
                  </div>
                </div>

                <h3 className="text-xl font-bold">
                  {persona.nombre}
                </h3>

                <p className="mt-2 font-semibold text-[var(--primary)]">
                  {persona.cargo}
                </p>

                <p className="mt-4 text-sm text-[var(--muted-foreground)]">
                  {persona.descripcion}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* RESPONSABILIDADES */}

      <section className="bg-[var(--card)] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-center text-4xl font-black">
            Nuestra Labor
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <Church className="mb-4 h-10 w-10 text-[var(--primary)]" />
              <h3 className="mb-3 font-bold">
                Formación Espiritual
              </h3>
              <p className="text-sm text-[var(--muted-foreground)]">
                Preparar a los jóvenes para vivir plenamente su fe.
              </p>
            </Card>

            <Card>
              <HeartHandshake className="mb-4 h-10 w-10 text-[var(--primary)]" />
              <h3 className="mb-3 font-bold">
                Acompañamiento
              </h3>
              <p className="text-sm text-[var(--muted-foreground)]">
                Escuchar, orientar y apoyar a cada integrante.
              </p>
            </Card>

            <Card>
              <GraduationCap className="mb-4 h-10 w-10 text-[var(--primary)]" />
              <h3 className="mb-3 font-bold">
                Enseñanza
              </h3>
              <p className="text-sm text-[var(--muted-foreground)]">
                Compartir el mensaje del Evangelio y la doctrina cristiana.
              </p>
            </Card>

            <Card>
              <Users className="mb-4 h-10 w-10 text-[var(--primary)]" />
              <h3 className="mb-3 font-bold">
                Comunidad
              </h3>
              <p className="text-sm text-[var(--muted-foreground)]">
                Fortalecer la fraternidad y la participación parroquial.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* ESTADÍSTICAS */}

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-4">
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
                200+
              </h3>
              <p className="mt-3 font-semibold">
                Jóvenes Formados
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

            <Card className="text-center">
              <h3 className="text-5xl font-black text-[var(--primary)]">
                30+
              </h3>
              <p className="mt-3 font-semibold">
                Actividades Anuales
              </p>
            </Card>
          </div>
        </div>
      </section>
    </main>
    <LandingFooter />
    </>
  );
}