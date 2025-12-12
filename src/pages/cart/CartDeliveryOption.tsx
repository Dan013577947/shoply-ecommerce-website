import type React from "react";
import { useState } from "react";
import type { CartType } from "../../interfaces/carts";
import fixedDecimalValue from "../../utils/fixedDecimalValue";

interface DeliveryOptionCartProp {
  cart: CartType;
}

interface DeliveryOption {
  value:string;
}
export default function CartDeliveryOption({ cart }: DeliveryOptionCartProp) {

  const [deliveryOption, setDeliveryOption] = useState<DeliveryOption>({value:"Monday, December 15"})

  const handleDeliveryOption = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setDeliveryOption({value:value})
  }

  const totalValue = cart.total

  return (
    <div key={cart.products[0].id} className="bg-white mb-4 w-200 h-70 p-4 border border-gray-300 rounded-[5px] shadow-[0_0_2px_rgba(0,0,0,0.1)]">
      <div className="text-[18px] font-bold text-red-700">Delivery date: {deliveryOption.value}</div>
      <div className="flex">
        <img src={cart.products[0].thumbnail} className="w-40" />
        <div className="flex flex-col py-3 w-[35%]">
          <div className="font-[500] text-[17px]">{cart.products[0].title}</div>
          <div className="text-red-600 font-[500] py-1">{"\u20B1"}{fixedDecimalValue(totalValue)}</div>
          <div className="flex justify-between w-[80%]">
            <div>Quantity: {cart.products[0].quantity}</div>
            <button className="text-blue-500 cursor-pointer">Update</button>
            <button className="text-blue-500 cursor-pointer">Delete</button>
          </div>
        </div>
        <div className="py-3">
          <div className="font-[500] text-[17px]">Choose a delivery option:</div>
          <div>
            <div className="flex my-3">
              <input type="radio" name={`option-${cart.products[0].id}`} value="Monday, December 15" onChange={(event) => {
                
                handleDeliveryOption(event)
              }} defaultChecked className="mx-2 cursor-pointer" />
              <div>
                <div className="-my-1 text-red-700 font-[500]">Monday, December 15</div>
                <div className="-my-1 text-gray-400">Free Shipping</div>
              </div>
            </div>
            <div className="flex my-3">
              <input type="radio" name={`option-${cart.products[0].id}`} value="Tuesday, December 16" onChange={(event) => {
                handleDeliveryOption(event)
              }} className="mx-2 cursor-pointer" />
              <div>
                <div className="-my-1 text-red-700 font-[500]">Tuesday, December 16</div>
                <div className="-my-1 text-gray-400">4.99 Shipping</div>
              </div>
            </div>
            <div className="flex my-3">
              <input type="radio" name={`option-${cart.products[0].id}`} value="Friday, December 19" onChange={(event) => {
                handleDeliveryOption(event)
              }} className="mx-2 cursor-pointer" />
              <div>
                <div className="-my-1 text-red-700 font-[500]">Friday, December 19</div>
                <div className="-my-1 text-gray-400">9.99 Shipping</div>
              </div>
            </div>

          </div>
        </div>


      </div>

    </div>
  );
}