
export interface Order {
  id:number;
  title: string;
  deliveryDate: string | undefined;
  quantity: number;
}

export interface OrderType {
  orderDate: string;
  orders:Order[];
  total: number;
}

