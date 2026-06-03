import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn, Mail } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { loginSchema, type LoginValues } from "@/features/auth/schemas/authSchema";
import { resetPassword, signIn } from "@/features/auth/services/auth";
import loginBg from "@/assets/images/WhatsApp Image 2026-06-02 at 3.32.02 PM.jpeg";
import logoImage from "@/assets/images/Logo.jpg";

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState, getValues } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: LoginValues) {
    try {
      await signIn(values.email, values.password);
      toast.success("Sesion iniciada");
      navigate("/app");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "No se pudo iniciar sesion");
    }
  }

  async function onReset() {
    const email = getValues("email");
    if (!email) return toast.warning("Escribe tu correo primero");
    await resetPassword(email);
    toast.success("Correo de recuperacion enviado");
  }

  return (
    <main className="grid min-h-screen bg-[var(--background)] lg:grid-cols-[1fr_440px]">
      <section className="hidden relative overflow-hidden lg:flex lg:flex-col lg:justify-between">
        <img src={loginBg} alt="Fondo confirmacion" className="absolute inset-0 h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-[var(--secondary)]/80" />
        <div className="relative z-10 flex h-full flex-col justify-between p-12 text-[var(--on-primary)]">
          <Link to="/" className="text-lg font-bold">Jesus de Nazareth</Link>
          <div>
            <p className="mb-4 text-sm uppercase tracking-widest text-[var(--background)]">Confirmacion Juvenil</p>
            <h1 className="max-w-2xl text-5xl font-black leading-tight">Gestion pastoral con orden, datos claros y acompanamiento cercano.</h1>
          </div>
          <p className="text-sm text-[var(--background)]">Parroquia Jesus de Nazareth, Trujillo, Peru</p>
        </div>
      </section>
      <section className="flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <div className="mb-6 flex items-center gap-3">
            <img src={logoImage} alt="Logo Jesus de Nazareth" className="h-12 w-12 rounded-full object-cover" />
            <div>
              <h1 className="text-2xl font-bold">Iniciar sesion</h1>
              <p className="text-sm text-[var(--muted-foreground)]">Accede al panel administrativo.</p>
            </div>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <label className="block text-sm font-medium">
              Correo
              <Input className="mt-1" type="email" {...register("email")} />
              <span className="text-xs text-[var(--primary)]">{formState.errors.email?.message}</span>
            </label>
            <label className="block text-sm font-medium">
              Contrasena
              <div className="relative mt-1">
                <Input className="pr-10" type={showPassword ? "text" : "password"} {...register("password")} />
                <button
                  type="button"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <span className="text-xs text-[var(--primary)]">{formState.errors.password?.message}</span>
            </label>
            <Button className="w-full" type="submit" disabled={formState.isSubmitting}>
              <LogIn className="h-4 w-4" /> Entrar
            </Button>
            <Button type="button" variant="ghost" className="w-full" onClick={onReset}>
              <Mail className="h-4 w-4" /> Recuperar contrasena
            </Button>
          </form>
        </Card>
      </section>
    </main>
  );
}
