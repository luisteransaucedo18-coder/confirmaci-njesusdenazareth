import { createRow, deleteRow, updateRow } from "@/services/mutations";
import { listRows } from "@/services/queries";

export const confirmantesService = {
  list: (search = "") => listRows("confirmantes", ["nombres", "apellidos", "dni"], search),
  create: (values: Record<string, unknown>) => createRow("confirmantes", values),
  update: (id: string, values: Record<string, unknown>) => updateRow("confirmantes", id, values),
  remove: (id: string) => deleteRow("confirmantes", id),
};
