import type { Dayjs } from "dayjs";

export interface Order_ {
  id:number;
  title: string;
  deliveryDate: Dayjs | undefined;
  quantity: number;
  price:number;
  image:string;
}

export interface OrderType {
  id:string;
  orderDate: Dayjs;
  orders:Order_[];
  total: number;
}

