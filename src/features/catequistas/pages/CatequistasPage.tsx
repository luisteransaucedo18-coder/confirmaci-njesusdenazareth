import { AdminResourcePage } from "@/components/AdminResourcePage";

export function CatequistasPage() {
  return <AdminResourcePage config={{
    table: "catequistas",
    title: "Catequistas",
    description: "Administracion de catequistas y asignacion por grupo.",
    icon: "user",
    searchFields: ["nombre", "correo", "telefono"],
    columns: [{ key: "nombre", label: "Nombre" }, { key: "correo", label: "Correo" }, { key: "telefono", label: "Telefono" }, { key: "rol", label: "Rol" }],
    fields: [
      { key: "nombre", label: "Nombre", required: true },
      { key: "correo", label: "Correo", type: "email", required: true },
      { key: "telefono", label: "Telefono" },
      { key: "grupo_id", label: "Grupo ID" },
      { key: "rol", label: "Rol", type: "select", options: ["admin", "coordinador", "catequista"], required: true },
    ],
  }} />;
}
