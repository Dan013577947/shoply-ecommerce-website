import axios from "axios";
import { type ProductsList } from "../../interfaces/products";
import Header from "../../components/Header";
import Products from "./Products";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import type { AddToCartProps } from "../../interfaces/addToCartAmount";

export default function Home({totalAddToCartAmount, setTotalAddToCartAmount}: AddToCartProps) {
  const [productsList, setProductsList] = useState<ProductsList | null>(null);
    
useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<ProductsList>('https://dummyjson.com/products')
        setProductsList(response.data)
      }
      catch (error) {
        console.log("Error fetching products", error)
      }
    }
    fetchProducts()
  }, [])
  return (
    <div>
      <Header
        totalAddToCartAmount={totalAddToCartAmount}
        setTotalAddToCartAmount={setTotalAddToCartAmount}
      />
      <Products
        products={productsList}
        totalAddToCartAmount={totalAddToCartAmount}
        settotalAddToCartAmount={setTotalAddToCartAmount}
      />
      <Footer />
    </div>
  );
}