import { createRow } from "@/services/mutations";
import { listRows } from "@/services/queries";

export const asistenciasService = {
  list: (search = "") => listRows("asistencias", ["fecha", "estado"], search),
  register: (values: Record<string, unknown>) => createRow("asistencias", values),
};
