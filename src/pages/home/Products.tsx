import axios from "axios";
import React from "react";
import { type ProductType, type ProductsList } from "../../interfaces/products";
import Product from "./Product";
import { type CartType } from "../../interfaces/carts";
import { fixedDecimalValueOfTwoAddedValues } from "../../utils/fixedDecimalValue";

interface ProductsProps {
  carts: CartType[];
  setCarts: React.Dispatch<React.SetStateAction<CartType[]>>;
  products: ProductsList | null;
  searchTextTitleCase: string;
  searchedProducts: ProductType[] | undefined;
}

export default function Products({ setCarts, products, searchedProducts }: ProductsProps) {

  const handleAddToCart = (product: ProductType, addAmount: number) => {
    const addToCart = async () => {
      const response = await axios.post('https://dummyjson.com/carts/add', {
        userId: 1,
        products: [
          { id: product.id, quantity: addAmount }
        ]
      })
      setCarts(prev => {

        const existing = prev.find(item => item.products[0].id === response.data.products[0].id)
        if (existing) {
          const updated = prev.map(item => item.products[0].id === response.data.products[0].id
            ? {
              ...item,
              discountedTotal: fixedDecimalValueOfTwoAddedValues(item.discountedTotal, response.data.discountedTotal),
              products: [{
                ...item.products[0],
                discountedPrice: fixedDecimalValueOfTwoAddedValues(item.products[0].discountedPrice, response.data.products[0].discountedPrice),
                quantity: fixedDecimalValueOfTwoAddedValues(item.products[0].quantity, response.data.products[0].quantity),
                total: fixedDecimalValueOfTwoAddedValues(item.products[0].total, response.data.products[0].total)
              }],
              total: fixedDecimalValueOfTwoAddedValues(item.total, response.data.total),
              totalQuantity: fixedDecimalValueOfTwoAddedValues(item.totalQuantity, response.data.totalQuantity)
            }
            : item
          )
          localStorage.setItem('carts', JSON.stringify(updated))
          return updated
        }
        else {
          const updated = [...prev, response.data]
          localStorage.setItem('carts', JSON.stringify(updated))
          return updated
        }
      })
    }
    addToCart()
  }

  return (
    <div className="pt-35 flex">
      <div className='w-[20%]'></div>
      <div className='w-[60%]'>
        <div className="grid grid-cols-[100px_100px_100px_100px_100px_100px] gap-x-25 gap-y-3">
          {
            searchedProducts
              ? searchedProducts?.map((product) => {
                return (
                  <Product
                    key={product.id}
                    product={product}
                    handleAddToCart={handleAddToCart}
                  />
                )
              })
              : products?.products.map((product) => {
                return (
                  <Product
                    key={product.id}
                    product={product}
                    handleAddToCart={handleAddToCart}
                  />
                )
              })
          }
        </div>
      </div>
      <div className='w-[20%]'></div>
    </div>
  );
}