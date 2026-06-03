import {
  Users,
  HeartHandshake,
  CalendarDays,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Link } from "react-router-dom";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { LandingHeader } from "@/features/landing/components/LandingHeader";
import { LandingFooter } from "@/features/landing/components/LandingFooter";

import heroImage from "@/assets/images/WhatsApp Image 2026-06-02 at 3.32.07 PM.jpeg";
import gallery1 from "@/assets/images/WhatsApp Image 2026-06-02 at 3.32.03 PM.jpeg";
import gallery2 from "@/assets/images/WhatsApp Image 2026-06-02 at 3.32.04 PM.jpeg";
import gallery3 from "@/assets/images/WhatsApp Image 2026-06-02 at 3.32.05 PM.jpeg";

export default function Inicio() {
  return (
    <>
      <LandingHeader />
      <main className="bg-[var(--background)] text-[var(--foreground)]">

      {/* HERO */}

      <section
        className="relative min-h-screen overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.75)), url(${heroImage})`,
        }}
      >
        <div className="mx-auto flex min-h-screen max-w-7xl items-center px-6">
          <div className="max-w-4xl text-white">
            <span className="inline-flex rounded-full bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] backdrop-blur-md">
              Confirmación Juvenil
            </span>

            <h1 className="mt-8 text-5xl font-black leading-tight md:text-7xl">
              Vive tu fe.
              <br />
              Encuentra tu propósito.
            </h1>

            <p className="mt-8 max-w-2xl text-xl text-white/80">
              Somos una comunidad juvenil que acompaña a los
              jóvenes en su preparación para el Sacramento de la
              Confirmación a través de la amistad, el servicio y
              el encuentro con Cristo.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/contacto">
                <Button className="rounded-full px-8">
                  Inscribirme
                </Button>
              </Link>

              <Link to="/nosotros">
                <Button
                  variant="secondary"
                  className="rounded-full px-8"
                >
                  Conócenos
                </Button>
              </Link>
            </div>

            <div className="mt-14 grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl bg-white/10 p-5 backdrop-blur-md">
                <span className="block text-4xl font-black text-[var(--accent)]">
                  200+
                </span>
                <span className="text-white/70">
                  Jóvenes acompañados
                </span>
              </div>

              <div className="rounded-3xl bg-white/10 p-5 backdrop-blur-md">
                <span className="block text-4xl font-black text-[var(--accent)]">
                  15+
                </span>
                <span className="text-white/70">
                  Catequistas
                </span>
              </div>

              <div className="rounded-3xl bg-white/10 p-5 backdrop-blur-md">
                <span className="block text-4xl font-black text-[var(--accent)]">
                  30+
                </span>
                <span className="text-white/70">
                  Actividades
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

  

      {/* QUIÉNES SOMOS */}

      <section className="bg-[var(--card)] py-24">
  <div className="mx-auto max-w-7xl px-6">

    <div className="mb-16 text-center">
      <span className="inline-flex rounded-full bg-[var(--primary)]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-[var(--primary)]">
        Nuestra Comunidad
      </span>

      <h2 className="mt-6 text-4xl font-black md:text-5xl">
        Más que un grupo juvenil
      </h2>

      <p className="mx-auto mt-6 max-w-3xl text-lg text-[var(--muted-foreground)]">
        Somos una familia que acompaña a los jóvenes en su crecimiento
        humano, espiritual y comunitario para prepararse al Sacramento
        de la Confirmación.
      </p>
    </div>

    <div className="grid gap-8 lg:grid-cols-3">

      <Card className="rounded-3xl p-8">
        <ShieldCheck className="mb-5 h-12 w-12 text-[var(--primary)]" />

        <h3 className="text-2xl font-bold">
          Formación
        </h3>

        <p className="mt-4 text-[var(--muted-foreground)]">
          Catequesis dinámica orientada al crecimiento personal y espiritual.
        </p>
      </Card>

      <Card className="rounded-3xl p-8">
        <Users className="mb-5 h-12 w-12 text-[var(--secondary)]" />

        <h3 className="text-2xl font-bold">
          Comunidad
        </h3>

        <p className="mt-4 text-[var(--muted-foreground)]">
          Construimos amistades auténticas que fortalecen la fe y el servicio.
        </p>
      </Card>

      <Card className="rounded-3xl p-8">
        <HeartHandshake className="mb-5 h-12 w-12 text-[var(--accent)]" />

        <h3 className="text-2xl font-bold">
          Servicio
        </h3>

        <p className="mt-4 text-[var(--muted-foreground)]">
          Vivimos el Evangelio ayudando a quienes más lo necesitan.
        </p>
      </Card>

    </div>
  </div>
</section>

      {/* ACTIVIDADES */}

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">
            <h2 className="text-4xl font-black md:text-5xl">
              Próximas Actividades
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg text-[var(--muted-foreground)]">
              Encuentros diseñados para fortalecer la fe, la amistad y el servicio.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">

            <Card className="rounded-3xl p-8 transition hover:-translate-y-2">
              <CalendarDays className="mb-5 h-12 w-12 text-[var(--primary)]" />

              <h3 className="text-2xl font-bold">
                Retiro Espiritual
              </h3>

              <p className="mt-4 text-[var(--muted-foreground)]">
                Un encuentro profundo con Dios mediante oración,
                reflexión y convivencia.
              </p>
            </Card>

            <Card className="rounded-3xl p-8 transition hover:-translate-y-2">
              <Users className="mb-5 h-12 w-12 text-[var(--secondary)]" />

              <h3 className="text-2xl font-bold">
                Convivencia Juvenil
              </h3>

              <p className="mt-4 text-[var(--muted-foreground)]">
                Actividades recreativas que fortalecen la amistad y el trabajo en equipo.
              </p>
            </Card>

            <Card className="rounded-3xl p-8 transition hover:-translate-y-2">
              <HeartHandshake className="mb-5 h-12 w-12 text-[var(--accent)]" />

              <h3 className="text-2xl font-bold">
                Misión Solidaria
              </h3>

              <p className="mt-4 text-[var(--muted-foreground)]">
                Experiencias de servicio para llevar esperanza a la comunidad.
              </p>
            </Card>

          </div>

        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">

          <div className="text-center">
            <h2 className="text-4xl font-black">
              Conoce Nuestra Comunidad
            </h2>

            <p className="mt-5 text-lg text-[var(--muted-foreground)]">
              Mira algunos momentos de nuestras actividades.
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-[2rem] border border-[var(--border)] shadow-2xl">
            <iframe
              className="aspect-video w-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Video Institucional"
              allowFullScreen
            />
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
            {[gallery1, gallery2, gallery3].map((img, index) => (
              <div key={img} className="group relative overflow-hidden rounded-[2rem] shadow-xl shadow-[rgba(0,0,0,0.08)]">
                <img src={img} alt={`Galería ${index + 1}`} className="h-80 w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                  <p className="text-sm uppercase tracking-[0.2em] text-white/70">Grupo Juvenil</p>
                  <p className="mt-2 text-lg font-semibold">Momentos de fe y amistad.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">

          <div className="overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] p-12 text-center text-white shadow-2xl">

            <Sparkles className="mx-auto h-14 w-14" />

            <h2 className="mt-6 text-4xl font-black md:text-5xl">
              Tu camino comienza aquí
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90">
              Forma parte de una comunidad donde podrás crecer en la fe,
              construir amistades auténticas y descubrir tu propósito.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

              <Link to="/contacto">
                <Button className="rounded-full bg-white px-8 py-3 text-[var(--primary)] hover:bg-white/90">
                  Quiero Inscribirme
                </Button>
              </Link>

              <Link to="/nosotros">
                <Button
                  variant="ghost"
                  className="rounded-full border border-white/30 px-8 py-3 text-white hover:bg-white/10"
                >
                  Conocer Más
                </Button>
              </Link>

            </div>

          </div>

        </div>
      </section>
    </main>
    <LandingFooter />
    </>

  );
}