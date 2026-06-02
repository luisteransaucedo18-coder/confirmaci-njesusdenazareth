import { createRow, deleteRow, updateRow } from "@/services/mutations";
import { listRows } from "@/services/queries";

export const inventarioService = {
  list: (search = "") => listRows("inventario", ["codigo", "nombre", "categoria"], search),
  create: (values: Record<string, unknown>) => createRow("inventario", values),
  update: (id: string, values: Record<string, unknown>) => updateRow("inventario", id, values),
  remove: (id: string) => deleteRow("inventario", id),
};
