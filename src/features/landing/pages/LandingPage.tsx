import { CalendarDays, HeartHandshake, Mail } from "lucide-react";
import { type FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input, Textarea } from "@/components/ui/Input";
import { createRow } from "@/services/mutations";
import heroImage from "@/assets/images/WhatsApp Image 2026-06-02 at 3.32.07 PM.jpeg";
import gallery1 from "@/assets/images/WhatsApp Image 2026-06-02 at 3.32.03 PM.jpeg";
import gallery2 from "@/assets/images/WhatsApp Image 2026-06-02 at 3.32.04 PM.jpeg";
import gallery3 from "@/assets/images/WhatsApp Image 2026-06-02 at 3.32.05 PM.jpeg";
import gallery4 from "@/assets/images/WhatsApp Image 2026-06-02 at 3.32.06 PM.jpeg";

const nav = ["Inicio", "Nosotros", "Catequesis", "Actividades", "Galeria", "Contacto"];

export function LandingPage() {
  const slides = [heroImage, gallery1, gallery2, gallery3];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, [slides.length]);

  async function contact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    await createRow("contactos", Object.fromEntries(form.entries()));
    event.currentTarget.reset();
    toast.success("Mensaje enviado");
  }

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <nav className="fixed inset-x-0 top-0 z-40 border-b border-transparent bg-[var(--secondary)]/95 px-5 py-3 text-white backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-5">
          <a href="#inicio" className="text-base font-black">Jesus de Nazareth</a>
          <div className="ml-auto hidden gap-5 text-sm md:flex">
            {nav.map((item) => <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}
          </div>
          <Link to="/login" className="rounded-md bg-[var(--primary)] px-3 py-2 text-sm font-semibold text-[var(--on-primary)] shadow-sm shadow-[var(--primary)]/20 transition hover:opacity-90">Iniciar Sesion</Link>
        </div>
      </nav>
      <section
        id="inicio"
        className="relative min-h-[92vh] bg-cover bg-center px-5 pt-24 text-white"
        style={{ backgroundImage: `linear-gradient(rgba(15,23,42,.76),rgba(15,23,42,.86)), url(${slides[activeIndex]})` }}
      >
        <div className="absolute inset-0 bg-slate-950/40" />
        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_420px]">
          <div className="flex min-h-[72vh] flex-col justify-center">
            <h1 className="max-w-3xl text-5xl font-black leading-tight md:text-7xl">Grupo de Confirmacion Juvenil</h1>
            <p className="mt-5 max-w-2xl text-xl text-slate-200">Creciendo en la fe, formando lideres para Cristo.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/login" className="inline-flex items-center rounded-md bg-[var(--primary)] px-3 py-2 text-sm font-semibold text-[var(--on-primary)] shadow-lg shadow-[var(--primary)]/20 transition hover:opacity-90">
                Iniciar Sesion
              </Link>
              <a href="#nosotros"><Button variant="secondary"><HeartHandshake className="h-4 w-4" /> Conocer Mas</Button></a>
            </div>
          </div>
        </div>
        <div className="relative mx-auto mt-10 flex max-w-7xl justify-center gap-2 text-white">
          {slides.map((_, index) => (
            <span key={index} className={`h-2.5 w-2.5 rounded-full transition ${index === activeIndex ? "bg-white" : "bg-white/40"}`} />
          ))}
        </div>
      </section>
      <section id="nosotros" className="px-5 py-16">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {[
            ["Sobre Nosotros", "Acompanamos a jovenes en su proceso de confirmacion con formacion humana, espiritual y comunitaria."],
            ["Mision", "Formar discipulos comprometidos con Cristo y con la vida parroquial."],
            ["Vision", "Ser una comunidad juvenil organizada, alegre y activa al servicio de la Iglesia."],
          ].map(([title, text]) => <Card key={title}><h2 className="text-xl font-bold">{title}</h2><p className="mt-2 text-sm text-[var(--muted-foreground)]">{text}</p></Card>)}
        </div>
      </section>
      <section id="catequesis" className="bg-[var(--card)] px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-black">Valores y cronograma</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-4">
            {["Fe", "Servicio", "Comunidad", "Responsabilidad"].map((item) => <Card key={item}><HeartHandshake className="mb-3 h-6 w-6 text-[var(--accent)]" /><h3 className="font-bold">{item}</h3></Card>)}
          </div>
        </div>
      </section>
      <section id="actividades" className="px-5 py-16">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {["Retiros", "Convivencias", "Actividades Parroquiales"].map((item) => <Card key={item}><CalendarDays className="mb-3 h-6 w-6 text-[var(--secondary)]" /><h3 className="font-bold">{item}</h3><p className="mt-2 text-sm text-[var(--muted-foreground)]">Programacion conectable al modulo de eventos.</p></Card>)}
        </div>
      </section>
      <section id="galeria" className="bg-[var(--card)] px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-black">Galeria</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {[gallery1, gallery2, gallery3, gallery4].map((src, index) => (
              <div key={src} className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--background)] shadow-sm">
                <img src={src} alt={`Galeria ${index + 1}`} className="h-56 w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="contacto" className="px-5 py-16">
        <form onSubmit={contact} className="mx-auto max-w-2xl space-y-4">
          <h2 className="text-3xl font-black">Contacto</h2>
          <Input name="nombre" placeholder="Nombre" required />
          <Input name="correo" type="email" placeholder="Correo" required />
          <Textarea name="mensaje" placeholder="Mensaje" required />
          <Button><Mail className="h-4 w-4" /> Enviar</Button>
        </form>
      </section>
    </main>
  );
}
