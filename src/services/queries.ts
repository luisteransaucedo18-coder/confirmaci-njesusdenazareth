import { supabase } from "@/lib/supabase";

export async function listRows(table: string, searchFields: string[] = [], search = "", page = 1, pageSize = 10) {
  let query = supabase.from(table).select("*", { count: "exact" }).order("created_at", { ascending: false });

  if (search && searchFields.length) {
    query = query.or(searchFields.map((field) => `${field}.ilike.%${search}%`).join(","));
  }

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const { data, error, count } = await query.range(from, to);
  if (error) throw error;
  return { data: data ?? [], count: count ?? 0 };
}

export async function dashboardMetrics() {
  const [confirmantes, catequistas, inventario, asistencias, eventos] = await Promise.all([
    supabase.from("confirmantes").select("id", { count: "exact", head: true }).eq("estado", "Activo"),
    supabase.from("catequistas").select("id", { count: "exact", head: true }),
    supabase.from("inventario").select("cantidad"),
    supabase.from("asistencias").select("estado").eq("fecha", new Date().toISOString().slice(0, 10)),
    supabase.from("eventos").select("id", { count: "exact", head: true }).gte("fecha", new Date().toISOString().slice(0, 10)),
  ]);

  return {
    confirmantes: confirmantes.count ?? 0,
    catequistas: catequistas.count ?? 0,
    inventario: inventario.data?.reduce((sum, item) => sum + Number(item.cantidad ?? 0), 0) ?? 0,
    asistenciaHoy: asistencias.data?.filter((item) => item.estado === "Asistio" || item.estado === "Tardanza").length ?? 0,
    eventosProximos: eventos.count ?? 0,
  };
}

export async function reportData() {
  const { data, error } = await supabase.from("v_dashboard_stats").select("*");
  if (error) throw error;
  return data ?? [];
}

export async function searchEverywhere(term: string) {
  const like = `%${term}%`;
  const [confirmantes, inventario, eventos, catequistas] = await Promise.all([
    supabase.from("confirmantes").select("id,nombres,apellidos").or(`nombres.ilike.${like},apellidos.ilike.${like},dni.ilike.${like}`).limit(5),
    supabase.from("inventario").select("id,nombre,codigo").or(`nombre.ilike.${like},codigo.ilike.${like}`).limit(5),
    supabase.from("eventos").select("id,nombre,fecha").ilike("nombre", like).limit(5),
    supabase.from("catequistas").select("id,nombre,correo").or(`nombre.ilike.${like},correo.ilike.${like}`).limit(5),
  ]);

  return [
    ...(confirmantes.data ?? []).map((item) => ({ id: item.id, type: "Confirmante", title: `${item.nombres} ${item.apellidos}`, href: "/app/confirmantes" })),
    ...(inventario.data ?? []).map((item) => ({ id: item.id, type: "Inventario", title: `${item.codigo} - ${item.nombre}`, href: "/app/inventario" })),
    ...(eventos.data ?? []).map((item) => ({ id: item.id, type: "Evento", title: item.nombre, href: "/app/eventos" })),
    ...(catequistas.data ?? []).map((item) => ({ id: item.id, type: "Catequista", title: item.nombre, href: "/app/catequistas" })),
  ];
}
