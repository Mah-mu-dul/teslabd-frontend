import { Route, Routes } from "react-router-dom"
import Products from "./Pages/Products"
import Navbar from "./Components/Navbar"
import Home from "./Pages/Home"
import Orders from "./Pages/Orders"
import Cart from "./Pages/Cart"
import Profile from "./Pages/Profile"
import Signin from "./Pages/Signin"
import Signup from "./Pages/Signup"
import AddProduct from "./Pages/AddProduct"
import { useEffect, useState } from "react"
import { ToastContainer } from "react-toastify"

function App() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [checkoutSelectedProducts, setCheckoutSelectedProducts] = useState(JSON.parse(localStorage?.getItem('checkoutSelectedProducts')) || []);
  const [placedOrders, setPlacedOrders] = useState(JSON.parse(localStorage.getItem('placedOrders')) || []);


  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('checkoutSelectedProducts', JSON.stringify(checkoutSelectedProducts));
    localStorage.setItem('placedOrders', JSON.stringify(placedOrders));

  }, [cart, checkoutSelectedProducts, placedOrders]);


  return (
    <main className="w-full max-w-[1500px] mx-auto bg-lime-100 min-h-screen">
      <div className=" z-10">
        <ToastContainer
          closeOnClick
        />
      </div>
      <Navbar cart={cart} />
      <Routes>
        <Route path="/" element={< Home />} />
        <Route path="/products" element={<Products cart={cart} setCart={setCart} />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/orders" element={
          <Orders
            checkoutSelectedProducts={checkoutSelectedProducts}
            setCheckoutSelectedProducts={setCheckoutSelectedProducts}
            placedOrders={placedOrders}
            setPlacedOrders={setPlacedOrders}
            cart={cart}
            setCart={setCart}
          />}
        />
        <Route path="/cart" element={
          <Cart
            cart={cart}
            setCart={setCart}
            checkoutSelectedProducts={checkoutSelectedProducts}
            setCheckoutSelectedProducts={setCheckoutSelectedProducts}
          />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </main>
  )
}

export default App
