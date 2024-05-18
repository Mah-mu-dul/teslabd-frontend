import { useState, useEffect } from 'react';
import productsData from '../db/products.json';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Cart = ({ cart, setCart, checkoutSelectedProducts, setCheckoutSelectedProducts }) => {
    const [productCart, setProductCart] = useState([]);
    const [cartSubtotal, setCartSubtotal] = useState(0)
    const [selectedSubtotal, setSelectedSubtotal] = useState(0)
    console.log(checkoutSelectedProducts);
    useEffect(() => {
        setCheckoutSelectedProducts(productCart
            .filter(product => product.isSelected)
            .map(({ id, orderQuantity, img, price, title }) => ({ title, id, quantity: orderQuantity, img, price }))
        );
    }, [cart, productCart])
    // console.log(cart);
    // console.log(productCart);

    useEffect(() => {
        setSelectedSubtotal(productCart
            .filter(product => product.isSelected)
            .reduce((subtotal, product) => subtotal + (product.price * product.orderQuantity), 0)
        )
    }, [productCart])

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
                    orderQuantity: cartItem.quantity, // Renamed to orderQuantity
                    isSelected: checkoutSelectedProducts.some(item => item.id === product.id)
                };
            }
            return null; // Return null for products not in the cart
        }).filter(item => item !== null); // Filter out null values
        setProductCart(productCart);
        setCartSubtotal(cart.reduce((total, item) => total + item.ProductTotalPrice, 0))

        // });
    }, [cart]);


    const handleQuantityChange = (productId, quantity) => {
        const productIndex = cart.findIndex(item => item.productId === productId);
        const updatedCart = [...cart];

        updatedCart[productIndex].ProductTotalPrice = (updatedCart[productIndex].ProductTotalPrice / updatedCart[productIndex].quantity) * quantity
        updatedCart[productIndex].quantity = quantity

        setCart(updatedCart);
    };

    const handleIncreaseQuantity = productId => handleQuantityChange(productId, Math.min(productsData.find(p => p.id == productId).quantity, productCart.find(product => product.id == productId).orderQuantity + 1));

    const handleDecreaseQuantity = productId => handleQuantityChange(productId, Math.max(1, productCart.find(product => product.id == productId).orderQuantity - 1));


    const handleDelete = id => {
        setCart(cart => cart.filter(c => c.productId !== id));
        removeNotify()
    }

    const removeNotify = () => {
        toast.warning("Item Removed From Cart");
    }

    // select products for checkout
    const handleSelectProduct = (product) => {
        setProductCart(prevProductCart =>
            prevProductCart.map(item =>
                item.id === product.id ? { ...item, isSelected: !item.isSelected } : item
            )
        )
    };

    const handleSelectAll = () => {
        if (checkoutSelectedProducts?.length === productCart?.length) {
            setProductCart(prevProductCart =>
                prevProductCart.map(item => ({ ...item, isSelected: false }))
            );
        } else {
            setProductCart(prevProductCart =>
                prevProductCart.map(item => ({ ...item, isSelected: true }))
            );
        }
    };


    return (
        <div className="container mx-auto px-4 py-8 ">
            <div className="">
                <h1 className="text-2xl font-bold mb-4">Cart</h1>

                <h1 className='flex items-center gap-5'>
                    <input
                        className='checkbox'
                        type="checkbox"
                        checked={checkoutSelectedProducts?.length === productCart.length}
                        onChange={handleSelectAll}
                    />
                    {checkoutSelectedProducts?.length === productCart.length ? "Deselect" : "Select"} All
                </h1>
            </div>
            <div className="">

                {/*  prebvious table */}
                <div className="overflow-x-scroll lg:overflow-x-hidden">
                    {/* <table className="table-auto  w-full border-collapse border">
                        {/* <thead>
                            <tr className="bg-gray-200">
                                <th className="">No</th>
                                <th className="">Image</th>
                                <th className="w-48">Name</th>
                                <th className="">Stock Quantity</th>
                                <th className="">Quantity</th>
                                <th className="">Unit Price</th>
                                <th className="">Total Price</th>
                                <th className="">Order </th>
                                <th className="">Cancel </th>
                            </tr>
                        </thead> 
                        <tbody>
                            {productCart?.map((product, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                    <td className="p-2">{index + 1}</td>
                                    <td className=""><img className='max-w-12 max-h-8' src={product.img[0]} alt="" /></td>
                                    <td className="w-48">{product.title}</td>
                                    <td className=" text-center">{product.quantity}</td>
                                    <td className="">
                                        <div className="flex items-center">
                                            <button onClick={() => handleDecreaseQuantity(product.id)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-l">-</button>
                                            <input type="text" value={product.orderQuantity} className="text-center bg-transparent w-10" readOnly />
                                            <button onClick={() => handleIncreaseQuantity(product.id)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-r">+</button>
                                        </div>
                                    </td>
                                    <td className=" text-center">{product.price}</td>
                                    <td className=" text-center">{product.price * product.orderQuantity}</td>
                                    <td className=""><button className="w-full font-bold py-2 px-4 text-green-500 text-4xl flex justify-center"><TiTick /></button></td>
                                    <td className=""><button onClick={() => handleDelete(product.id)} className="w-full text-red-500 text-3xl flex justify-center mx-auto font-bold py-2 px-4 rounded"><MdDeleteForever /></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table> */}

                </div>


                <div className="flex justify-between flex-wrap">
                    <ul className="flex flex-col divide-y dark:divide-gray-300">
                        {productCart?.map((product, index) =>
                            <li key={index} className="flex flex-col py-6 sm:flex-row sm:justify-between">
                                <div className="flex  w-full  space-x-2 gap-2 lg:gap-10 sm:space-x-4">
                                    <input
                                        type="checkbox"
                                        className='checkbox'
                                        checked={product.isSelected}
                                        onChange={() => handleSelectProduct(product)}
                                    />
                                    <img
                                        onClick={() => handleSelectProduct(product)}
                                        className="flex-shrink-0 object-cover w-20 h-20 dark:border- rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500"
                                        src={product.img[0]}
                                        alt="Polaroid camera"
                                    />
                                    <div className="flex flex-col justify-between w-full pb-4">
                                        <div className=" block md:flex justify-between w-full pb-2 space-x-2">
                                            <div onClick={() => handleSelectProduct(product)} className=" space-y-1">
                                                <h3 className="text-lg font-semibold leading-snug sm:pr-8 max-w-96 text-wrap"> {product.title}</h3>
                                                <p className="text-sm dark:text-gray-600">Classic</p>
                                            </div>
                                            <div className="w-fit ">
                                                <div className="text-left lg:text-right">
                                                    <p className="text-md font-semibold">Unit Price: <span className='text-xl min-w-32'>{product.price} /-</span> </p>
                                                    <p className="text-md font-semibold">Total Price: <span className='text-xl min-w-32'>{product.price * product.orderQuantity} /-</span></p>
                                                </div>
                                                <div className="flex items-center justify-end mt-3">
                                                    <p>Quantity: </p>
                                                    <button
                                                        className="flex ml-2 h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 "
                                                        onClick={() => handleDecreaseQuantity(product.id)}                                                    >
                                                        −
                                                    </button>
                                                    {/* <div className="flex h-8 w-8 cursor-text items-center justify-center border-t border-b active:ring-gray-500">
                                                        {product.orderQuantity}
                                                    </div> */}
                                                    <input
                                                        type="number" min={1}
                                                        value={product.orderQuantity}
                                                        onChange={e => handleQuantityChange(product.id, parseInt(e.target.value))}
                                                        className="appearance-none h-8 w-12 pl-2 bg-transparent cursor-text  border-y  active:ring-gray-500"
                                                    />

                                                    <button
                                                        className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 "
                                                        onClick={() => handleIncreaseQuantity(product.id)}                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex text-sm divide-x">
                                            <button onClick={() => handleDelete(product.id)} type="button" className="flex items-center px-2 py-1 pl-0 space-x-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current">
                                                    <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                                                    <rect width="32" height="200" x="168" y="216"></rect>
                                                    <rect width="32" height="200" x="240" y="216"></rect>
                                                    <rect width="32" height="200" x="312" y="216"></rect>
                                                    <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                                                </svg>
                                                <span>Remove</span>
                                            </button>
                                            <button type="button" className="flex items-center px-2 py-1 space-x-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current">
                                                    <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"></path>
                                                </svg>
                                                <span>Add to favorites</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>

                        )}

                    </ul>
                    <div className="card w-ful md:w-fit mx-auto h-fit  bg-[#bcd8886e] text-primary-content">
                        <div className="card-body text-center">
                            <p>Cart subtotal <br />
                                <span className="font-semibold text-3xl"> {cartSubtotal} /-</span>
                            </p>
                            <p>Selected subtotal<br />
                                <span className="font-semibold text-3xl"> {selectedSubtotal} /-</span>
                            </p>
                            <div className="flex justify-end space-x-4">
                                <Link to="/products" type="button" className="px-6 py-2 border rounded-md dark:border-violet-600">Back
                                    <span className="sr-only sm:not-sr-only">to shop</span>
                                </Link>
                                <Link to="/orders" type="button" className="px-6 py-2 border rounded-md dark:bg-violet-600 dark:text-gray-50 dark:border-violet-600">
                                    <span className="sr-only sm:not-sr-only">Continue to </span>Checkout
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Cart;
