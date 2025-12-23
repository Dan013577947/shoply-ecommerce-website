
export interface Order {
  id:number;
  title: string;
  deliveryDate: string | undefined;
  quantity: number;
  price:number;
  image:string;
}

export interface OrderType {
  id:string;
  orderDate: string;
  orders:Order[];
  total: number;
}

