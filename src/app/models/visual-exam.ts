import { EyeExamI } from "./eye-exam";

export interface VisualExamI {
   id?: number;
  appointmentId: number;          // Relación con la cita
  date: string;                   // Fecha del examen
  prescription?: string;          // Texto de la receta
  od: EyeExamI;            // Ojo derecho
  oi: EyeExamI;   
}