import { useEffect, useState } from "react";
import { MdEdit, MdEditOff } from "react-icons/md";

import { toast } from "react-toastify";

const Orders = ({ cart, setCart, checkoutSelectedProducts, setCheckoutSelectedProducts, placedOrders, setPlacedOrders }) => {
    console.log(cart, checkoutSelectedProducts);
    // Initialize state with the calculated subtotal
    const [subtotal, setSubtotal] = useState(checkoutSelectedProducts?.reduce(
        (acc, item) => acc + item?.price * item?.orderQuantity,
        0
    ));

    useEffect(() => {
        setSubtotal(checkoutSelectedProducts?.reduce(
            (acc, item) => acc + item?.price * item?.quantity,
            0
        ))
    }, [checkoutSelectedProducts])

    const handleDelete = id => {
        setCheckoutSelectedProducts(checkoutSelectedProducts.filter(c => c.id !== id));
        console.log(checkoutSelectedProducts);
        removeNotify()
    }

    const removeNotify = () => {
        toast.warning("Item Removed");
    }


    //  update delivery info
    const [isEditing, setIsEditing] = useState(false);
    const [deliveryInfo, setDeliveryInfo] = useState({
        deliveryInfoId: 1,
        name: "Mahmudul Hasan",
        email: "Princehasan16216@gmail.com",
        phone: "01881159045",
        address: "onek durer"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDeliveryInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value
        }));
    };

    const handleBlur = () => {
        setIsEditing(false);
    };

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };


    //  handling the order
    const [order, setOrder] = useState({
        orderId: 1,
        deliveryInfo: deliveryInfo,
        products: checkoutSelectedProducts,
        orderDate: "",
        approxDeliveryDate: "",
        orderStatus: "placed",
        spacialNote: ""

    })

    useEffect(() => {
        setOrder({
            orderId: 1,
            deliveryInfo: deliveryInfo,
            products: checkoutSelectedProducts.map(p => ({
                id: p.id,
                orderQuantity: p.orderQuantity
            })),
            orderDate: "",
            approxDeliveryDate: "",
            orderStatus: "placed",
            spacialNote: ""

        })
    }, [checkoutSelectedProducts, deliveryInfo])
    const handleOrder = () => {
        setPlacedOrders(...placedOrders, order)
        setCart(cart.filter(cartItem =>
            !checkoutSelectedProducts.some(product => product.id === cartItem.productId)
        ))
        setCheckoutSelectedProducts([])
    }
    return (
        <>
            <h1 className="text-center my-8 text-3xl font-semibold"> Checkout page</h1>
            <div className="flex flex-wrap">
                <div className="flex justify-between flex-wrap  gap-5 mx-auto">
                    <ul className="flex flex-col divide-y  dark:divide-gray-300 w-full lg:min-w-[700px] lg:w-fit pr-5">
                        {checkoutSelectedProducts?.map((product, index) =>
                            <li key={index} className="flex  w-full flex-col pt-6 sm:flex-row sm:justify-between">
                                <div className="flex  w-full  space-x-2 gap-2 lg:gap-10 sm:space-x-4 px-3">
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
                                            <div className=" flex lg:flex-col-reverse  item-center gap-x-5  justify-between">
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
                                                <div className="text-right">
                                                    <h2>Quantity: {product.quantity}</h2>
                                                    <p className="text-md font-semibold">Total : <span className='text-xl min-w-32'>{product.price * product.quantity} /-</span></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex text-sm divide-x">

                                        </div>
                                    </div>
                                </div>
                            </li>

                        )}

                    </ul>

                </div>
                <div className="w-fit">
                    <div className="w-full p-3  border rounded my-5 max-w-[600px]  px-5">
                        <p className="text-end">
                            <button onClick={handleEditClick} className="text-xl">{isEditing ? <MdEditOff /> : <MdEdit />}</button>
                        </p>
                        <p>
                            Deliver to: {isEditing ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={deliveryInfo.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="input input-bordered bg-transparent w-full"
                                />
                            ) : (
                                deliveryInfo.name
                            )}
                        </p>
                        <br />
                        <p>
                            Phone: {isEditing ? (
                                <input
                                    type="text"
                                    name="phone"
                                    value={deliveryInfo.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="input input-bordered bg-transparent w-full"
                                />
                            ) : (
                                deliveryInfo.phone
                            )}
                        </p>
                        <br />
                        <p>Address:
                            {isEditing ? (
                                <textarea
                                    name="address"
                                    value={deliveryInfo.address}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="textarea bg-transparent textarea-bordered w-full"
                                    rows="4"
                                    style={{ maxHeight: '150px' }}
                                />
                            ) : (
                                <address> {deliveryInfo.address}
                                </address>
                            )}
                        </p>
                        <br />
                        <p>
                            Email: {isEditing ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={deliveryInfo.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="input input-bordered bg-transparent w-full"
                                />
                            ) : (
                                deliveryInfo.email
                            )}
                        </p>
                    </div>
                    <div className="card  w-fit min-w-96 mx-auto lg:mr-5 h-fit  bg-[#bcd8886e] text-primary-content">
                        <div className="card-body text-center">
                            <p>Total amount <br />
                                <span className="font-semibold text-3xl"> {subtotal} /-</span>
                            </p>
                            <textarea
                                placeholder="Spacial Note"
                                className="textarea bg-transparent textarea-bordered w-full max-h-20"
                                name="spacialNote"
                                value={order.spacialNote}
                                onChange={e => setOrder({ ...order, spacialNote: e.target.value })}
                                id=""
                            ></textarea>
                            <div className="flex justify-end space-x-4">
                                <button onClick={handleOrder} type="submit" className="px-6 py-2 text-white border rounded-md bg-green-500">
                                    Place order
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Orders;