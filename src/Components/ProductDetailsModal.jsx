import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa';

const ProductDetailsModal = ({ id, product }) => {
    const [quantity, setQuantity] = useState(1);

    const handleChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value > 0) {
            setQuantity(value);
        }
    }; return (
        <div>
            <dialog id={id} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box ">
                    <div className="">
                        <Swiper
                            className=''
                            spaceBetween={50}
                            slidesPerView={3}
                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => console.log(swiper)}
                        >
                            <SwiperSlide >
                                <img className='max-w-full cursor-grab max-h-52 ' src={product?.image} alt={product.title} />
                            </SwiperSlide>
                            <SwiperSlide >
                                <img className='max-w-full cursor-grab max-h-52 ' src={product?.image} alt={product.title} />
                            </SwiperSlide>
                            <SwiperSlide >
                                <img className='max-w-full cursor-grab max-h-52 ' src={product?.image} alt={product.title} />
                            </SwiperSlide>
                            <SwiperSlide >
                                <img className='max-w-full cursor-grab max-h-52 ' src={product?.image} alt={product.title} />
                            </SwiperSlide>

                        </Swiper>
                        <div className="flex gap-4 flex-wrap mt-2">
                            <img className='max-w-[8] max-h-8 ' src={product?.image} alt={product.title} />
                            <img className='max-w-[8] max-h-8 ' src={product?.image} alt={product.title} />
                            <img className='max-w-[8] max-h-8 ' src={product?.image} alt={product.title} />
                        </div>
                    </div>
                    <br />
                    <h3 className="font-bold text-lg">{product.title}</h3>
                    <div className="flex items-center justify-between mt-5">
                        <div className="flex gap-5 flex-wrap">
                            <div className="badge badge-outline p-3">Price: {product?.price} Taka</div>
                        </div>
                        <div className="flex items-center ">
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="btn rounded-r  ">-</button>
                            <input type="number" value={quantity} onChange={handleChange} className="input rounded-none input-bordered w-16" min="1" />
                            <button onClick={() => setQuantity(quantity + 1)} className="btn rounded-l ">+</button>
                        </div>
                    </div>
                    <p className="py-4 h-52 overflow-y-scroll"><strong>Specification: </strong>{product.description + product.description}</p>
                    <div className="modal-action mt-0">

                        <form method="dialog">
                            <button className="btn btn-circle btn-sm absolute right-3 top-3 z-30">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </form>
                    </div>
                    <div className="flex  justify-between items-center mt-3">
                        <NavLink target='_blank' to="https://www.youtube.com/shorts/g9tvub8cn7o" className="btn ">Tutorial Link</NavLink>
                        <button className="btn btn-primary">Add to cart <FaCartPlus /></button>
                        <button className="btn btn-primary">Order Now</button>



                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default ProductDetailsModal;