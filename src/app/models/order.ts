export interface OrderI {
  id?: number;
  patient_id: number;     
  optometrist_id: number; 
  date: string;
  total: number;
  status: "ACTIVE" | "INACTIVE"; 
}