import axios from "axios";
import React, { useState } from "react";
import { type Cart } from "../../interfaces/carts";
import { type ProductType, type ProductsList } from "../../interfaces/products";
import Product from "./Product";

interface ProductsProps {
  products: ProductsList | null;
  setTotalAddToCartAmount: React.Dispatch<React.SetStateAction<number>>
}

export default function Products({ products, setTotalAddToCartAmount }: ProductsProps) {
  const [carts, setCarts] = useState<Cart[]>(()=>{
    const savedItem = localStorage.getItem('carts')
    return savedItem ? JSON.parse(savedItem) : []
  })

  const handleAddToCart = (product:ProductType, addAmount:number) => {
    const addToCart = async () => {
      const response = await axios.post('https://dummyjson.com/carts/add', {
        userId: 1,
        products: [
          { id: product.id, quantity: addAmount }
        ]
      })
      setCarts(prev=>{
        const updated = [...prev, response.data]
        localStorage.setItem('carts', JSON.stringify(updated))
        return updated
      })
    }
    addToCart()
    setTotalAddToCartAmount(prev => prev + addAmount);
  }

  console.log(carts)
  return (
    <div className="pt-35 flex">
      <div className='w-[20%]'></div>
      <div className='w-[60%]'>
        <div className="grid grid-cols-[100px_100px_100px_100px_100px_100px] gap-x-25 gap-y-3">
          {products?.products.map((product) => {
            return (
              <Product
                key={product.id}
                product={product}
                handleAddToCart={handleAddToCart}
              />
            );
          })}
        </div>
      </div>
      <div className='w-[20%]'></div>
    </div>
  );
}