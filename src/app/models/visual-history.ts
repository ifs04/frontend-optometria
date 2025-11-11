
export interface VisualHistoryI {
  id?: number;
  patient_id: number; 
  observations: string;
  date: Date;
  status: "ACTIVE" | "INACTIVE";
}