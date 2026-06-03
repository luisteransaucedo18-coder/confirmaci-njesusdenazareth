import { supabase } from "@/lib/supabase";

export async function createRow(table: string, values: Record<string, unknown>) {
  const { data, error } = await supabase.from(table).insert(values).select().single();
  if (error) throw error;
  return data;
}

export async function createRows(table: string, values: Record<string, unknown>[]) {
  const { data, error } = await supabase.from(table).insert(values).select();
  if (error) throw error;
  return data;
}

export async function updateRow(table: string, id: string, values: Record<string, unknown>) {
  const { data, error } = await supabase.from(table).update(values).eq("id", id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteRow(table: string, id: string) {
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) throw error;
}
