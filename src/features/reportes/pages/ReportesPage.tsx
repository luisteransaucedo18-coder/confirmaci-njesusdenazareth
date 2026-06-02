import { Download, FileText } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { reportData } from "@/services/queries";
import { exportToExcel, exportToPdf } from "@/utils/exporters";

const reports = ["Asistencia Mensual", "Asistencia Anual", "Confirmantes Activos", "Confirmantes Retirados", "Inventario General", "Eventos"];

export function ReportesPage() {
  const { data = [] } = useQuery({ queryKey: ["reports"], queryFn: reportData });
  return (
    <section className="space-y-5">
      <div>
        <h1 className="text-3xl font-black">Reportes</h1>
        <p className="text-sm text-[var(--muted-foreground)]">Exportacion PDF y Excel para seguimiento pastoral.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {reports.map((report) => (
          <Card key={report}>
            <h2 className="text-lg font-bold">{report}</h2>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">Generado desde vistas SQL y consultas Supabase.</p>
            <div className="mt-5 flex gap-2">
              <Button variant="ghost" onClick={() => exportToExcel(report, data)}><Download className="h-4 w-4" /> Excel</Button>
              <Button variant="ghost" onClick={() => exportToPdf(report, report, data)}><FileText className="h-4 w-4" /> PDF</Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
