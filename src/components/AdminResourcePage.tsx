import { Download, FileText, Pencil, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { Skeleton } from "@/components/ui/Skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { createRow, deleteRow, updateRow } from "@/services/mutations";
import { listRows } from "@/services/queries";
import type { ResourceConfig } from "@/types/app";
import { exportToExcel, exportToPdf } from "@/utils/exporters";

export function AdminResourcePage({ config }: { config: ResourceConfig }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [showForm, setShowForm] = useState(false);
  const queryClient = useQueryClient();
  const { role } = useAuth();
  const pageSize = 10;
  const queryKey = [config.table, search, page];
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const getFieldValue = (value: unknown) => (value != null ? String(value) : "");
  const formatCellValue = (columnKey: string, value: unknown) => {
    const field = config.fields.find((item) => item.key === columnKey);
    if (field?.type === "select" && Array.isArray(field.options)) {
      const option = field.options.find((option) => {
        if (typeof option === "string") return option === value;
        return option.value === value;
      });
      if (option) return typeof option === "string" ? option : option.label;
    }
    return value != null ? String(value) : "";
  };
  const { data, isLoading } = useQuery({ queryKey, queryFn: () => listRows(config.table, config.searchFields, search, page, pageSize) });
  const rows = useMemo(() => (data?.data ?? []) as Record<string, unknown>[], [data]);
  const totalPages = Math.max(1, Math.ceil((data?.count ?? 0) / pageSize));
  const canCreate = !config.canCreate || (role && config.canCreate.includes(role));
  const canEdit = !config.canEdit || (role && config.canEdit.includes(role));
  const canDelete = !config.canDelete || (role && config.canDelete.includes(role));

  const saveMutation = useMutation({
    mutationFn: (values: Record<string, unknown>) => editing?.id ? updateRow(config.table, String(editing.id), values) : createRow(config.table, values),
    onSuccess: () => {
      toast.success("Registro guardado");
      queryClient.invalidateQueries({ queryKey: [config.table], exact: false });
      setShowForm(false);
      setEditing(null);
      setFormErrors({});
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : "No se pudo guardar"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteRow(config.table, id),
    onSuccess: () => {
      toast.success("Registro eliminado");
      queryClient.invalidateQueries({ queryKey: [config.table], exact: false });
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : "No se pudo eliminar"),
  });

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const rawValues = Object.fromEntries(new FormData(event.currentTarget).entries()) as Record<string, string>;
    const values = Object.fromEntries(
      Object.entries(rawValues).map(([key, value]) => {
        const field = config.fields.find((item) => item.key === key);
        if (field?.type === "number") {
          const parsed = value === "" ? undefined : Number(value);
          return [key, Number.isNaN(parsed) ? value : parsed];
        }
        return [key, value];
      }),
    ) as Record<string, unknown>;

    if (config.validationSchema) {
      const result = config.validationSchema.safeParse(values);
      if (!result.success) {
        const errors = Object.fromEntries(
          Object.entries(result.error.flatten().fieldErrors).map(([key, messages]) => [key, messages?.[0] ?? ""]),
        );
        setFormErrors(errors as Record<string, string>);
        toast.error("Corrige los campos señalados");
        return;
      }

      setFormErrors({});
      saveMutation.mutate(result.data);
      return;
    }

    setFormErrors({});
    saveMutation.mutate(values);
  }

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-end">
        <div>
          <h1 className="text-3xl font-black">{config.title}</h1>
          <p className="text-sm text-[var(--muted-foreground)]">{config.description}</p>
        </div>
        <div className="ml-auto flex flex-wrap gap-2">
          <Button variant="ghost" onClick={() => exportToExcel(config.table, rows)}><Download className="h-4 w-4" /> Excel</Button>
          <Button variant="ghost" onClick={() => exportToPdf(config.table, config.title, rows)}><FileText className="h-4 w-4" /> PDF</Button>
          {canCreate ? <Button onClick={() => { setEditing(null); setFormErrors({}); setShowForm(true); }}><Plus className="h-4 w-4" /> Nuevo</Button> : null}
        </div>
      </div>
      <Input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Buscar, filtrar y ordenar por columnas principales" />
      {showForm ? (
        <Card>
          <form className="grid gap-4 md:grid-cols-2" onSubmit={submit}>
            {config.fields.map((field) => {
              if (field.type === "hidden") {
                return (
                  <Input
                    key={field.key}
                    name={field.key}
                    type="hidden"
                    defaultValue={getFieldValue(editing?.[field.key])}
                  />
                );
              }

              return (
                <label key={field.key} className="block text-sm font-medium">
                  {field.label}
                  {field.type === "textarea" ? (
                    <>
                      <Textarea
                        name={field.key}
                        defaultValue={getFieldValue(editing?.[field.key])}
                        required={field.required}
                        className="mt-1"
                        onInput={() => formErrors[field.key] && setFormErrors((prev) => {
                          const copy = { ...prev };
                          delete copy[field.key];
                          return copy;
                        })}
                      />
                      {formErrors[field.key] ? <p className="mt-1 text-sm text-red-600">{formErrors[field.key]}</p> : null}
                    </>
                  ) : field.type === "select" ? (
                    <>
                      <Select
                        name={field.key}
                        defaultValue={getFieldValue(editing?.[field.key]) || (Array.isArray(field.options) ? (typeof field.options[0] === "string" ? field.options[0] : field.options[0]?.value) : "") || ""}
                        required={field.required}
                        className="mt-1"
                        onChange={() => formErrors[field.key] && setFormErrors((prev) => {
                          const copy = { ...prev };
                          delete copy[field.key];
                          return copy;
                        })}
                      >
                        {field.options?.map((option) => {
                          const value = typeof option === "string" ? option : option.value;
                          const label = typeof option === "string" ? option : option.label;
                          return <option key={value} value={value}>{label}</option>;
                        })}
                      </Select>
                      {formErrors[field.key] ? <p className="mt-1 text-sm text-red-600">{formErrors[field.key]}</p> : null}
                    </>
                  ) : (
                    <>
                      <Input
                        name={field.key}
                        type={field.type ?? "text"}
                        defaultValue={getFieldValue(editing?.[field.key])}
                        required={field.required}
                        className="mt-1"
                        onInput={() => formErrors[field.key] && setFormErrors((prev) => {
                          const copy = { ...prev };
                          delete copy[field.key];
                          return copy;
                        })}
                      />
                      {formErrors[field.key] ? <p className="mt-1 text-sm text-red-600">{formErrors[field.key]}</p> : null}
                    </>
                  )}
                </label>
              );
            })}
            <div className="flex gap-2 md:col-span-2">
              <Button type="submit" disabled={saveMutation.isPending}>Guardar</Button>
              <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancelar</Button>
            </div>
          </form>
        </Card>
      ) : null}
      {isLoading ? <Skeleton /> : rows.length === 0 ? <EmptyState /> : (
        <Card className="overflow-x-auto p-0">
          <table className="w-full md:min-w-[760px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] text-left">
                {config.columns.map((column) => <th key={column.key} className="px-4 py-3 font-semibold">{column.label}</th>)}
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={String(row.id)} className="border-b border-[var(--border)] last:border-b-0">
                  {config.columns.map((column) => <td key={column.key} className="px-4 py-3">{formatCellValue(column.key, row[column.key])}</td>)}
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      {canEdit ? <Button variant="ghost" className="h-9 w-9 px-0" onClick={() => { setEditing(row); setFormErrors({}); setShowForm(true); }} aria-label="Editar"><Pencil className="h-4 w-4" /></Button> : null}
                      {canDelete ? <Button variant="danger" className="h-9 w-9 px-0" onClick={() => deleteMutation.mutate(String(row.id))} aria-label="Eliminar"><Trash2 className="h-4 w-4" /></Button> : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
      <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center">
        <Button variant="ghost" disabled={page <= 1} onClick={() => setPage((value) => value - 1)}>Anterior</Button>
        <span className="text-sm text-[var(--muted-foreground)]">Pagina {page} de {totalPages}</span>
        <Button variant="ghost" disabled={page >= totalPages} onClick={() => setPage((value) => value + 1)}>Siguiente</Button>
      </div>
    </section>
  );
}
