# Deploy

## Supabase

1. Crea un proyecto en Supabase.
2. Ejecuta `supabase/schema.sql` en SQL Editor.
3. Crea usuarios en Authentication y actualiza sus perfiles en `profiles`.
4. Copia `Project URL` y `anon public key`.

## Vercel

1. Importa el repositorio.
2. Configura variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Build command: `npm run build`
4. Output directory: `dist`
