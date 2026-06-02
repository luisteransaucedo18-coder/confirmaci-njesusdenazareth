import { AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { AdminResourcePage } from "@/components/AdminResourcePage";

export function AsistenciasPage() {
  return (
    <div className="space-y-4">
      <Card className="border-amber-300 bg-amber-50 text-amber-950 dark:bg-amber-950 dark:text-amber-100">
        <div className="flex gap-3"><AlertTriangle className="h-5 w-5" /><p className="text-sm font-medium">El SQL incluye vista y funcion para alertar automaticamente asistencia menor al 70%.</p></div>
      </Card>
      <AdminResourcePage config={{
        table: "asistencias",
        title: "Asistencias",
        description: "Registro masivo e individual, historial, estadisticas y porcentaje de asistencia.",
        icon: "check",
        searchFields: ["estado", "fecha"],
        columns: [{ key: "fecha", label: "Fecha" }, { key: "estado", label: "Estado" }, { key: "grupo_id", label: "Grupo" }, { key: "confirmante_id", label: "Confirmante" }],
        fields: [
          { key: "fecha", label: "Fecha", type: "date", required: true },
          { key: "grupo_id", label: "Grupo ID", required: true },
          { key: "confirmante_id", label: "Confirmante ID", required: true },
          { key: "estado", label: "Estado", type: "select", options: ["Asistio", "Tardanza", "Falta", "Justificado"], required: true },
          { key: "observaciones", label: "Observaciones", type: "textarea" },
        ],
      }} />
    </div>
  );
}
