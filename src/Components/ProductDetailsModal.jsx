import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa';


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetailsModal = ({ cart, setCart, id, product }) => {
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        cart.find(c => c.productId == product.id ? setQuantity(c.quantity) : 1)
    }, [cart])


    const handleChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value > 0) {
            setQuantity(value);
        }
    };

    const handleAddToCart = (productId, price) => {
        const productIndex = cart.findIndex(item => item.productId === productId);
        const updatedCart = [...cart];

        if (productIndex !== -1) {
            updatedCart[productIndex].quantity = quantity;
            updatedCart[productIndex].ProductTotalPrice = quantity * price;
        } else {
            updatedCart.push({ productId: productId, quantity: quantity, ProductTotalPrice: quantity * price });
        }
        setCart(updatedCart);
        successNotify()
    };
    const successNotify = () => {
        toast.success("Item Added To Cart");
    }

    return (
        <div>
            <dialog id={id} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box ">

                    <div className="">
                        <Swiper
                            className=''
                            spaceBetween={50}
                            slidesPerView={3}
                        // onSlideChange={() => console.log('slide change')}
                        // onSwiper={(swiper) => console.log(swiper)}
                        >
                            <SwiperSlide >
                                <img className='max-w-full cursor-grab max-h-52 ' src={product?.img[[0]]} alt={product.title} />
                            </SwiperSlide>
                            <SwiperSlide >
                                <img className='max-w-full cursor-grab max-h-52 ' src={product?.img[[0]]} alt={product.title} />
                            </SwiperSlide>
                            <SwiperSlide >
                                <img className='max-w-full cursor-grab max-h-52 ' src={product?.img[[0]]} alt={product.title} />
                            </SwiperSlide>
                            <SwiperSlide >
                                <img className='max-w-full cursor-grab max-h-52 ' src={product?.img[[0]]} alt={product.title} />
                            </SwiperSlide>

                        </Swiper>
                        <div className="flex gap-4 flex-wrap mt-2">
                            <img className='max-w-[8] max-h-8 ' src={product?.img[[0]]} alt={product.title} />
                            <img className='max-w-[8] max-h-8 ' src={product?.img[[0]]} alt={product.title} />
                            <img className='max-w-[8] max-h-8 ' src={product?.img[[0]]} alt={product.title} />
                        </div>
                    </div>
                    <br />
                    <h3 className="font-bold text-lg">{product.title}</h3>
                    <div className="flex items-center justify-between gap-y-5 flex-wrap text-nowrap mt-5">
                        <div className="flex gap-5 flex-wrap">
                            <div className="badge badge-outline p-3">Price: {product?.price} Taka</div>
                        </div>
                        <div className="flex gap-5 flex-wrap">
                            <div className="badge badge-outline p-3">
                                Total Price: <span className='font-semibold text-orange-500 mx-1'> {product?.price * quantity} </span> Taka</div>
                        </div>
                        <div className="flex items-center ">
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="btn rounded-r  ">-</button>
                            <input type="number" value={quantity} onChange={handleChange} className="input rounded-none input-bordered w-16" min="1" />
                            <button onClick={() => setQuantity(quantity + 1)} className="btn rounded-l ">+</button>
                        </div>
                    </div>
                    <p className="py-4 h-52 overflow-y-scroll"><div dangerouslySetInnerHTML={{ __html: product.description }} /></p>
                    <div className="modal-action mt-0">

                        <form method="dialog">
                            <button className="btn btn-circle btn-sm absolute right-3 top-3 z-30">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </form>
                    </div>
                    <div className="flex gap-2 flex-wrap  justify-between items-center mt-3">
                        <NavLink target='_blank' to="https://www.youtube.com/shorts/g9tvub8cn7o" className="btn p-2 md:p-4 ">Tutorial Link</NavLink>
                        <button onClick={() => handleAddToCart(product.id, product.price)} className="btn p-2 md:p-4 btn-primary">Add to cart <FaCartPlus /></button>
                        <button className="btn p-2 md:p-4 btn-primary">Order Now</button>

                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default ProductDetailsModal;