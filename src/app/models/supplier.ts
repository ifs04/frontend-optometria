export interface SupplierI {
  id?: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  status: "ACTIVE" | "INACTIVE"; 
}