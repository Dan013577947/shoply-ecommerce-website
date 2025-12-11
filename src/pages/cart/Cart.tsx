import { Link } from "react-router";
import type { AddToCartProps } from "../../interfaces/addToCartAmount";
import type React from "react";

export default function Cart({ carts, totalAddToCartAmount }: AddToCartProps) {
  console.log(carts)
  return (
    <div>
      <div className="bg-gradient-to-l from-orange-500 to-red-500 flex h-30 items-center">
        <div className="w-[20%]"></div>
        <div className="w-[60%]">
          <div className="flex justify-between items-center">
            <Link to='/' className='flex justify-between items-center w-[145px] cursor-pointer'>
              <img className='w-[45px]' src="/shoply-icon.png" alt="shoply-icon" />
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
      <div className="flex">
        <div className='w-[20%]'></div>
        <div className='w-[60%]'>
          <div>
            <p className="text-[23px] font-bold pt-[40px] pb-3">Review your Order</p>
          </div>
          <div className="flex">
            <div>
              {carts.map(cart => {
                const handleDeliveryOption = (event: React.ChangeEvent<HTMLInputElement>) => {
                  console.log(event.target.value)
                }
                return (
                  <div key={cart.products[0].id} className=" bg-white mb-4 w-200 h-70 p-4 border border-gray-300 rounded-[5px] shadow-[0_0_2px_rgba(0,0,0,0.1)]">
                    <div className="text-[18px] font-bold text-red-700">Delivery date: Friday, December 19</div>
                    <div className="flex">
                      <img src={cart.products[0].thumbnail} className="w-40" />
                      <div className="flex flex-col py-3 w-[35%]">
                        <div className="font-[500] text-[17px]">{cart.products[0].title}</div>
                        <div className="text-red-600 font-[500] py-1">{"\u20B1"}{cart.total}</div>
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
                            <input type="radio" name={`option-${cart.products[0].id}`} value="Monday" onChange={handleDeliveryOption} defaultChecked className="mx-2 cursor-pointer" />
                            <div>
                              <div className="-my-1 text-red-700 font-[500]">Monday, December 15</div>
                              <div className="-my-1 text-gray-400">Free Shipping</div>
                            </div>
                          </div>
                          <div className="flex my-3">
                            <input type="radio" name={`option-${cart.products[0].id}`} value="Tuesday" onChange={handleDeliveryOption} className="mx-2 cursor-pointer" />
                            <div>
                              <div className="-my-1 text-red-700 font-[500]">Tuesday, December 16</div>
                              <div className="-my-1 text-gray-400">4.99 Shipping</div>
                            </div>
                          </div>
                          <div className="flex my-3">
                            <input type="radio" name={`option-${cart.products[0].id}`} value="Friday" onChange={handleDeliveryOption} className="mx-2 cursor-pointer" />
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
              })}
            </div>
            <div>Order Summary</div>
          </div>

        </div>
        <div className='w-[20%]'></div>
      </div>
    </div>
  );
}