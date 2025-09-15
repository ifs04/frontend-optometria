
export interface OptometristI {
  id?: number;         
  name: string;
  specialty: string;        
  phone: string;      
  email: string;     
  status: "ACTIVE" | "INACTIVE"; 
}