export interface OrderDetailI {
  id?: number;
  order_id: number;  
  product_type: "LENS" | "FRAME";
  product_id: number; 
  quantity: number;
  unit_price: number;
  graduation?: string;
  subtotal: number;
  status: "ACTIVE" | "INACTIVE";
}