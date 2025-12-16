import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import {  useState } from "react";
import { type CartType } from "./interfaces/carts";
import ScrollToTop from "./ScrollToTop";

function App() {
  const [carts, setCarts] = useState<CartType[]>(() => {
    const savedItem = localStorage.getItem('carts')
    return savedItem ? JSON.parse(savedItem) : []
  })

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
          />} path="/cart" />
      </Routes>
    </>

  );
}

export default App
