import { useEffect, useState } from "react";
import axios from "axios";
import { type CartList } from "../../interfaces/carts";
import { Link } from "react-router";

export default function Cart() {
  const [carts, setCarts] = useState<CartList | null>(null)

  useEffect(() => {
    const fetchCartData = async () => {
      const response = await axios.get('https://dummyjson.com/carts')
      setCarts(response.data)
    }
    fetchCartData()
  }, [])


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
                {`11 items`}
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
            <p className="text-[20px] font-bold pt-[40px]">Review your Order</p>
          </div>
          <div className="flex justify-between">
            <div>
              {carts?.carts.map(cart=>{
                return(
                  <div key={cart.id} className="bg-white my-10">
                    {cart.products.map(product=>{
                      return(
                        <div>
                          {product.title}
                        </div>
                      );
                    })}
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