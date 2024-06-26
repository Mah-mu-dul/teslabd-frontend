import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ cart }) => {

    const [totalPrice, setTotalPrice] = useState(0)
    useEffect(() => {
        setTotalPrice(cart.reduce((total, item) => total + item.ProductTotalPrice, 0))
    }, [cart])
    const navitems = <>
        <li><NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active bg-gray-300 px-5 py-2 rounded-md" : "px-5 py-2"} to="/">Home</NavLink></li>
        <li><NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active bg-gray-300 px-5 py-2 rounded-md" : "px-5 py-2"} to="/products">Products</NavLink></li>
        <li><NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active bg-gray-300 px-5 py-2 rounded-md" : "px-5 py-2"} to="/addProduct">Add Product</NavLink></li>
        <li><NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active bg-gray-300 px-5 py-2 rounded-md" : "px-5 py-2"} to="/orders">Orders</NavLink></li>
        <select className="select select-ghost w-fit ">
            <option disabled selected>Category</option>
            <option>Micro Processor</option>
            <option>Motor</option>
            <option>Battery</option>
            <option>Motor Driver</option>
        </select>
    </>
    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start lg:hidden block w-fit">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {
                                navitems
                            }
                        </ul>
                    </div>
                </div>
                <div className=" w-fit mx-auto">
                    <NavLink to="/" className="btn btn-ghost text-xl">Tesla BD</NavLink>
                </div>
                <div className="mx-auto hidden lg:block">
                    <ul className="flex gap-5 items-center">
                        {navitems}
                    </ul>
                </div>
                <div className="flex-none">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                <span className="badge badge-sm indicator-item">{cart.length} </span>
                            </div>
                        </div>
                        <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                            <div className="card-body">
                                <span className="font-bold text-lg">{cart.length} {cart.length > 1 ? "Items" : "Item"} </span>
                                <span className="text-info">Subtotal:  {totalPrice} /-</span>
                                <div className="card-actions">
                                    <NavLink to="/cart" className="btn btn-primary btn-block">View cart</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="profile" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <NavLink to="/profile" className="justify-between">
                                    Profile
                                </NavLink>
                            </li>
                            <li><a>Settings</a></li>
                            <li><NavLink to="/signin">Logout</NavLink></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;