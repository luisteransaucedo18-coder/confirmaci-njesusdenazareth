import { supabase } from "@/lib/supabase";

export async function getGalleryItems() {
  const { data, error } = await supabase
    .from("galeria")
    .select("id,titulo,descripcion,public_url,storage_path,visible")
    .eq("visible", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getUpcomingEventos() {
  const today = new Date().toISOString().slice(0, 10);
  const { data, error } = await supabase
    .from("eventos")
    .select("id,nombre,descripcion,fecha,hora,lugar,tipo,responsable")
    .gte("fecha", today)
    .order("fecha", { ascending: true })
    .limit(6);

  if (error) throw error;
  return data ?? [];
}

export async function getCatequistasList() {
  const { data, error } = await supabase
    .from("catequistas")
    .select("id,nombre,correo,telefono,rol")
    .order("created_at", { ascending: false })
    .limit(8);

  if (error) throw error;
  return data ?? [];
}

export async function getContactSettings() {
  const { data, error } = await supabase
    .from("configuracion")
    .select("clave,valor")
    .in("clave", ["contact_email", "contact_phone", "contact_address"])
    .limit(10);

  if (error) throw error;

  const values = Object.fromEntries(
    (data ?? []).map((item) => [item.clave, item.valor]),
  ) as Record<string, string>;

  return {
    email: values.contact_email ?? "contacto@jesusdenazareth.pe",
    phone: values.contact_phone ?? "+51 999 999 999",
    address:
      values.contact_address ??
      "Parroquia Jesús de Nazareth, Trujillo - Perú",
  };
}

export async function getLandingStats() {
  const today = new Date().toISOString().slice(0, 10);
  const [catequistas, eventos, confirmantes] = await Promise.all([
    supabase.from("catequistas").select("id", { count: "exact", head: true }),
    supabase
      .from("eventos")
      .select("id", { count: "exact", head: true })
      .gte("fecha", today),
    supabase
      .from("confirmantes")
      .select("id", { count: "exact", head: true })
      .eq("estado", "Activo"),
  ]);

  return {
    catequistas: catequistas.count ?? 0,
    eventosProximos: eventos.count ?? 0,
    confirmantesActivos: confirmantes.count ?? 0,
  };
}
