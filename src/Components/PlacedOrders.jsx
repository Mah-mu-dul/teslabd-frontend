import { useEffect, useState } from "react";
import productsData from '../db/products.json';

const PlacedOrders = () => {
    const [placedOrders, setPlacedOrders] = useState(JSON.parse(localStorage.getItem('placedOrders') || []))
    const [subTotal, setSubTotal] = useState(placedOrders.reduce(po => po.price * po.orderQuantity))
    useEffect(() => {
        setPlacedOrders(JSON.parse(localStorage.getItem('placedOrders')))

    }, [])
    return (
        <div>
            {placedOrders.length && <h2 className="text-xl">Current Orders: {placedOrders.length}</h2>}
            <ul className="dict">
                {
                    placedOrders.map((order, i) => <>
                        <div tabIndex={0} className="collapse collapse-arrow border ">
                            <div className="collapse-title text-md flex flex-wrap bg-[#4443] justify-between bg-transparent">
                                <span>Order no: {i += 1} Order ID: {order.orderId}</span>git
                                {/* calculate subtotal */}
                                <span>
                                    Subtotal: {
                                        order.products.reduce((productAcc, product) =>
                                            productAcc + (product.price * product.orderQuantity), 0)
                                    }
                                </span>
                                <span className="text-orange-400">{order.orderDate.slice(0, 10)}</span>
                            </div>
                            <div className="collapse-content">
                                {/* <p>tabIndex={0} attribute is necessary to make the div focusable</p> */}
                                <ul key={i}>{
                                    order.products.map((op, j) => {
                                        const product = productsData.find(p => p.id === op.id);
                                        return (<li key={j}>
                                            <div className="flex my-2 w-full  space-x-2 gap-2 lg:gap-10 sm:space-x-4 px-3">
                                                <img
                                                    className="flex-shrink-0 object-cover rounded outline-none w-20 h-20 dark:bg-gray-500"
                                                    src={product?.img[0]}
                                                    alt="Polaroid camera"
                                                />
                                                <div className="flex flex-col justify-between w-full pb-4">
                                                    <div className=" block md:flex justify-between w-full pb-2 space-x-2">
                                                        <div className="space-y-1">
                                                            <h3 className="text-lg font-semibold leading-snug sm:pr-8 max-w-96 text-wrap"> {product.title}</h3>
                                                            <p className="text-sm dark:text-gray-600">Classic</p>
                                                        </div>
                                                        <div className=" flex lg:flex-col-reverse  item-center   gap-x-5  justify-end">
                                                            <div className="text-right">
                                                                <h2>Quantity: {op.orderQuantity}</h2>
                                                                <p className="text-md font-semibold">Total : <span className='text-xl min-w-32'>{op.price * op.orderQuantity} /-</span></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex text-sm divide-x">

                                                    </div>
                                                </div>
                                            </div>
                                        </li>)
                                    }
                                    )
                                }</ul>
                            </div>
                        </div>
                    </>
                    )
                }
            </ul>
        </div>
    );
};

export default PlacedOrders;