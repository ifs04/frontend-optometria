export interface PatientI {
  id?: number;
  name: string;
  age: number;
  document_type: string;      
  document_number: string;               
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  email: string;
  status: "ACTIVE" | "INACTIVE";
}
