export interface PatientI {
  id?: number;
  name: string;
  age: number;
  documentType: string;      
  documentNumber: string;               
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  email: string;
  status: "ACTIVE" | "INACTIVE";
}