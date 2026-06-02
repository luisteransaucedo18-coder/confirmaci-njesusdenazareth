import { useQuery } from "@tanstack/react-query";
import { listRows } from "@/services/queries";

export function useAsistencias(search = "") {
  return useQuery({
    queryKey: ["asistencias", search],
    queryFn: () => listRows("asistencias", ["fecha", "estado"], search, 1, 50),
  });
}
