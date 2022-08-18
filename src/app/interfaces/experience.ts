export interface Experience {
  id: number;
  puesto: string;
  compania: string;
  descripcion: string;
  fechaInicio: Date | null;
  fechaFin: Date | null;
  actual: boolean;
}
