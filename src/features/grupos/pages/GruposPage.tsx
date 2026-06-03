import { useQuery } from "@tanstack/react-query";
import { AdminResourcePage } from "@/components/AdminResourcePage";
import { listRows } from "@/services/queries";
import { grupoSchema } from "@/features/grupos/schemas/grupoSchema";

export function GruposPage() {
  const { data: catequistasData } = useQuery({
    queryKey: ["catequistas", "select"],
    queryFn: () => listRows("catequistas", ["nombre"], "", 1, 100),
  });

  const catequistaOptions = (catequistasData?.data ?? []).map((catequista) => ({
    label: String(catequista.nombre ?? ""),
    value: String(catequista.id ?? ""),
  }));

  return <AdminResourcePage config={{
    table: "grupos",
    title: "Grupos",
    description: "CRUD de grupos y asignación de catequista a cargo.",
    icon: "groups",
    validationSchema: grupoSchema,
    searchFields: ["nombre", "descripcion"],
    columns: [{ key: "nombre", label: "Nombre" }, { key: "capacidad", label: "Capacidad" }, { key: "catequista_id", label: "Catequista a cargo" }],
    fields: [
      { key: "nombre", label: "Nombre", required: true },
      { key: "descripcion", label: "Descripcion", type: "textarea" },
      { key: "catequista_id", label: "Catequista a cargo", type: "select", options: catequistaOptions, required: true },
      { key: "nivel", label: "", type: "hidden" },
      { key: "capacidad", label: "Capacidad", type: "number", required: true },
    ],
  }} />;
}
