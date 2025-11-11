export interface PaymentI {
  id?: number;
  order_id: number;        
  date: string;           
  amount: number;      
  method: "CASH" | "CARD" | "TRANSFER";
  status: "ACTIVE" | "INACTIVE"; 
}