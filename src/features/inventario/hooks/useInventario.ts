import { useQuery } from "@tanstack/react-query";
import { listRows } from "@/services/queries";

export function useInventario(search = "") {
  return useQuery({
    queryKey: ["inventario", search],
    queryFn: () => listRows("inventario", ["codigo", "nombre", "categoria"], search, 1, 50),
  });
}
