export interface LensI {
  id?: number;
  image: string;
  type: string;
  material: string;
  treatment?: string;
  price: number;
  stock: number;
  supplier_id: number;
  status: "ACTIVE" | "INACTIVE";
}
