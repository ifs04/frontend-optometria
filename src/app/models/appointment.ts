export interface AppointmentI {
  id?: number;
  patient_id: number;
  optometrist_id: number;
  date: string;
  reason: string;
  status: "ACTIVE" | "INACTIVE";
}