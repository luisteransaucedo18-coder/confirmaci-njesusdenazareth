import { AdminResourcePage } from "@/components/AdminResourcePage";

export function EventosPage() {
  return <AdminResourcePage config={{
    table: "eventos",
    title: "Eventos",
    description: "Retiros, convivencias, campanas y actividades parroquiales.",
    icon: "calendar",
    searchFields: ["nombre", "descripcion", "lugar", "responsable"],
    columns: [{ key: "nombre", label: "Nombre" }, { key: "tipo", label: "Tipo" }, { key: "fecha", label: "Fecha" }, { key: "hora", label: "Hora" }, { key: "lugar", label: "Lugar" }],
    fields: [
      { key: "nombre", label: "Nombre", required: true },
      { key: "descripcion", label: "Descripcion", type: "textarea" },
      { key: "fecha", label: "Fecha", type: "date", required: true },
      { key: "hora", label: "Hora", type: "time", required: true },
      { key: "lugar", label: "Lugar", required: true },
      { key: "responsable", label: "Responsable" },
      { key: "tipo", label: "Tipo", type: "select", options: ["Retiro", "Convivencia", "Campana", "Actividad Parroquial"], required: true },
    ],
  }} />;
}
