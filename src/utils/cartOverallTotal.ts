import type { CartType } from "../interfaces/carts"
import { fixedDecimalValueOfTwoAddedValues } from "./fixedDecimalValue"


export const cartOverallTotal = (carts: CartType[]) => {

  let totalOverallValue: number = 0
  carts.map(cart => {
    totalOverallValue = fixedDecimalValueOfTwoAddedValues(totalOverallValue, cart.total)
  })
  
  return totalOverallValue
}