import axios from "axios";
import { type ProductsList, type ProductType } from "../../interfaces/products";
import Header from "../../components/Header";
import Products from "./Products";
import Footer from "../../components/Footer";
import React, { useState, useEffect } from "react";
import type { CartType } from "../../interfaces/carts";

interface HomeProp {
  carts: CartType[];
  setCarts: React.Dispatch<React.SetStateAction<CartType[]>>;
}
export default function Home({ carts, setCarts }: HomeProp) {
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

  const [searchedProducts, setSearchedProducts] = useState<ProductType[] | undefined>(undefined)

  const handleSearchButton = () => {
    setSearchedProducts(productsList?.products.filter(product => product.title.toLowerCase().includes(searchText.trim().toLowerCase())))
  }

  const onKeyDownSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setSearchedProducts(productsList?.products.filter(product => product.title.toLowerCase().includes(searchText.trim().toLowerCase())))
    }
  }

  return (
    <div>
      <title>Shoply</title>
      <Header
        carts={carts}
        setCarts={setCarts}
        handleSearchResult={handleSearchResult}
        handleSearchButton={handleSearchButton}
        onKeyDownSearch={onKeyDownSearch}
      />
      <Products
        carts={carts}
        setCarts={setCarts}
        products={productsList}
        searchedProducts={searchedProducts}
      />
      <Footer />
    </div>
  );
}