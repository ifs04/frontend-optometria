export interface LensI {
  id?: number;
  image: string;
  type: string;
  material: string;
  treatment?: string;
  price: number;
  stock: number;
  supplierId: number; 
}
