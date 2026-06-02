import { AdminResourcePage } from "@/components/AdminResourcePage";

export function GruposPage() {
  return <AdminResourcePage config={{
    table: "grupos",
    title: "Grupos",
    description: "CRUD de grupos, niveles, capacidad y asignacion de miembros.",
    icon: "groups",
    searchFields: ["nombre", "descripcion", "nivel"],
    columns: [{ key: "nombre", label: "Nombre" }, { key: "nivel", label: "Nivel" }, { key: "capacidad", label: "Capacidad" }, { key: "catequista_id", label: "Catequista" }],
    fields: [
      { key: "nombre", label: "Nombre", required: true },
      { key: "descripcion", label: "Descripcion", type: "textarea" },
      { key: "nivel", label: "Nivel", required: true },
      { key: "catequista_id", label: "Catequista ID" },
      { key: "capacidad", label: "Capacidad", type: "number", required: true },
    ],
  }} />;
}
