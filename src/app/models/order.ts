export interface OrderI {
  id?: number;
  patientId: number;     
  optometristId: number; 
  date: string;
  total: number;
  status: "PENDING" | "IN_PROCESS" | "DELIVERED" | "CANCELLED"; 
}