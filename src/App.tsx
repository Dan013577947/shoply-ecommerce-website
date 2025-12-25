import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import React, { useEffect, useState } from "react";
import { type CartType } from "./interfaces/carts";
import ScrollToTop from "./ScrollToTop";
import Order from "./pages/order/Order";
import type { Order_, OrderType } from "./interfaces/orders";
import type { ProductsList, ProductType } from "./interfaces/products";
import axios from "axios";
import { fixedDecimalValueOfTwoAddedValues } from "./utils/fixedDecimalValue";
import Track from "./pages/track/Track";
import type { TrackingProp } from "./interfaces/track";


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

  const handleAddToCart = (productId: number, addAmount: number) => {
    const addToCart = async () => {
      const response = await axios.post('https://dummyjson.com/carts/add', {
        userId: 1,
        products: [
          { id: productId, quantity: addAmount }
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

  const [trackOrder, setTrackOrder] = useState<TrackingProp | null>(() => {
    const savedItem = localStorage.getItem('track')
    return savedItem ? JSON.parse(savedItem) : null
  })
  const handleTrackPage = (order: Order_, orderDate: string) => {
    setTrackOrder(() => {
      const trackOrder = {
        order: order,
        orderDate: orderDate
      }
      localStorage.setItem('track', JSON.stringify(trackOrder))
      return trackOrder
    })
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
            handleAddToCart={handleAddToCart}
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
            handleAddToCart={handleAddToCart}
            handleTrackPage={handleTrackPage}
          />}
          path="/order" />
        <Route
          element={
            <Track
              carts={carts}
              setCarts={setCarts}
              handleSearchResult={handleSearchResult}
              handleSearchButton={handleSearchButton}
              onKeyDownSearch={onKeyDownSearch}
              trackOrder={trackOrder}

            />}
          path="/track"
        />
      </Routes>
    </>

  );
}

export default App
