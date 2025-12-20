import type { CartType } from "../../interfaces/carts";

interface OrderProp {
  carts:CartType[]
}
export default function Order({carts}:OrderProp){
  return(
    <div>
      Order
    </div>
  );
}