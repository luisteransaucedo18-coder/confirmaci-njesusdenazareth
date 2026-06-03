import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  AtSign,
  Globe,
  PlayCircle,
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
import contactBackground from "@/assets/images/contacto-background.jpeg";

export default function Contacto() {
  const { data: contactSettings = {} as {
    email?: string;
    phone?: string;
    address?: string;
  } } = useQuery({
    queryKey: ["landingContactSettings"],
    queryFn: getContactSettings,
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
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
      <main className="bg-[var(--background)] text-[var(--foreground)]">

        {/* HERO (Consistencia de marca con tipografía gigante y blur adaptativo) */}
        <section
          className="relative min-h-screen overflow-hidden bg-cover bg-center flex items-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.75)), url(${contactBackground})`,
          }}
        >
          <div className="mx-auto flex w-full max-w-7xl items-center px-6 py-24">
            <div className="max-w-4xl text-white">
              <span className="inline-flex rounded-full bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] backdrop-blur-md">
                Contacto
              </span>

              <h1 className="mt-8 text-5xl font-black leading-tight md:text-7xl">
                Estamos aquí
                <br />
                para escucharte.
              </h1>

              <p className="mt-8 max-w-2xl text-xl text-white/80">
                Ponte en contacto con nuestro equipo para resolver dudas sobre el
                proceso de confirmación o las actividades del grupo juvenil.
              </p>
            </div>
          </div>
        </section>

        {/* TARJETAS RÁPIDAS DE INFORMACIÓN */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

              <Card className="rounded-3xl p-8 text-center transition hover:-translate-y-2 border border-[var(--border)] shadow-xl shadow-[rgba(0,0,0,0.01)]">
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--primary)]/10">
                  <Phone className="h-6 w-6 text-[var(--primary)]" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Teléfono</h3>
                <p className="text-[var(--muted-foreground)] font-medium">
                  {contactSettings.phone ?? "+51 999 999 999"}
                </p>
              </Card>

              <Card className="rounded-3xl p-8 text-center transition hover:-translate-y-2 border border-[var(--border)] shadow-xl shadow-[rgba(0,0,0,0.01)]">
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--secondary)]/10">
                  <Mail className="h-6 w-6 text-[var(--secondary)]" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Correo</h3>
                <p className="break-words text-[var(--muted-foreground)] font-medium">
                  {contactSettings.email ?? "contacto@jesusdenazareth.pe"}
                </p>
              </Card>

              <Card className="rounded-3xl p-8 text-center transition hover:-translate-y-2 border border-[var(--border)] shadow-xl shadow-[rgba(0,0,0,0.01)]">
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)]/10">
                  <MapPin className="h-6 w-6 text-[var(--accent)]" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Ubicación</h3>
                <p className="text-[var(--muted-foreground)] font-medium leading-relaxed">
                  {contactSettings.address ?? "Parroquia Jesús de Nazareth"}
                  <br />
                  Trujillo — Perú
                </p>
              </Card>

            </div>
          </div>
        </section>

        {/* SECCIÓN DOBLE: FORMULARIO + DETALLES INTERNOS */}
        <section className="bg-[var(--card)] py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-2 items-start">
              
              {/* Formulario Estilizado */}
              <Card className="rounded-[2.5rem] bg-[var(--background)] p-10 border border-[var(--border)] shadow-2xl shadow-[rgba(0,0,0,0.02)]">
                <h2 className="mb-2 text-3xl font-black">Envíanos un mensaje</h2>
                <p className="mb-8 text-sm text-[var(--muted-foreground)]">Escríbenos y te responderemos a la brevedad posible.</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <Input
                    name="nombre"
                    placeholder="Nombre completo"
                    className="rounded-xl px-5 py-6 border-[var(--border)]"
                    required
                  />

                  <Input
                    name="correo"
                    type="email"
                    placeholder="Correo electrónico"
                    className="rounded-xl px-5 py-6 border-[var(--border)]"
                    required
                  />

                  <Input
                    name="telefono"
                    placeholder="Teléfono (opcional)"
                    className="rounded-xl px-5 py-6 border-[var(--border)]"
                  />

                  <Textarea
                    name="mensaje"
                    placeholder="Escribe tu mensaje aquí..."
                    className="min-h-[140px] rounded-xl p-5 border-[var(--border)] resize-none"
                    required
                  />

                  <Button className="w-full sm:w-auto rounded-full px-8 py-6 font-bold shadow-lg gap-2 transition hover:opacity-90">
                    <Send className="h-4 w-4" />
                    Enviar mensaje
                  </Button>
                </form>
              </Card>

              {/* Paneles Informativos de Soporte */}
              <div className="space-y-6">
                
                {/* Horarios */}
                <Card className="rounded-3xl p-8 border border-[var(--border)]">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)]/10">
                      <Clock className="h-5 w-5 text-[var(--primary)]" />
                    </div>
                    <h3 className="text-2xl font-bold">Horarios de Atención</h3>
                  </div>

                  <div className="space-y-4 text-[var(--muted-foreground)] font-medium">
                    <div className="flex justify-between border-b border-[var(--border)] pb-3">
                      <span>Lunes a Viernes</span>
                      <span className="text-[var(--foreground)] font-bold">6:00 PM - 9:00 PM</span>
                    </div>
                    <div className="flex justify-between border-b border-[var(--border)] pb-3">
                      <span>Sábados</span>
                      <span className="text-[var(--foreground)] font-bold">3:00 PM - 7:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Domingos</span>
                      <span className="text-[var(--secondary)] font-bold">Actividades Especiales</span>
                    </div>
                  </div>
                </Card>

                {/* Redes Sociales Rediseñadas con Íconos */}
                <Card className="rounded-3xl p-8 border border-[var(--border)]">
                  <h3 className="mb-6 text-2xl font-bold">Nuestras Redes</h3>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <a
                      href="https://www.instagram.com"
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-col items-center gap-2 rounded-2xl bg-[var(--background)] p-4 text-center transition hover:text-[var(--primary)] border border-[var(--border)]"
                    >
                      <AtSign className="h-5 w-5" />
                      <span className="text-xs font-bold">Instagram</span>
                    </a>

                    <a
                      href="https://www.facebook.com"
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-col items-center gap-2 rounded-2xl bg-[var(--background)] p-4 text-center transition hover:text-[var(--primary)] border border-[var(--border)]"
                    >
                      <Globe className="h-5 w-5" />
                      <span className="text-xs font-bold">Facebook</span>
                    </a>

                    <a
                      href="https://www.youtube.com"
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-col items-center gap-2 rounded-2xl bg-[var(--background)] p-4 text-center transition hover:text-[var(--primary)] border border-[var(--border)]"
                    >
                      <PlayCircle className="h-5 w-5" />
                      <span className="text-xs font-bold">YouTube</span>
                    </a>
                  </div>
                </Card>

                {/* Info General */}
                <Card className="rounded-3xl p-8 border border-[var(--border)]">
                  <h3 className="mb-3 text-2xl font-bold">Información General</h3>
                  <p className="text-[var(--muted-foreground)] leading-relaxed font-medium">
                    Si deseas iniciar tu proceso de confirmación o conocer más sobre nuestras actividades, 
                    puedes comunicarte con nosotros mediante este formulario o visitarnos directamente en las oficinas de la parroquia.
                  </p>
                </Card>

              </div>
            </div>
          </div>
        </section>

        {/* MAPA FULL-WIDTH ENMARCADO */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-black">¿Cómo llegar?</h2>
              <p className="mt-4 text-[var(--muted-foreground)]">Te esperamos en nuestra sede comunitaria</p>
            </div>
            <Card className="overflow-hidden rounded-[2.5rem] p-0 border border-[var(--border)] shadow-2xl">
              <iframe
                title="Mapa"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d246.87011966896713!2d-79.0417799!3d-8.1094335!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91ad3d989e64fd3b%3A0xe13e656f38332a8b!2sParroquia%20Jes%C3%BAs%20de%20Nazaret%20-%20Arzobispado%20Metropolitano%20de%20Trujillo!5e0!3m2!1sen!2spe!4v1780438956520!5m2!1sen!2spe"
                className="h-[550px] w-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Card>
          </div>
        </section>

      </main>
      <LandingFooter />
    </>
  );
}