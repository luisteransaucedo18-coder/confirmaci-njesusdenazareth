import { supabase } from "@/lib/supabase";
import { createRow, createRows } from "@/services/mutations";
import { listRows } from "@/services/queries";

export const asistenciasService = {
  list: (search = "") => listRows("asistencias", ["fecha", "estado"], search),
  register: (values: Record<string, unknown>) => createRow("asistencias", values),
  registerBatch: (values: Record<string, unknown>[]) => createRows("asistencias", values),
  getGroups: () => listRows("grupos", ["nombre"], "", 1, 100),
  getAllConfirmantes: async () => {
    const { data, error } = await supabase
      .from("confirmantes")
      .select("id,nombres,apellidos,dni,grupo_id")
      .order("nombres", { ascending: true });

    if (error) throw error;
    return data ?? [];
  },
};
