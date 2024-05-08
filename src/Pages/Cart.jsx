import { useState, useEffect } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import productsData from '../db/products.json';
import { TiTick } from 'react-icons/ti';

const Cart = ({ cart, setCart }) => {
    const [productCart, setProductCart] = useState([]);
    const [subtotal, setSubtotal] = useState(0)

    console.log(cart);
    // console.log(productCart);

    useEffect(() => {
        // fetch('../db/products.json')
        //     .then(res => res.json())
        //     .then(json => {
        // const productCart = json.map(product => {
        const productCart = productsData.map(product => {
            const cartItem = cart.find(item => item.productId === product.id);
            if (cartItem) {
                return {
                    ...product,
                    orderQuantity: cartItem.quantity // Renamed to orderQuantity
                };
            }
            return null; // Return null for products not in the cart
        }).filter(item => item !== null); // Filter out null values
        setProductCart(productCart);
        setSubtotal(cart.reduce((total, item) => total + item.ProductTotalPrice, 0))

        // });
    }, [cart]);


    const handleQuantityChange = (productId, quantity) => {
        const productIndex = cart.findIndex(item => item.productId === productId);
        const updatedCart = [...cart];

        updatedCart[productIndex].ProductTotalPrice = (updatedCart[productIndex].ProductTotalPrice / updatedCart[productIndex].quantity) * quantity
        updatedCart[productIndex].quantity = quantity

        setCart(updatedCart);
    };

    const handleIncreaseQuantity = productId => handleQuantityChange(productId, Math.min(productsData.find(p => p.id == productId).quantity, productCart.find(product => product.id === productId).orderQuantity + 1));

    const handleDecreaseQuantity = productId => handleQuantityChange(productId, Math.max(1, productCart.find(product => product.id === productId).orderQuantity - 1));


    const handleDelete = id => {
        setCart(cart => cart.filter(c => c.productId !== id));
    }
    return (
        <div className="container mx-auto px-4 py-8 ">
            <div className="flex items-center flex-wrap justify-between">
                <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
                <h1 className="text-2xl font-bold mb-4">Subtotal: <span className='text-green-500'>{subtotal}</span> Taka.</h1>
            </div>
            <div className="overflow-x-scroll lg:overflow-x-hidden">
                <table className="table-auto text-nowrap w-full border-collapse border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">No</th>
                            <th className="px-4 py-2">Image</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Stock Quantity</th>
                            <th className="px-4 py-2">Quantity</th>
                            <th className="px-4 py-2">Unit Price</th>
                            <th className="px-4 py-2">Total Price</th>
                            <th className="px-4 py-2">Order </th>
                            <th className="px-4 py-2">Cancel </th>
                        </tr>
                    </thead>
                    <tbody>
                        {productCart?.map((product, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                <td className="px-4 py-2">{index + 1}</td>
                                <td className="px-4 py-2"><img className='max-w-12 max-h-8' src={product.img[0]} alt="" /></td>
                                <td className="px-4 py-2">{product.title}</td>
                                {/* {console.log(product)} */}
                                <td className="px-4 py-2 text-center">{product.quantity}</td>
                                <td className="px-4 py-2">
                                    <div className="flex items-center">
                                        <button onClick={() => handleDecreaseQuantity(product.id)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-l">-</button>
                                        <input type="text" value={product.orderQuantity} className="text-center bg-transparent w-10" readOnly />
                                        <button onClick={() => handleIncreaseQuantity(product.id)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-r">+</button>
                                    </div>
                                </td>
                                <td className="px-4 py-2 text-center">{product.price}</td>
                                <td className="px-4 py-2 text-center">{product.price * product.orderQuantity}</td>
                                <td className="px-4 py-2"><button className="w-full font-bold py-2 px-4 text-green-500 text-4xl flex justify-center"><TiTick /></button></td>
                                <td className="px-4 py-2"><button onClick={() => handleDelete(product.id)} className="w-full text-red-500 text-3xl flex justify-center mx-auto font-bold py-2 px-4 rounded"><MdDeleteForever /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Cart;
