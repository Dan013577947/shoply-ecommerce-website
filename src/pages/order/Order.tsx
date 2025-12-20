
import type { OrderType } from "../../interfaces/orders";

interface OrderProp {
  orders:OrderType[]
}
export default function Order({orders}:OrderProp){
  console.log(orders)
  return(
    <div>
      Order
    </div>
  );
}