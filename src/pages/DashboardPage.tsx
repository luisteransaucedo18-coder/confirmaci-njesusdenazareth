import { useQuery } from "@tanstack/react-query";
import { Boxes, CalendarDays, CheckSquare, Users, UserRound } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { dashboardMetrics } from "@/services/queries";

const chart = [
  { mes: "Ene", asistencia: 86 },
  { mes: "Feb", asistencia: 79 },
  { mes: "Mar", asistencia: 91 },
  { mes: "Abr", asistencia: 83 },
  { mes: "May", asistencia: 88 },
  { mes: "Jun", asistencia: 92 },
];

const pie = [
  { name: "Biblias", value: 30, color: "#2563EB" },
  { name: "Sillas", value: 80, color: "#F59E0B" },
  { name: "Equipos", value: 12, color: "#10B981" },
];

export function DashboardPage() {
  const { data, isLoading } = useQuery({ queryKey: ["dashboard"], queryFn: dashboardMetrics });
  const cards = [
    { label: "Total Confirmantes", value: data?.confirmantes ?? 0, icon: Users },
    { label: "Catequistas", value: data?.catequistas ?? 0, icon: UserRound },
    { label: "Inventario", value: data?.inventario ?? 0, icon: Boxes },
    { label: "Asistencia Hoy", value: data?.asistenciaHoy ?? 0, icon: CheckSquare },
    { label: "Eventos Proximos", value: data?.eventosProximos ?? 0, icon: CalendarDays },
  ];

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-black">Dashboard</h1>
        <p className="text-sm text-[var(--muted-foreground)]">Resumen operativo del grupo de confirmacion.</p>
      </div>
      {isLoading ? <Skeleton /> : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {cards.map((item) => <Card key={item.label}><item.icon className="mb-4 h-6 w-6 text-[var(--secondary)]" /><p className="text-sm text-[var(--muted-foreground)]">{item.label}</p><p className="text-3xl font-black">{item.value}</p></Card>)}
        </div>
      )}
      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <h2 className="mb-4 text-lg font-bold">Asistencia mensual</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chart}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="mes" /><YAxis /><Tooltip /><Bar dataKey="asistencia" fill="#2563EB" radius={[4, 4, 0, 0]} /></BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <h2 className="mb-4 text-lg font-bold">Inventario por categoria</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart><Pie data={pie} dataKey="value" nameKey="name" outerRadius={105}>{pie.map((entry) => <Cell key={entry.name} fill={entry.color} />)}</Pie><Tooltip /></PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </section>
  );
}
