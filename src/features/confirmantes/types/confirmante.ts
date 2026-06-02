export type Confirmante = {
  id: string;
  nombres: string;
  apellidos: string;
  dni: string;
  fecha_nacimiento: string;
  edad: number;
  direccion: string;
  telefono: string;
  correo: string;
  colegio: string;
  nombre_padre: string;
  nombre_madre: string;
  grupo_id: string | null;
  fecha_inscripcion: string;
  estado: "Activo" | "Inactivo" | "Retirado";
};
