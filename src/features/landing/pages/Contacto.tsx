import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
} from "lucide-react";

import { type FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { createRow } from "@/services/mutations";
import { getContactSettings } from "@/features/landing/services/landingService";
import { LandingFooter } from "@/features/landing/components/LandingFooter";
import { LandingHeader } from "@/features/landing/components/LandingHeader";

export default function Contacto() {
  const { data: contactSettings = {} as {
    email?: string;
    phone?: string;
    address?: string;
  } } = useQuery({
    queryKey: ["landingContactSettings"],
    queryFn: getContactSettings,
  });

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    try {
      const form = new FormData(event.currentTarget);

      await createRow(
        "contactos",
        Object.fromEntries(form.entries())
      );

      event.currentTarget.reset();

      toast.success("Mensaje enviado correctamente");
    } catch {
      toast.error("No se pudo enviar el mensaje");
    }
  }

  return (
    <>
      <LandingHeader />
      <main className="min-h-screen bg-[var(--background)] pt-24">
      {/* HERO */}

      <section className="bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 py-28 text-white">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <Mail className="mx-auto mb-6 h-16 w-16 text-yellow-400" />

          <h1 className="text-5xl font-black md:text-7xl">
            Contacto
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-xl text-slate-300">
            Estamos para ayudarte. Ponte en contacto con
            nuestro equipo para resolver dudas sobre el
            proceso de confirmación o las actividades del
            grupo juvenil.
          </p>
        </div>
      </section>

      {/* INFORMACIÓN */}

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-3">
            <Card>
              <Phone className="mb-4 h-10 w-10 text-[var(--primary)]" />

              <h3 className="mb-2 text-xl font-bold">
                Teléfono
              </h3>

              <p className="text-[var(--muted-foreground)]">
                {contactSettings.phone ?? "+51 999 999 999"}
              </p>
            </Card>

            <Card>
              <Mail className="mb-4 h-10 w-10 text-[var(--primary)]" />

              <h3 className="mb-2 text-xl font-bold">
                Correo
              </h3>

              <p className="text-[var(--muted-foreground)]">
                {contactSettings.email ?? "contacto@jesusdenazareth.pe"}
              </p>
            </Card>

            <Card>
              <MapPin className="mb-4 h-10 w-10 text-[var(--primary)]" />

              <h3 className="mb-2 text-xl font-bold">
                Ubicación
              </h3>

              <p className="text-[var(--muted-foreground)]">
                {contactSettings.address ?? "Parroquia Jesús de Nazareth"}
                <br />
                Trujillo - Perú
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* FORMULARIO */}

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <Card>
              <h2 className="mb-6 text-3xl font-black">
                Envíanos un mensaje
              </h2>

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <Input
                  name="nombre"
                  placeholder="Nombre completo"
                  required
                />

                <Input
                  name="correo"
                  type="email"
                  placeholder="Correo electrónico"
                  required
                />

                <Input
                  name="telefono"
                  placeholder="Teléfono"
                />

                <Textarea
                  name="mensaje"
                  placeholder="Escribe tu mensaje..."
                  required
                />

                <Button>
                  <Send className="h-4 w-4" />
                  Enviar mensaje
                </Button>
              </form>
            </Card>

            <div className="space-y-6">
              <Card>
                <Clock className="mb-4 h-10 w-10 text-[var(--primary)]" />

                <h3 className="mb-3 text-2xl font-bold">
                  Horarios de Atención
                </h3>

                <div className="space-y-2 text-[var(--muted-foreground)]">
                  <p>
                    Lunes - Viernes:
                    <strong className="ml-2">
                      6:00 PM - 9:00 PM
                    </strong>
                  </p>

                  <p>
                    Sábados:
                    <strong className="ml-2">
                      3:00 PM - 7:00 PM
                    </strong>
                  </p>

                  <p>
                    Domingos:
                    <strong className="ml-2">
                      Actividades Especiales
                    </strong>
                  </p>
                </div>
              </Card>

              <Card>
                <h3 className="mb-4 text-2xl font-bold">
                  Redes Sociales
                </h3>

                <div className="space-y-3">
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="block text-[var(--primary)] hover:underline"
                  >
                    Instagram
                  </a>

                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="block text-[var(--primary)] hover:underline"
                  >
                    Facebook
                  </a>

                  <a
                    href="https://www.youtube.com"
                    target="_blank"
                    rel="noreferrer"
                    className="block text-[var(--primary)] hover:underline"
                  >
                    YouTube
                  </a>
                </div>
              </Card>

              <Card>
                <h3 className="mb-4 text-2xl font-bold">
                  Información General
                </h3>

                <p className="text-[var(--muted-foreground)]">
                  Si deseas iniciar tu proceso de confirmación
                  o conocer más sobre nuestras actividades,
                  puedes comunicarte con nosotros mediante este
                  formulario o visitarnos en la parroquia.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* MAPA */}

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <Card className="overflow-hidden p-0">
            <iframe
              title="Mapa"
              src="https://www.google.com/maps?q=Trujillo,Peru&output=embed"
              width="100%"
              height="450"
              loading="lazy"
              className="border-0"
            />
          </Card>
        </div>
      </section>
    </main>
    <LandingFooter />
    </>
  );
}