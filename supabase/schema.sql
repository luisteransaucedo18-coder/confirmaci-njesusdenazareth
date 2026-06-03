-- Sistema Web Integral - Grupo de Confirmacion Juvenil Jesus de Nazareth
-- Ejecutar completo en Supabase SQL Editor.

create extension if not exists "uuid-ossp";
create extension if not exists pgcrypto;

do $$ begin
  create type app_role as enum ('admin', 'coordinador', 'catequista');
exception when duplicate_object then null; end $$;

do $$ begin
  create type confirmante_estado as enum ('Activo', 'Inactivo', 'Retirado');
exception when duplicate_object then null; end $$;

do $$ begin
  create type asistencia_estado as enum ('Asistio', 'Tardanza', 'Falta', 'Justificado');
exception when duplicate_object then null; end $$;

do $$ begin
  create type inventario_estado as enum ('Disponible', 'Prestado', 'Danado', 'Perdido');
exception when duplicate_object then null; end $$;

do $$ begin
  create type evento_tipo as enum ('Retiro', 'Convivencia', 'Campana', 'Actividad Parroquial');
exception when duplicate_object then null; end $$;

create table if not exists public.roles (
  id uuid primary key default gen_random_uuid(),
  name app_role not null unique,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.grupos (
  id uuid primary key default gen_random_uuid(),
  nombre text not null unique,
  descripcion text,
  nivel text,
  catequista_id uuid,
  capacidad integer not null default 30 check (capacidad > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null unique,
  role app_role not null default 'catequista',
  grupo_id uuid references public.grupos(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.catequistas (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  nombre text not null,
  correo text not null unique,
  telefono text,
  grupo_id uuid references public.grupos(id) on delete set null,
  rol app_role not null default 'catequista',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.grupos
  drop constraint if exists grupos_catequista_id_fkey,
  add constraint grupos_catequista_id_fkey foreign key (catequista_id) references public.catequistas(id) on delete set null;

create table if not exists public.confirmantes (
  id uuid primary key default gen_random_uuid(),
  nombres text not null,
  apellidos text not null,
  dni text not null unique check (length(dni) >= 8),
  fecha_nacimiento date not null,
  edad integer not null default 0 check (edad >= 0),
  direccion text,
  telefono text,
  correo text,
  colegio text,
  nombre_padre text,
  nombre_madre text,
  grupo_id uuid references public.grupos(id) on delete set null,
  fecha_inscripcion date not null default current_date,
  estado confirmante_estado not null default 'Activo',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.asistencias (
  id uuid primary key default gen_random_uuid(),
  fecha date not null default current_date,
  grupo_id uuid not null references public.grupos(id) on delete cascade,
  confirmante_id uuid not null references public.confirmantes(id) on delete cascade,
  estado asistencia_estado not null,
  observaciones text,
  created_by uuid references public.profiles(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (fecha, confirmante_id)
);

create table if not exists public.inventario (
  id uuid primary key default gen_random_uuid(),
  codigo text not null unique,
  nombre text not null,
  categoria text not null check (categoria in ('Biblias','Sillas','Mesas','Equipos de Sonido','Material Catequetico','Proyectores','Decoraciones','Otros')),
  cantidad integer not null default 0 check (cantidad >= 0),
  estado inventario_estado not null default 'Disponible',
  ubicacion text,
  fecha_compra date,
  observaciones text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.movimientos_inventario (
  id uuid primary key default gen_random_uuid(),
  inventario_id uuid not null references public.inventario(id) on delete cascade,
  tipo text not null check (tipo in ('Entrada','Salida','Prestamo','Devolucion','Ajuste')),
  cantidad integer not null check (cantidad > 0),
  responsable text,
  observaciones text,
  fecha timestamptz not null default now(),
  created_by uuid references public.profiles(id) on delete set null default auth.uid()
);

create table if not exists public.eventos (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  descripcion text,
  fecha date not null,
  hora time not null,
  lugar text not null,
  responsable text,
  tipo evento_tipo not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contactos (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  correo text not null,
  telefono text,
  mensaje text not null,
  estado text not null default 'Pendiente' check (estado in ('Pendiente','Atendido','Archivado')),
  created_at timestamptz not null default now()
);

create table if not exists public.galeria (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  descripcion text,
  storage_path text not null,
  public_url text,
  visible boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.configuracion (
  id uuid primary key default gen_random_uuid(),
  clave text not null unique,
  valor text not null,
  descripcion text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id) on delete set null default auth.uid(),
  action text not null,
  table_name text,
  record_id uuid,
  old_data jsonb,
  new_data jsonb,
  ip_address inet,
  created_at timestamptz not null default now()
);

create index if not exists idx_profiles_role on public.profiles(role);
create index if not exists idx_confirmantes_grupo on public.confirmantes(grupo_id);
create index if not exists idx_confirmantes_estado on public.confirmantes(estado);
create index if not exists idx_asistencias_fecha_grupo on public.asistencias(fecha, grupo_id);
create index if not exists idx_inventario_categoria on public.inventario(categoria);
create index if not exists idx_eventos_fecha on public.eventos(fecha);
create index if not exists idx_audit_logs_actor on public.audit_logs(actor_id);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.calculate_confirmante_age()
returns trigger
language plpgsql
as $$
begin
  new.edad = date_part('year', age(current_date, new.fecha_nacimiento))::integer;
  return new;
end;
$$;

create or replace function public.current_role()
returns app_role
language sql
security definer
set search_path = public
stable
as $$
  select role from public.profiles where id = auth.uid()
$$;

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select coalesce(public.current_role() = 'admin', false)
$$;

create or replace function public.is_coordinator_or_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select coalesce(public.current_role() in ('admin','coordinador'), false)
$$;

create or replace function public.owns_grupo(target_grupo uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
      and (role in ('admin','coordinador') or grupo_id = target_grupo)
  )
$$;

create or replace function public.audit_trigger()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.audit_logs(action, table_name, record_id, old_data, new_data)
  values (
    tg_op,
    tg_table_name,
    coalesce(new.id, old.id),
    case when tg_op in ('UPDATE','DELETE') then to_jsonb(old) else null end,
    case when tg_op in ('INSERT','UPDATE') then to_jsonb(new) else null end
  );
  return coalesce(new, old);
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles(id, full_name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.email,
    coalesce((new.raw_user_meta_data->>'role')::app_role, 'catequista')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

do $$
declare
  table_name text;
begin
  foreach table_name in array array['grupos','profiles','catequistas','confirmantes','asistencias','inventario','eventos','configuracion']
  loop
    execute format('drop trigger if exists trg_%I_touch on public.%I', table_name, table_name);
    execute format('create trigger trg_%I_touch before update on public.%I for each row execute function public.touch_updated_at()', table_name, table_name);
  end loop;

  drop trigger if exists trg_confirmantes_calculate_age on public.confirmantes;
  create trigger trg_confirmantes_calculate_age
  before insert or update of fecha_nacimiento on public.confirmantes
  for each row execute function public.calculate_confirmante_age();

  foreach table_name in array array['grupos','catequistas','confirmantes','asistencias','inventario','movimientos_inventario','eventos','contactos','galeria','configuracion']
  loop
    execute format('drop trigger if exists trg_%I_audit on public.%I', table_name, table_name);
    execute format('create trigger trg_%I_audit after insert or update or delete on public.%I for each row execute function public.audit_trigger()', table_name, table_name);
  end loop;
end $$;

create or replace view public.v_asistencia_por_confirmante as
select
  c.id as confirmante_id,
  c.nombres,
  c.apellidos,
  c.grupo_id,
  count(a.id) as sesiones,
  count(a.id) filter (where a.estado in ('Asistio','Tardanza','Justificado')) as asistencias_validas,
  round((count(a.id) filter (where a.estado in ('Asistio','Tardanza','Justificado'))::numeric / nullif(count(a.id), 0)) * 100, 2) as porcentaje
from public.confirmantes c
left join public.asistencias a on a.confirmante_id = c.id
group by c.id;

create or replace view public.v_alertas_asistencia as
select *
from public.v_asistencia_por_confirmante
where sesiones >= 3 and porcentaje < 70;

create or replace view public.v_dashboard_stats as
select 'confirmantes_activos' as metric, count(*)::numeric as value from public.confirmantes where estado = 'Activo'
union all
select 'confirmantes_retirados', count(*)::numeric from public.confirmantes where estado = 'Retirado'
union all
select 'inventario_total', coalesce(sum(cantidad), 0)::numeric from public.inventario
union all
select 'eventos_proximos', count(*)::numeric from public.eventos where fecha >= current_date;

alter table public.roles enable row level security;
alter table public.profiles enable row level security;
alter table public.grupos enable row level security;
alter table public.catequistas enable row level security;
alter table public.confirmantes enable row level security;
alter table public.asistencias enable row level security;
alter table public.inventario enable row level security;
alter table public.movimientos_inventario enable row level security;
alter table public.eventos enable row level security;
alter table public.contactos enable row level security;
alter table public.galeria enable row level security;
alter table public.configuracion enable row level security;
alter table public.audit_logs enable row level security;

drop policy if exists "roles readable" on public.roles;
create policy "roles readable" on public.roles for select to authenticated using (true);

drop policy if exists "profiles own or admin" on public.profiles;
create policy "profiles own or admin" on public.profiles for select to authenticated using (id = auth.uid() or public.is_admin());
drop policy if exists "profiles admin update" on public.profiles;
create policy "profiles admin update" on public.profiles for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "grupos read by auth" on public.grupos;
create policy "grupos read by auth" on public.grupos for select to authenticated using (true);
drop policy if exists "grupos manage coordinator admin" on public.grupos;
create policy "grupos manage coordinator admin" on public.grupos for all to authenticated using (public.is_coordinator_or_admin()) with check (public.is_coordinator_or_admin());

drop policy if exists "catequistas read" on public.catequistas;
create policy "catequistas read" on public.catequistas for select to authenticated using (public.is_coordinator_or_admin() or public.owns_grupo(grupo_id));
drop policy if exists "catequistas manage admin" on public.catequistas;
create policy "catequistas manage admin" on public.catequistas for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "confirmantes read by role" on public.confirmantes;
create policy "confirmantes read by role" on public.confirmantes for select to authenticated using (public.is_coordinator_or_admin() or public.owns_grupo(grupo_id));
drop policy if exists "confirmantes manage coordinator admin" on public.confirmantes;
create policy "confirmantes manage coordinator admin" on public.confirmantes for all to authenticated using (public.is_coordinator_or_admin()) with check (public.is_coordinator_or_admin());

drop policy if exists "asistencias read by role" on public.asistencias;
create policy "asistencias read by role" on public.asistencias for select to authenticated using (public.is_coordinator_or_admin() or public.owns_grupo(grupo_id));
drop policy if exists "asistencias insert allowed" on public.asistencias;
create policy "asistencias insert allowed" on public.asistencias for insert to authenticated with check (public.is_coordinator_or_admin() or public.owns_grupo(grupo_id));
drop policy if exists "asistencias update coordinator admin" on public.asistencias;
create policy "asistencias update coordinator admin" on public.asistencias for update to authenticated using (public.is_coordinator_or_admin()) with check (public.is_coordinator_or_admin());
drop policy if exists "asistencias delete coordinator admin" on public.asistencias;
create policy "asistencias delete coordinator admin" on public.asistencias for delete to authenticated using (public.is_coordinator_or_admin());

drop policy if exists "inventario read authenticated" on public.inventario;
create policy "inventario read authenticated" on public.inventario for select to authenticated using (true);
drop policy if exists "inventario manage coordinator admin" on public.inventario;
create policy "inventario manage coordinator admin" on public.inventario for all to authenticated using (public.is_coordinator_or_admin()) with check (public.is_coordinator_or_admin());

drop policy if exists "movimientos read coordinator admin" on public.movimientos_inventario;
create policy "movimientos read coordinator admin" on public.movimientos_inventario for select to authenticated using (public.is_coordinator_or_admin());
drop policy if exists "movimientos manage coordinator admin" on public.movimientos_inventario;
create policy "movimientos manage coordinator admin" on public.movimientos_inventario for all to authenticated using (public.is_coordinator_or_admin()) with check (public.is_coordinator_or_admin());

drop policy if exists "eventos read authenticated" on public.eventos;
create policy "eventos read authenticated" on public.eventos for select to authenticated using (true);
drop policy if exists "eventos manage coordinator admin" on public.eventos;
create policy "eventos manage coordinator admin" on public.eventos for all to authenticated using (public.is_coordinator_or_admin()) with check (public.is_coordinator_or_admin());

drop policy if exists "contactos public insert" on public.contactos;
create policy "contactos public insert" on public.contactos for insert to anon, authenticated with check (true);
drop policy if exists "contactos admin read" on public.contactos;
create policy "contactos admin read" on public.contactos for select to authenticated using (public.is_coordinator_or_admin());
drop policy if exists "contactos admin update" on public.contactos;
create policy "contactos admin update" on public.contactos for update to authenticated using (public.is_coordinator_or_admin()) with check (public.is_coordinator_or_admin());

drop policy if exists "galeria public read visible" on public.galeria;
create policy "galeria public read visible" on public.galeria for select to anon, authenticated using (visible = true or public.is_coordinator_or_admin());
drop policy if exists "galeria manage coordinator admin" on public.galeria;
create policy "galeria manage coordinator admin" on public.galeria for all to authenticated using (public.is_coordinator_or_admin()) with check (public.is_coordinator_or_admin());

drop policy if exists "configuracion public read" on public.configuracion;
create policy "configuracion public read" on public.configuracion for select to anon, authenticated using (true);
drop policy if exists "configuracion admin manage" on public.configuracion;
create policy "configuracion admin manage" on public.configuracion for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "audit admin read" on public.audit_logs;
create policy "audit admin read" on public.audit_logs for select to authenticated using (public.is_admin());
drop policy if exists "audit system insert" on public.audit_logs;
create policy "audit system insert" on public.audit_logs for insert to authenticated with check (true);

insert into public.roles(name, description) values
  ('admin', 'Permisos totales'),
  ('coordinador', 'Gestion operativa, eventos, asistencia, reportes e inventario'),
  ('catequista', 'Registro de asistencia y lectura de su grupo')
on conflict (name) do nothing;

insert into public.grupos(nombre, descripcion, nivel, capacidad) values
  ('Grupo A', 'Primer nivel de confirmacion', 'Nivel 1', 35),
  ('Grupo B', 'Segundo nivel de confirmacion', 'Nivel 2', 35)
on conflict (nombre) do nothing;

insert into public.inventario(codigo, nombre, categoria, cantidad, estado, ubicacion) values
  ('BIB-001', 'Biblias juveniles', 'Biblias', 30, 'Disponible', 'Almacen parroquial'),
  ('SIL-001', 'Sillas plasticas', 'Sillas', 80, 'Disponible', 'Salon principal'),
  ('PRO-001', 'Proyector Epson', 'Proyectores', 1, 'Disponible', 'Oficina')
on conflict (codigo) do nothing;

insert into public.eventos(nombre, descripcion, fecha, hora, lugar, responsable, tipo) values
  ('Retiro de Confirmacion', 'Jornada espiritual para confirmantes', current_date + interval '30 days', '08:30', 'Casa de retiro', 'Coordinacion', 'Retiro'),
  ('Convivencia Juvenil', 'Integracion por grupos', current_date + interval '15 days', '16:00', 'Parroquia', 'Catequistas', 'Convivencia')
on conflict do nothing;

insert into public.configuracion(clave, valor, descripcion) values
  ('parroquia_nombre', 'Parroquia Jesus de Nazareth', 'Nombre oficial'),
  ('contacto_correo', 'confirmacion@jesusdenazareth.pe', 'Correo de contacto'),
  ('facebook', 'https://facebook.com/', 'Red social')
on conflict (clave) do nothing;

insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true), ('documents', 'documents', false)
on conflict (id) do nothing;

drop policy if exists "gallery public read" on storage.objects;
create policy "gallery public read" on storage.objects for select to anon, authenticated using (bucket_id = 'gallery');

drop policy if exists "gallery manage coordinator admin" on storage.objects;
create policy "gallery manage coordinator admin" on storage.objects for all to authenticated
using (bucket_id = 'gallery' and public.is_coordinator_or_admin())
with check (bucket_id = 'gallery' and public.is_coordinator_or_admin());

drop policy if exists "documents authenticated read" on storage.objects;
create policy "documents authenticated read" on storage.objects for select to authenticated using (bucket_id = 'documents');

drop policy if exists "documents manage coordinator admin" on storage.objects;
create policy "documents manage coordinator admin" on storage.objects for all to authenticated
using (bucket_id = 'documents' and public.is_coordinator_or_admin())
with check (bucket_id = 'documents' and public.is_coordinator_or_admin());
