import { Route, Routes } from "react-router";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import { useState } from "react";
import { type CartType } from "./interfaces/carts";

function App() {
  const [carts, setCarts] = useState<CartType[]>(() => {
    const savedItem = localStorage.getItem('carts')
    return savedItem ? JSON.parse(savedItem) : []
  })
  let totalQuantityInsideCart: number = 0;

  if (carts) {
    carts.map(cart => {
      totalQuantityInsideCart += cart.totalQuantity
    })
  }
  
  const [totalAddToCartAmount, setTotalAddToCartAmount] = useState<number>(totalQuantityInsideCart)

  return (
    <Routes>
      <Route element={
        <Home
          carts={carts}
          setCarts={setCarts}
          totalAddToCartAmount={totalAddToCartAmount}
          setTotalAddToCartAmount={setTotalAddToCartAmount}
        />} path="/" />
      <Route element={
        <Cart
        />} path="/cart" />
    </Routes>
  );
}

export default App
