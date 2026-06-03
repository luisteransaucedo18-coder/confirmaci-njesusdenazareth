import { useQuery } from "@tanstack/react-query";
import { AdminResourcePage } from "@/components/AdminResourcePage";
import { confirmanteSchema } from "@/features/confirmantes/schemas/confirmanteSchema";
import { listRows } from "@/services/queries";

export function ConfirmantesPage() {
  const { data: groupsData } = useQuery({
    queryKey: ["grupos", "select"],
    queryFn: () => listRows("grupos", ["nombre"], "", 1, 100),
  });

  const groupOptions = (groupsData?.data ?? []).map((group) => ({
    label: String(group.nombre ?? ""),
    value: String(group.id ?? ""),
  }));

  return <AdminResourcePage config={{
    table: "confirmantes",
    title: "Confirmantes",
    description: "CRUD completo con busqueda, filtros, paginacion, detalle y exportaciones.",
    icon: "users",
    validationSchema: confirmanteSchema,
    canCreate: ["admin", "coordinador"],
    canEdit: ["admin", "coordinador"],
    canDelete: ["admin", "coordinador"],
    searchFields: ["nombres", "apellidos", "dni", "correo"],
    columns: [{ key: "nombres", label: "Nombres" }, { key: "apellidos", label: "Apellidos" }, { key: "dni", label: "DNI" }, { key: "grupo_id", label: "Grupo" }, { key: "telefono", label: "Telefono" }, { key: "estado", label: "Estado" }],
    fields: [
      { key: "nombres", label: "Nombres", required: true },
      { key: "apellidos", label: "Apellidos", required: true },
      { key: "dni", label: "DNI", required: true },
      { key: "fecha_nacimiento", label: "Fecha de nacimiento", type: "date", required: true },
      { key: "grupo_id", label: "Grupo", type: "select", options: groupOptions, required: true },
      { key: "direccion", label: "Direccion" },
      { key: "telefono", label: "Telefono" },
      { key: "correo", label: "Correo", type: "email" },
      { key: "colegio", label: "Colegio" },
      { key: "nombre_padre", label: "Nombre del padre" },
      { key: "nombre_madre", label: "Nombre de la madre" },
      { key: "estado", label: "Estado", type: "select", options: ["Activo", "Inactivo", "Retirado"], required: true },
    ],
  }} />;
}
