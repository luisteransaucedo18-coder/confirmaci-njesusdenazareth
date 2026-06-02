import { useQuery } from "@tanstack/react-query";
import { listRows } from "@/services/queries";

export function useConfirmantes(search = "") {
  return useQuery({
    queryKey: ["confirmantes", search],
    queryFn: () => listRows("confirmantes", ["nombres", "apellidos", "dni"], search, 1, 50),
  });
}
