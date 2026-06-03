import { AlertTriangle } from "lucide-react";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Skeleton } from "@/components/ui/Skeleton";
import { AdminResourcePage } from "@/components/AdminResourcePage";
import { asistenciasService } from "@/features/asistencias/services/asistenciasService";

type ConfirmanteAttendance = {
  id: string;
  nombres: string;
  apellidos: string;
  dni: string;
  grupo_id: string | null;
};

type Group = {
  id: string;
  nombre: string;
  nivel: string;
  capacidad: number;
  catequista_id: string | null;
};

export function AsistenciasPage() {
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().slice(0, 10));
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [attendanceMap, setAttendanceMap] = useState<Record<string, boolean>>({});
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const queryClient = useQueryClient();

  const { data: groups, isLoading: isGroupsLoading } = useQuery<{ data: Group[]; count: number }, Error>({
    queryKey: ["grupos"],
    queryFn: asistenciasService.getGroups,
  });

  const { data: confirmantes } = useQuery<ConfirmanteAttendance[], Error>({
    queryKey: ["confirmantes", "all"],
    queryFn: asistenciasService.getAllConfirmantes,
  });

  const confirmantesByGroup = useMemo(() => {
    const map: Record<string, ConfirmanteAttendance[]> = {};
    (confirmantes ?? []).forEach((confirmante) => {
      const key = String(confirmante.grupo_id ?? "");
      if (!map[key]) map[key] = [];
      map[key].push(confirmante);
    });
    return map;
  }, [confirmantes]);

  const registerMutation = useMutation({
    mutationFn: (values: Record<string, unknown>[]) => asistenciasService.registerBatch(values),
    onSuccess: () => {
      toast.success("Asistencia registrada");
      queryClient.invalidateQueries({ queryKey: ["asistencias"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["confirmantes"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["grupos"], exact: false });
      setShowAttendanceModal(false);
      setSelectedGroup(null);
      setAttendanceMap({});
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : "No se pudo registrar asistencia"),
  });

  const groupList = useMemo(() => groups?.data ?? [], [groups]);

  function openAttendanceModal(group: Group) {
    setSelectedGroup(group);
    const groupConfirmantes = confirmantesByGroup[group.id] ?? [];
    setAttendanceMap(Object.fromEntries(groupConfirmantes.map((confirmante) => [confirmante.id, false])));
    setShowAttendanceModal(true);
  }

  function toggleAttendance(confirmanteId: string) {
    setAttendanceMap((prev) => ({ ...prev, [confirmanteId]: !prev[confirmanteId] }));
  }

  function saveAttendance() {
    if (!selectedGroup) return;

    const groupConfirmantes = confirmantesByGroup[selectedGroup.id] ?? [];
    if (groupConfirmantes.length === 0) {
      toast.error("El grupo no tiene confirmantes asignados.");
      return;
    }

    const entries = groupConfirmantes.map((confirmante) => ({
      fecha: attendanceDate,
      grupo_id: selectedGroup.id,
      confirmante_id: confirmante.id,
      estado: attendanceMap[confirmante.id] ? "Asistio" : "Falta",
    }));

    registerMutation.mutate(entries);
  }

  return (
    <div className="space-y-5">
      <Card className="border-amber-300 bg-amber-50 text-amber-950 dark:bg-amber-950 dark:text-amber-100">
        <div className="flex gap-3"><AlertTriangle className="h-5 w-5" />
          <p className="text-sm font-medium">El SQL incluye vista y funcion para alertar automaticamente asistencia menor al 70%.</p>
        </div>
      </Card>

      <section className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-black">Asistencias por grupo</h1>
            <p className="text-sm text-[var(--muted-foreground)]">Selecciona un grupo para marcar asistencia de todos sus confirmantes.</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
              Fecha:
              <Input type="date" value={attendanceDate} onChange={(event) => setAttendanceDate(event.target.value)} className="w-auto" />
            </label>
          </div>
        </div>

        {isGroupsLoading ? (
          <Skeleton />
        ) : groupList.length === 0 ? (
          <Card><p className="text-sm text-[var(--muted-foreground)]">No se encontraron grupos.</p></Card>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {groupList.map((group) => {
              const groupConfirmantes = confirmantesByGroup[group.id] ?? [];
              return (
                <Card key={group.id} className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold">{group.nombre}</h2>
                      <p className="text-sm text-[var(--muted-foreground)]">{group.nivel} · Capacidad {group.capacidad}</p>
                      <p className="mt-2 text-sm text-[var(--muted-foreground)]">Confirmantes: {groupConfirmantes.length}</p>
                    </div>
                    <Button onClick={() => openAttendanceModal(group)}>Registrar asistencia</Button>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Confirmantes en el grupo</p>
                    {groupConfirmantes.length === 0 ? (
                      <p className="text-sm text-[var(--muted-foreground)]">No hay confirmantes asignados.</p>
                    ) : (
                      <div className="grid gap-2">
                        {groupConfirmantes.map((confirmante) => (
                          <div key={confirmante.id} className="rounded-2xl border border-[var(--border)] p-3">
                            <p className="font-medium">{confirmante.nombres} {confirmante.apellidos}</p>
                            <p className="text-sm text-[var(--muted-foreground)]">DNI: {confirmante.dni}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      <section>
        <AdminResourcePage config={{
          table: "asistencias",
          title: "Historial de asistencias",
          description: "Revisa el registro detallado de asistencias ya guardadas.",
          icon: "check",
          canCreate: ["admin", "coordinador"],
          canEdit: ["admin", "coordinador"],
          canDelete: ["admin", "coordinador"],
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
      </section>

      {showAttendanceModal && selectedGroup ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-3xl overflow-hidden rounded-3xl bg-[var(--card)] shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-[var(--border)] px-6 py-5">
              <div>
                <h2 className="text-2xl font-black">Registrar asistencia</h2>
                <p className="text-sm text-[var(--muted-foreground)]">Grupo {selectedGroup.nombre}</p>
              </div>
              <Button variant="ghost" onClick={() => setShowAttendanceModal(false)}>Cerrar</Button>
            </div>
            <div className="space-y-6 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-medium">Grupo</p>
                  <div className="mt-2 rounded-2xl border border-[var(--border)] bg-[var(--input)] px-4 py-3 text-sm">{selectedGroup.nombre}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium">Fecha</label>
                  <Input
                    type="date"
                    value={attendanceDate}
                    onChange={(event) => setAttendanceDate(event.target.value)}
                    className="mt-2 w-full"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium">Confirmantes</p>
                <div className="grid gap-2">
                  {(confirmantesByGroup[selectedGroup.id] ?? []).map((confirmante) => (
                    <label key={confirmante.id} className="flex items-center justify-between rounded-2xl border border-[var(--border)] p-3">
                      <div>
                        <p className="font-medium">{confirmante.nombres} {confirmante.apellidos}</p>
                        <p className="text-sm text-[var(--muted-foreground)]">DNI: {confirmante.dni}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-[var(--muted-foreground)]">{attendanceMap[confirmante.id] ? "Asistió" : "No asistió"}</span>
                        <input
                          type="checkbox"
                          checked={Boolean(attendanceMap[confirmante.id])}
                          onChange={() => toggleAttendance(confirmante.id)}
                          className="h-5 w-5 rounded border-[var(--border)] bg-[var(--background)] text-[var(--secondary)]"
                        />
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                <Button variant="ghost" onClick={() => setShowAttendanceModal(false)}>Cancelar</Button>
                <Button onClick={saveAttendance} disabled={registerMutation.isPending}>
                  {registerMutation.isPending ? "Guardando..." : "Guardar asistencia"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
