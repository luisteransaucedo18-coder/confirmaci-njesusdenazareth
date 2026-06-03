import { AdminResourcePage } from "@/components/AdminResourcePage";
import { catequistaSchema } from "@/features/catequistas/schemas/catequistaSchema";

export function CatequistasPage() {
  return <AdminResourcePage config={{
    table: "catequistas",
    title: "Catequistas",
    description: "Administracion de catequistas.",
    icon: "user",
    validationSchema: catequistaSchema,
    searchFields: ["nombre", "correo", "telefono"],
    columns: [{ key: "nombre", label: "Nombre" }, { key: "correo", label: "Correo" }, { key: "telefono", label: "Telefono" }, { key: "rol", label: "Rol" }],
    fields: [
      { key: "nombre", label: "Nombre", required: true },
      { key: "correo", label: "Correo", type: "email", required: true },
      { key: "telefono", label: "Telefono" },
      { key: "rol", label: "Rol", type: "select", options: ["admin", "coordinador", "catequista"], required: true },
    ],
  }} />;
}
