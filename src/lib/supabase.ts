import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase env vars are missing. Copy .env.example to .env.local.");
}

const fallbackSupabaseUrl = "https://zhqxuxdfswzrcvjuvgzg.supabase.co";
const fallbackSupabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder.placeholder";

export const supabase = createClient(supabaseUrl ?? fallbackSupabaseUrl, supabaseAnonKey ?? fallbackSupabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
