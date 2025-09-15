export interface PaymentI {
  id?: number;
  orderId: number;        
  date: string;           
  amount: number;      
  method: "CASH" | "CARD" | "TRANSFER";
  status: "PENDING" | "COMPLETED" | "FAILED"; 
}