import axios from "axios";
import { type ProductsList } from "../../interfaces/products";
import Header from "../../components/Header";
import Products from "./Products";
import Footer from "../../components/Footer";
import React, { useState, useEffect } from "react";
import type { AddToCartProps } from "../../interfaces/addToCartAmount";

export default function Home({ carts, setCarts }: AddToCartProps) {
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

  const [searchText, setSearchText] = useState<string>('')
  const handleSearchResult = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value)
  }

  return (
    <div>
      <title>Shoply</title>
      <Header
        carts={carts}
        setCarts={setCarts}
        handleSearchResult={handleSearchResult}
      />
      <Products
        carts={carts}
        setCarts={setCarts}
        products={productsList}
        searchText={searchText}
      />
      <Footer />
    </div>
  );
}