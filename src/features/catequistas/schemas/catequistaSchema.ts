import { z } from "zod";

export const catequistaSchema = z.object({
  nombre: z.string().min(2, "El nombre es obligatorio"),
  correo: z.string().email("Correo inválido"),
  telefono: z.string().optional().or(z.literal("")),
  rol: z.enum(["admin", "coordinador", "catequista"], "Rol inválido"),
});

export type CatequistaValues = z.infer<typeof catequistaSchema>;
