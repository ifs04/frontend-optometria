export interface DeliveryI {
  id?: number;
  orderId: number;        
  date: string;
  status: "PENDING" | "READY" | "DELIVERED"; 
  observations?: string;
}