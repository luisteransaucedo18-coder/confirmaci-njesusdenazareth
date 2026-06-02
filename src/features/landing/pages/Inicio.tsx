import {
  Church,
  Users,
  HeartHandshake,
  CalendarDays,
  ArrowRight,
  Star,
} from "lucide-react";

import { Link } from "react-router-dom";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

import heroImage from "@/assets/images/WhatsApp Image 2026-06-02 at 3.32.07 PM.jpeg";
import gallery1 from "@/assets/images/WhatsApp Image 2026-06-02 at 3.32.03 PM.jpeg";
import gallery2 from "@/assets/images/WhatsApp Image 2026-06-02 at 3.32.04 PM.jpeg";
import gallery3 from "@/assets/images/WhatsApp Image 2026-06-02 at 3.32.05 PM.jpeg";

export default function Inicio() {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">

      {/* HERO */}

      <section
        className="relative min-h-[90vh] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(15,23,42,.75),rgba(15,23,42,.85)), url(${heroImage})`,
        }}
      >
        <div className="mx-auto flex min-h-[90vh] max-w-7xl items-center px-6">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl font-black md:text-7xl">
              Grupo de Confirmación Juvenil
            </h1>

            <p className="mt-6 text-xl text-slate-200">
              Formando jóvenes comprometidos con Cristo,
              la Iglesia y la comunidad.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/nosotros">
                <Button>
                  Conócenos
                </Button>
              </Link>

              <Link to="/contacto">
                <Button variant="secondary">
                  Inscribirme
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ESTADÍSTICAS */}

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-4">
            <Card className="text-center">
              <h3 className="text-5xl font-black text-[var(--primary)]">
                200+
              </h3>
              <p>Jóvenes Formados</p>
            </Card>

            <Card className="text-center">
              <h3 className="text-5xl font-black text-[var(--primary)]">
                15+
              </h3>
              <p>Catequistas</p>
            </Card>

            <Card className="text-center">
              <h3 className="text-5xl font-black text-[var(--primary)]">
                30+
              </h3>
              <p>Eventos al Año</p>
            </Card>

            <Card className="text-center">
              <h3 className="text-5xl font-black text-[var(--primary)]">
                10+
              </h3>
              <p>Años de Servicio</p>
            </Card>
          </div>
        </div>
      </section>

      {/* QUIÉNES SOMOS */}

      <section className="bg-[var(--card)] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-4xl font-black">
                ¿Quiénes Somos?
              </h2>

              <p className="mt-6 text-lg text-[var(--muted-foreground)]">
                Somos una comunidad juvenil que acompaña a los
                jóvenes en su preparación para el Sacramento de
                la Confirmación, promoviendo el crecimiento
                espiritual, humano y comunitario.
              </p>

              <Link
                to="/nosotros"
                className="mt-6 inline-flex items-center gap-2 font-semibold text-[var(--primary)]"
              >
                Leer más
                <ArrowRight size={18} />
              </Link>
            </div>

            <Card>
              <Church className="mx-auto h-32 w-32 text-[var(--primary)]" />
            </Card>
          </div>
        </div>
      </section>

      {/* ACTIVIDADES */}

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-center text-4xl font-black">
            Próximas Actividades
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CalendarDays className="mb-4 h-8 w-8 text-[var(--primary)]" />
              <h3 className="font-bold">
                Retiro Espiritual
              </h3>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                Jornada de reflexión y encuentro con Dios.
              </p>
            </Card>

            <Card>
              <Users className="mb-4 h-8 w-8 text-[var(--primary)]" />
              <h3 className="font-bold">
                Convivencia Juvenil
              </h3>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                Fortaleciendo la amistad y la comunidad.
              </p>
            </Card>

            <Card>
              <HeartHandshake className="mb-4 h-8 w-8 text-[var(--primary)]" />
              <h3 className="font-bold">
                Misión Solidaria
              </h3>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                Servicio y evangelización en comunidad.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}

      <section className="bg-[var(--card)] py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-12 text-center text-4xl font-black">
            Testimonios
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <Card key={item}>
                <Star className="mb-4 h-8 w-8 text-yellow-500" />

                <p className="italic text-[var(--muted-foreground)]">
                  "La confirmación fortaleció mi relación con Dios
                  y me permitió encontrar una familia en la Iglesia."
                </p>

                <h4 className="mt-4 font-bold">
                  Joven Confirmado
                </h4>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* GALERÍA */}

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-center text-4xl font-black">
            Galería Destacada
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {[gallery1, gallery2, gallery3].map((img) => (
              <img
                key={img}
                src={img}
                alt="Galería"
                className="h-80 w-full rounded-xl object-cover shadow-lg"
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="bg-gradient-to-r from-[var(--primary)] to-blue-700 py-24 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl font-black">
            ¿Listo para iniciar tu camino de fe?
          </h2>

          <p className="mt-6 text-lg">
            Únete a nuestra comunidad y vive una experiencia
            transformadora junto a otros jóvenes.
          </p>

          <Link to="/contacto">
            <Button
              variant="secondary"
              className="mt-8"
            >
              Solicitar Información
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}