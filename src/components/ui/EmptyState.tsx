import { Inbox } from "lucide-react";

export function EmptyState({ title = "Sin resultados", message = "Ajusta los filtros o registra un nuevo elemento." }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-[var(--border)] p-10 text-center">
      <Inbox className="mb-3 h-10 w-10 text-[var(--muted-foreground)]" />
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-1 max-w-md text-sm text-[var(--muted-foreground)]">{message}</p>
    </div>
  );
}
