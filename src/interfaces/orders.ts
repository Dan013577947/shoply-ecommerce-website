export interface OrderType {
  id: number;
  orderDate: string;
  orders: {
    title: string;
    deliveryDate: string;
    quantity: number;
  }
  total: number;
}