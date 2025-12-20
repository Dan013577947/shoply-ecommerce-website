import type React from "react";
import { useEffect, useState } from "react";
import type { CartType } from "../../interfaces/carts";
import { fixedDecimalValue } from "../../utils/fixedDecimalValue";
import { type DeliveryOption } from "../../interfaces/deliveryOption";

interface DeliveryOptionCartProp {
  cart: CartType;
  setTotalShipping: React.Dispatch<React.SetStateAction<DeliveryOption[]>>;
  handleDeleteCart: (deliveryOption: DeliveryOption) => void;
  handleClickUpdateCart: (deliveryOption: DeliveryOption, updateInput: number) => void;
  handleEnterUpdateCart: (event: React.KeyboardEvent<HTMLInputElement>, deliveryOption: DeliveryOption, updateInput:number, setUpdateStatus:React.Dispatch<React.SetStateAction<boolean>>) => void;
  dateNow:string;
  date2DaysAfter:string;
  date8DaysAfter:string;
}

export default function CartDeliveryOption({ cart, handleDeleteCart, handleClickUpdateCart, handleEnterUpdateCart, setTotalShipping, dateNow, date2DaysAfter, date8DaysAfter }: DeliveryOptionCartProp) {

  const [deliveryOption, setDeliveryOption] = useState<DeliveryOption>({ id: cart.products[0].id, date: date8DaysAfter, shippingPrice: "0.00" })


  const handleDeliveryOption = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = JSON.parse(event.target.value).date
    const shippingPrice = JSON.parse(event.target.value).shippingPrice
    const id = JSON.parse(event.target.value).id
    setDeliveryOption({ id: id, date: date, shippingPrice: shippingPrice })
  }
  const totalValue = cart.total
  useEffect(() => {
    setTotalShipping(prev => {
      const existing = prev.find(item => item.id === deliveryOption.id)
      if (existing) {
        const updated = prev.map(item => item.id === deliveryOption.id
          ? { ...item, shippingPrice: deliveryOption.shippingPrice }
          : item
        )
        return updated
      }
      else {
        const updated = [...prev, deliveryOption]
        return updated
      }
    })
  }, [deliveryOption])


  const [updateStatus, setUpdateStatus] = useState<boolean>(false)
  const [updateInput, setUpdateInput] = useState<number>(cart.totalQuantity)

  const handleUpdateStatus = () => {
    setUpdateStatus(prev => !prev)
  }

  const handleUpdateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateInput(Number(event.target.value))
  }

  return (
    <div key={cart.products[0].id} className="bg-white mb-4 w-200 h-70 p-4 border border-gray-300 rounded-[5px] shadow-[0_0_2px_rgba(0,0,0,0.1)]">
      <div className="text-[18px] font-bold text-red-700">Delivery date: {deliveryOption.date}</div>
      <div className="flex">
        <img src={cart.products[0].thumbnail} className="w-40" />
        <div className="flex flex-col py-3 w-[35%]">
          <div className="font-[500] text-[17px]">{cart.products[0].title}</div>
          <div className="text-red-600 font-[500] py-1">&#36;{fixedDecimalValue(totalValue)}</div>
          <div className="flex justify-between w-[80%]">
            <div className="flex">
              <div className="mr-1">Quantity:</div>
              {updateStatus
                ? <div>
                  <input type="text" className="border border-gray-300 px-1 w-7" onChange={handleUpdateInput} placeholder={String(cart.products[0].quantity)} onKeyDown={(event) => {
                    handleEnterUpdateCart(event, deliveryOption, updateInput, setUpdateStatus)
                    
                  }} />
                </div>
                : <div>{cart.products[0].quantity}</div>
              }
            </div>
            {updateStatus
              ? <button className="text-blue-500 cursor-pointer" onClick={() => {
                handleClickUpdateCart(deliveryOption, updateInput)
                handleUpdateStatus()
              }}>Apply</button>
              : <button className="text-blue-500 cursor-pointer" onClick={() => {
                handleUpdateStatus()
              }}>Update</button>
            }

            <button className="text-blue-500 cursor-pointer" onClick={() => handleDeleteCart(deliveryOption)}>Delete</button>
          </div>
        </div>
        <div className="py-3">
          <div className="font-[500] text-[17px]">Choose a delivery option:</div>
          <div>
            <div className="flex my-3">
              <input type="radio" name={`option-${cart.products[0].id}`} value={JSON.stringify({
                id: cart.products[0].id,
                date: date8DaysAfter,
                shippingPrice: "0.00"
              })} onChange={(event) => {

                handleDeliveryOption(event)
              }} defaultChecked className="mx-2 cursor-pointer" />
              <div>
                <div className="-my-1 text-red-700 font-[500]">{date8DaysAfter}</div>
                <div className="-my-1 text-gray-400">Free Shipping</div>
              </div>
            </div>
            <div className="flex my-3">
              <input type="radio" name={`option-${cart.products[0].id}`} value={JSON.stringify({
                id: cart.products[0].id,
                date: date2DaysAfter,
                shippingPrice: "4.99"
              })} onChange={(event) => {
                handleDeliveryOption(event)
              }} className="mx-2 cursor-pointer" />
              <div>
                <div className="-my-1 text-red-700 font-[500]">{date2DaysAfter}</div>
                <div className="-my-1 text-gray-400">$4.99 Shipping</div>
              </div>
            </div>
            <div className="flex my-3">
              <input type="radio" name={`option-${cart.products[0].id}`} value={JSON.stringify({
                id: cart.products[0].id,
                date: dateNow,
                shippingPrice: "9.99"
              })} onChange={(event) => {
                handleDeliveryOption(event)
              }} className="mx-2 cursor-pointer" />
              <div>
                <div className="-my-1 text-red-700 font-[500]">{dateNow}</div>
                <div className="-my-1 text-gray-400">$9.99 Shipping</div>
              </div>
            </div>

          </div>
        </div>


      </div>

    </div>
  );
}