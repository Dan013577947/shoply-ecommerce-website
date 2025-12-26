import type { Dayjs } from "dayjs";
import type { Order_ } from "./orders";

export interface TrackingProp {
  order: Order_;
  orderDate: Dayjs;
}