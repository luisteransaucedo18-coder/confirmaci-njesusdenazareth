import { Search } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/Input";
import { searchEverywhere } from "@/services/queries";

export function GlobalSearch() {
  const [term, setTerm] = useState("");
  const { data = [] } = useQuery({
    queryKey: ["global-search", term],
    queryFn: () => searchEverywhere(term),
    enabled: term.trim().length > 2,
  });

  return (
    <div className="relative w-full max-w-xl">
      <Search className="pointer-events-none absolute left-3 top-2.5 h-5 w-5 text-[var(--muted-foreground)]" />
      <Input value={term} onChange={(event) => setTerm(event.target.value)} placeholder="Buscar confirmantes, inventario, eventos..." className="pl-10" />
      {term.length > 2 && data.length > 0 ? (
        <div className="absolute z-30 mt-2 max-h-80 w-full overflow-auto rounded-lg border border-[var(--border)] bg-[var(--card)] shadow-xl">
          {data.map((item) => (
            <a key={`${item.type}-${item.id}`} href={item.href} className="block border-b border-[var(--border)] px-4 py-3 last:border-b-0 hover:bg-[var(--muted)]">
              <p className="text-sm font-semibold">{item.title}</p>
              <p className="text-xs text-[var(--muted-foreground)]">{item.type}</p>
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
