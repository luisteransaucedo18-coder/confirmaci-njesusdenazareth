import { AdminResourcePage } from "@/components/AdminResourcePage";

export function ConfirmantesPage() {
  return <AdminResourcePage config={{
    table: "confirmantes",
    title: "Confirmantes",
    description: "CRUD completo con busqueda, filtros, paginacion, detalle y exportaciones.",
    icon: "users",
    searchFields: ["nombres", "apellidos", "dni", "correo"],
    columns: [{ key: "nombres", label: "Nombres" }, { key: "apellidos", label: "Apellidos" }, { key: "dni", label: "DNI" }, { key: "telefono", label: "Telefono" }, { key: "estado", label: "Estado" }],
    fields: [
      { key: "nombres", label: "Nombres", required: true },
      { key: "apellidos", label: "Apellidos", required: true },
      { key: "dni", label: "DNI", required: true },
      { key: "fecha_nacimiento", label: "Fecha de nacimiento", type: "date", required: true },
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
