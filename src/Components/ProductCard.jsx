
import { FaCartPlus } from "react-icons/fa";

const ProductCard = ({ id, product }) => {
    return (
        <div className="card glass w-72  shadow-xl my-5">
            <button className="absolute right-5 text-2xl text-gray-500 hover:bg-text-500 top-5  w-fit"><FaCartPlus /></button>
            <button className="" onClick={() => document.getElementById(id).showModal()}>
                <figure>
                    {/* <img className='max-w-full max-h-52' src={product?.image} alt={product.title} /> */}
                    <img className='max-w-full max-h-52' src={product?.img[0]} alt={product.title} />
                </figure>
            </button>
            <div className="card-body items-center p-5">
                <h2 className="card-title">{product?.title}</h2>
                <div className="flex gap-5 flex-wrap">
                    <div className="badge badge-outline">Price: {product?.price} Taka</div>
                </div>
                {/* <p className="text-sm">{product?.description?.slice(0, 150)} .....</p> */}

                <div className="card-actions">
                    <button className="btn btn-sm btn-primary" onClick={() => document.getElementById(id).showModal()}>
                        Details
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ProductCard;
