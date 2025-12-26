import type { Dayjs } from "dayjs";

export interface DeliveryOption {
  id: number;
  date: Dayjs;
  shippingPrice: string;
}