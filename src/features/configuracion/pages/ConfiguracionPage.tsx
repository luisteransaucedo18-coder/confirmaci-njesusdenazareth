import { AdminResourcePage } from "@/components/AdminResourcePage";

export function ConfiguracionPage() {
  return <AdminResourcePage config={{
    table: "configuracion",
    title: "Configuracion",
    description: "Logo, nombre de parroquia, redes sociales y datos de contacto.",
    icon: "settings",
    canCreate: ["admin"],
    canEdit: ["admin"],
    canDelete: ["admin"],
    searchFields: ["clave", "valor"],
    columns: [{ key: "clave", label: "Clave" }, { key: "valor", label: "Valor" }],
    fields: [
      { key: "clave", label: "Clave", required: true },
      { key: "valor", label: "Valor", required: true },
      { key: "descripcion", label: "Descripcion", type: "textarea" },
    ],
  }} />;
}
