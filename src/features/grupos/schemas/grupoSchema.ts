import { z } from "zod";

export const grupoSchema = z.object({
  nombre: z.string().min(2, "El nombre es obligatorio"),
  descripcion: z.string().optional(),
  nivel: z.string().optional(),
  catequista_id: z.string().uuid().optional().or(z.literal("")),
  capacidad: z.coerce.number().int().positive("La capacidad debe ser un número positivo"),
});
