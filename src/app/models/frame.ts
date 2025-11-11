export interface FrameI {
  id?: number;
  brand: string;
  model: string;
  material: string;
  color: string;
  price: number;
  stock: number;
  supplier_id: number; 
  image: string;
  status: "ACTIVE" | "INACTIVE";
}