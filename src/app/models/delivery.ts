export interface DeliveryI {
  id?: number;
  order_id: number;
  date: string;
  status: "ACTIVE" | "INACTIVE";
  observations?: string;
}
