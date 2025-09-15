export interface OrderDetailI {
  id?: number;
  orderId: number;  
  productType: "LENS" | "FRAME";
  productId: number; 
  quantity: number;
  unitPrice: number;
  graduation?: string;
  subtotal: number;
}