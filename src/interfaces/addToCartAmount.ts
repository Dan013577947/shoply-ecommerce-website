import type React from "react";
import type { CartType } from "./carts";

export interface AddToCartProps{
  carts:CartType[];
  setCarts:React.Dispatch<React.SetStateAction<CartType[]>>;
  handleSearchResult: (event:React.ChangeEvent<HTMLInputElement>)=>void;
}