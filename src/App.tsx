import { Route, Routes } from "react-router";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import { useEffect, useState } from "react";
import { type CartType } from "./interfaces/carts";

function App() {
  const [carts, setCarts] = useState<CartType[]>(() => {
    const savedItem = localStorage.getItem('carts')
    return savedItem ? JSON.parse(savedItem) : []
  })

  const [totalAddToCartAmount, setTotalAddToCartAmount] = useState<number>(carts.reduce((sum,item)=> sum + item.totalQuantity, 0) || 0)

  useEffect(() => {
    setTotalAddToCartAmount(() => carts.reduce((sum, item) => sum + item.products[0].quantity, 0))
  }, [carts])

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
          carts={carts}
          setCarts={setCarts}
          totalAddToCartAmount={totalAddToCartAmount}
          setTotalAddToCartAmount={setTotalAddToCartAmount}
        />} path="/cart" />
    </Routes>
  );
}

export default App
