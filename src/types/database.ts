export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: Record<
      string,
      {
        Row: Record<string, unknown>;
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
        Relationships: unknown[];
      }
    >;
    Views: Record<string, { Row: Record<string, unknown>; Relationships: unknown[] }>;
    Functions: Record<string, { Args: Record<string, unknown>; Returns: unknown }>;
    Enums: {
      app_role: "admin" | "coordinador" | "catequista";
      confirmante_estado: "Activo" | "Inactivo" | "Retirado";
      asistencia_estado: "Asistio" | "Tardanza" | "Falta" | "Justificado";
      inventario_estado: "Disponible" | "Prestado" | "Danado" | "Perdido";
      evento_tipo: "Retiro" | "Convivencia" | "Campana" | "Actividad Parroquial";
    };
  };
};
