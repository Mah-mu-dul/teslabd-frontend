import { useState, useEffect } from 'react';

const Cart = ({ cart }) => {
    const [productCart, setProductCart] = useState([]);
    console.log(cart);
    // console.log(productCart);

    useEffect(() => {
        fetch('../../DB/products.json')
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
                            <td className="px-4 py-2">{product.orderQuantity}</td>
                            <td className="px-4 py-2">{product.price}</td>
                            <td className="px-4 py-2">{product.price * product.orderQuantity}</td>
                            <td className="px-4 py-2"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Order</button></td>
                            <td className="px-4 py-2"><button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancel</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Cart;
