import { z } from "zod";

export const confirmanteSchema = z.object({
  nombres: z.string().min(2),
  apellidos: z.string().min(2),
  dni: z.string().min(8).max(12),
  fecha_nacimiento: z.string(),
  grupo_id: z.string().uuid("Selecciona un grupo"),
  direccion: z.string().optional(),
  telefono: z.string().optional(),
  correo: z.string().email().optional().or(z.literal("")),
  colegio: z.string().optional(),
  nombre_padre: z.string().optional(),
  nombre_madre: z.string().optional(),
  estado: z.enum(["Activo", "Inactivo", "Retirado"]),
});
