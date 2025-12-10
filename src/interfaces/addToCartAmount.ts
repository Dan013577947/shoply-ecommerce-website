import type { CartType } from "./carts";

export interface AddToCartProps{
  carts:CartType[];
  setCarts:React.Dispatch<React.SetStateAction<CartType[]>>;
  totalAddToCartAmount:number;
  setTotalAddToCartAmount:React.Dispatch<React.SetStateAction<number>>
}