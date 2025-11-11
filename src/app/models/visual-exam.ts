import { EyeExamI } from "./eye-exam";

export interface VisualExamI {
  id?: number;
  date: string;
  prescription?: string;  
  od: EyeExamI;            
  oi: EyeExamI;  
  appointment_id: number;  
  status: "ACTIVE" | "INACTIVE";                          
}