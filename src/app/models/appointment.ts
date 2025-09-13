export interface AppointmentI {
  id?: number;
  patientId: number;
  optometristId: number;
  date: string;
  reason: string;
  status: 'PENDING' | 'ATTENDED' | 'CANCELLED';
}