import { useState, useEffect } from 'react';
import { MdDeleteForever } from 'react-icons/md';

const Cart = ({ cart, setCart }) => {
    const [productCart, setProductCart] = useState([]);
    console.log(cart);
    // console.log(productCart);

    useEffect(() => {
        fetch('../db/products.json')
            .then(res => res.json())
            .then(json => {
                const productCart = json.map(product => {
                    const cartItem = cart.find(item => item.productId === product.id);
                    console.log(cartItem);
                    if (cartItem) {
                        return {
                            ...product,
                            orderQuantity: cartItem.quantity // Renamed to orderQuantity
                        };
                    }
                    return null; // Return null for products not in the cart
                }).filter(item => item !== null); // Filter out null values
                setProductCart(productCart);
            });
    }, [cart]);


    const handleQuantityChange = (productId, quantity) => {
        const productIndex = cart.findIndex(item => item.productId === productId);
        const updatedCart = [...cart];

        updatedCart[productIndex].quantity = quantity

        setCart(updatedCart);
    };

    const handleIncreaseQuantity = productId => handleQuantityChange(productId, productCart.find(product => product.id === productId).orderQuantity + 1);

    const handleDecreaseQuantity = productId => handleQuantityChange(productId, Math.max(1, productCart.find(product => product.id === productId).orderQuantity - 1));


    const handleDelete = id => {
        setCart(cart => cart.filter(c => c.productId !== id));
    }
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
            <table className="table-auto w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2">No</th>
                        <th className="px-4 py-2">Image</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Quantity</th>
                        <th className="px-4 py-2">Unit Price</th>
                        <th className="px-4 py-2">Total Price</th>
                        <th className="px-4 py-2">Order Btn</th>
                        <th className="px-4 py-2">Cancel Btn</th>
                    </tr>
                </thead>
                <tbody>
                    {productCart?.map((product, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                            <td className="px-4 py-2">{index + 1}</td>
                            <td className="px-4 py-2"><img className='max-w-12 max-h-8' src={product.img[0]} alt="" /></td>
                            <td className="px-4 py-2">{product.title}</td>
                            {/* {console.log(product)} */}
                            <td className="px-4 py-2">{product.date}</td>
                            <td className="px-4 py-2">
                                <div className="flex items-center">
                                    <button onClick={() => handleDecreaseQuantity(product.id)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-l">-</button>
                                    <input type="text" value={product.orderQuantity} className="text-center bg-transparent w-10" readOnly />
                                    <button onClick={() => handleIncreaseQuantity(product.id)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-r">+</button>
                                </div>
                            </td>
                            <td className="px-4 py-2">{product.price}</td>
                            <td className="px-4 py-2">{product.price * product.orderQuantity}</td>
                            <td className="px-4 py-2"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Order</button></td>
                            <td className="px-4 py-2"><button onClick={() => handleDelete(product.id)} className=" text-red-500 text-3xl mx-auto w-fit font-bold py-2 px-4 rounded"><MdDeleteForever /></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Cart;
