import { AdminResourcePage } from "@/components/AdminResourcePage";

export function InventarioPage() {
  return <AdminResourcePage config={{
    table: "inventario",
    title: "Inventario",
    description: "Gestion de bienes, kardex, historial y movimientos.",
    icon: "boxes",
    searchFields: ["codigo", "nombre", "categoria", "ubicacion"],
    columns: [{ key: "codigo", label: "Codigo" }, { key: "nombre", label: "Nombre" }, { key: "categoria", label: "Categoria" }, { key: "cantidad", label: "Cantidad" }, { key: "estado", label: "Estado" }],
    fields: [
      { key: "codigo", label: "Codigo", required: true },
      { key: "nombre", label: "Nombre", required: true },
      { key: "categoria", label: "Categoria", type: "select", options: ["Biblias", "Sillas", "Mesas", "Equipos de Sonido", "Material Catequetico", "Proyectores", "Decoraciones", "Otros"], required: true },
      { key: "cantidad", label: "Cantidad", type: "number", required: true },
      { key: "estado", label: "Estado", type: "select", options: ["Disponible", "Prestado", "Danado", "Perdido"], required: true },
      { key: "ubicacion", label: "Ubicacion" },
      { key: "fecha_compra", label: "Fecha de compra", type: "date" },
      { key: "observaciones", label: "Observaciones", type: "textarea" },
    ],
  }} />;
}
