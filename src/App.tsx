import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import { useEffect, useState } from "react";
import { type CartType } from "./interfaces/carts";
import ScrollToTop from "./ScrollToTop";
import Order from "./pages/order/Order";
import type { OrderType } from "./interfaces/orders";
import type { ProductsList, ProductType } from "./interfaces/products";
import axios from "axios";

function App() {
  const [carts, setCarts] = useState<CartType[]>(() => {
    const savedItem = localStorage.getItem('carts')
    return savedItem ? JSON.parse(savedItem) : []
  })

  const [orders, setOrders] = useState<OrderType[]>(() => {
    const savedItem = localStorage.getItem('orders')
    return savedItem ? JSON.parse(savedItem) : []
  })

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
    <>
      <ScrollToTop />
      <Routes>
        <Route element={
          <Home
            carts={carts}
            setCarts={setCarts}
            searchedProducts={searchedProducts}
            productsList={productsList}
            handleSearchResult={handleSearchResult}
            handleSearchButton={handleSearchButton}
            onKeyDownSearch={onKeyDownSearch}
          />} path="/" />
        <Route element={
          <Cart
            carts={carts}
            setCarts={setCarts}
            setOrders={setOrders}
          />} path="/cart" />
        <Route element={
          <Order
            orders={orders}
            setOrders={setOrders}
            carts={carts}
            setCarts={setCarts}
            handleSearchResult={handleSearchResult}
            handleSearchButton={handleSearchButton}
            onKeyDownSearch={onKeyDownSearch}
          />}
          path="/order" />
      </Routes>
    </>

  );
}

export default App
