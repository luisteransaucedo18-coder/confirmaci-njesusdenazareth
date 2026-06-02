export type AppRole = "admin" | "coordinador" | "catequista";

export type Profile = {
  id: string;
  full_name: string;
  email: string;
  role: AppRole;
  grupo_id: string | null;
};

export type ResourceConfig = {
  table: keyof DatabaseTables;
  title: string;
  description: string;
  icon: string;
  canCreate?: AppRole[];
  canEdit?: AppRole[];
  canDelete?: AppRole[];
  searchFields: string[];
  columns: Array<{ key: string; label: string }>;
  fields: Array<{
    key: string;
    label: string;
    type?: "text" | "number" | "date" | "time" | "email" | "textarea" | "select";
    options?: string[];
    required?: boolean;
  }>;
};

export type DatabaseTables = {
  confirmantes: Record<string, unknown>;
  asistencias: Record<string, unknown>;
  inventario: Record<string, unknown>;
  catequistas: Record<string, unknown>;
  grupos: Record<string, unknown>;
  eventos: Record<string, unknown>;
  contactos: Record<string, unknown>;
  galeria: Record<string, unknown>;
  configuracion: Record<string, unknown>;
};
