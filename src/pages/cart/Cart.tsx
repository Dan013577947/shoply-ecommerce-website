import { Link } from "react-router";
import type { AddToCartProps } from "../../interfaces/addToCartAmount";
import CartDeliveryOption from "./CartDeliveryOption";
import { cartOverallTotal } from "../../utils/cartOverallTotal";
import { fixedDecimalValue, fixedDecimalValueOfTwoAddedValues } from "../../utils/fixedDecimalValue";
import { useState } from "react";
import type { DeliveryOption } from "../../interfaces/deliveryOption";
import ShoplyIcon from "../../assets/shoply-icon.png"

export default function Cart({ carts, setCarts, totalAddToCartAmount }: AddToCartProps) {
  const [totalShipping, setTotalShipping] = useState<DeliveryOption[]>([])
  const totalShippingAmount = totalShipping.reduce((sum, item) => fixedDecimalValueOfTwoAddedValues(sum, JSON.parse(item.shippingPrice)), 0)

  const handleDeleteCart = (deliveryOption: DeliveryOption) => {
    setCarts(prev => {
      const existing = prev.find(item => item.products[0].id === deliveryOption.id)
      if (existing) {
        const updated = prev.filter(item => item.products[0].id !== deliveryOption.id)

        localStorage.setItem('carts', JSON.stringify(updated))
        return updated
      }
      else return prev
    })
  }

  return (
    <div>
      <title>Cart</title>
      <div className="bg-gradient-to-l from-orange-500 to-red-500 flex h-30 items-center fixed w-full">
        <div className="w-[20%]"></div>
        <div className="w-[60%]">
          <div className="flex justify-between items-center">
            <Link to='/' className='flex justify-between items-center w-[145px] cursor-pointer'>
              <img className='w-[45px]' src={ShoplyIcon} alt="shoply-icon" />
              <p className='text-[30px] text-white'>Shoply</p>
            </Link>
            <div className="text-[20px] font-bold text-white">
              Checkout(
              <span className="font-normal italic">
                {`${totalAddToCartAmount} items`}
              </span>
              )
            </div>
            <div className="w-[145px]"></div>
          </div>
        </div>
        <div className="w-[20%]"></div>
      </div>
      <div className="flex pt-30">
        <div className='w-[20%]'></div>
        <div className='w-[60%]'>
          <div>
            <p className="text-[23px] font-bold pt-[40px] pb-3">Review your Order</p>
          </div>
          <div className="flex justify-between">
            <div>

              {carts.length > 0
                ? carts.map(cart => {
                  return (
                    <CartDeliveryOption cart={cart} key={cart.products[0].id} setTotalShipping={setTotalShipping} handleDeleteCart={handleDeleteCart} />
                  );
                })
                :
                <div className="w-200">
                  <div>Your cart is empty</div>
                  <div>
                    <Link to='/'>
                      <button className="bg-yellow-300 cursor-pointer w-30  text-[15px] py-2 rounded-[10px] active:bg-yellow-500 shadow-[0_0_4px_rgba(0,0,0,0.3)] mt-2">View Products</button>
                    </Link>

                  </div>
                </div>
              }
            </div>
            <div className="bg-white h-80 w-85 ml-4 p-4 flex flex-col justify-between">
              <div>
                <p className="font-bold text-[18px]">Order Summary</p>
              </div>
              <div>
                <div className="flex justify-between py-1">
                  <p>Items ({totalAddToCartAmount}):</p>
                  <p>&#36;{fixedDecimalValue(cartOverallTotal(carts))}</p>
                </div>
                <div className="flex justify-between py-1">
                  <p>Shipping & handling:</p>
                  <p>&#36;{fixedDecimalValue(totalShippingAmount)}</p>
                </div>
                <div className="flex justify-between py-1">
                  <p>Total before tax:</p>
                  <p>&#36;{fixedDecimalValue(fixedDecimalValueOfTwoAddedValues(cartOverallTotal(carts), totalShippingAmount))}</p>
                </div>
                <div className="flex justify-between py-1">
                  <p>Estimated tax (10%)</p>
                  <p>&#36;{fixedDecimalValue(fixedDecimalValueOfTwoAddedValues(cartOverallTotal(carts), totalShippingAmount) / 10)}</p>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-4 text-[19px] font-bold text-red-700">
                  <p>Order total:</p>
                  <p>&#36;{fixedDecimalValue(fixedDecimalValueOfTwoAddedValues(fixedDecimalValueOfTwoAddedValues(cartOverallTotal(carts), totalShippingAmount) / 10, fixedDecimalValueOfTwoAddedValues(cartOverallTotal(carts), totalShippingAmount)))}</p>
                </div>
              </div>
              <div>
                <button className="bg-yellow-300 cursor-pointer w-full text-[14px] py-3 rounded-[10px] active:bg-yellow-500 shadow-[0_0_4px_rgba(0,0,0,0.1)]">Place your order</button>
              </div>

            </div>
          </div>

        </div>
        <div className='w-[20%]'></div>
      </div>
    </div>
  );
}