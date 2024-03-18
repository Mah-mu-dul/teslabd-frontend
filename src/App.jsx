import { Route, Routes } from "react-router-dom"
import Products from "./Pages/Products"
import Navbar from "./Components/Navbar"
import Home from "./Pages/Home"
import Orders from "./Pages/Orders"
import Cart from "./Pages/Cart"
import Profile from "./Pages/Profile"
import Signin from "./Pages/Signin"
import Signup from "./Pages/Signup"

function App() {

  return (
    <main className="w-full max-w-[1500px] mx-auto bg-lime-100 min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={< Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </main>
  )
}

export default App
