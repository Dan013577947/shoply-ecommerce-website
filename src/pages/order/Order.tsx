import type { CartType } from "../../interfaces/carts";

interface OrderProp {
  carts:CartType[]
}
export default function Order({carts}:OrderProp){
  console.log(carts)
  return(
    <div>
      Order
    </div>
  );
}