import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import { useState } from "react";
import { type CartType } from "./interfaces/carts";
import ScrollToTop from "./ScrollToTop";
import Order from "./pages/order/Order";
import type { OrderType } from "./interfaces/orders";

function App() {
  const [carts, setCarts] = useState<CartType[]>(() => {
    const savedItem = localStorage.getItem('carts')
    return savedItem ? JSON.parse(savedItem) : []
  })

  const [orders, setOrders] = useState<OrderType[]>(() => {
    const savedItem = localStorage.getItem('orders')
    return savedItem ? JSON.parse(savedItem) : []
  })

  console.log('Orders: ',orders, 'Carts',carts)
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={
          <Home
            carts={carts}
            setCarts={setCarts}
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
          />}
          path="/order" />
      </Routes>
    </>

  );
}

export default App
