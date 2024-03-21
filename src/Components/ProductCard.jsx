
import { FaCartPlus } from "react-icons/fa";

const ProductCard = ({ product }) => {
    return (
        <div>
            <div className="card glass w-72  shadow-xl my-5">
                <button className="absolute right-5 top-5  w-fit"><FaCartPlus /></button>

                <figure>
                    <img className='max-w-full max-h-52' src={product?.image} alt={product.title} />
                </figure>
                <div className="card-body items-center p-5">
                    <h2 className="card-title">{product?.title}</h2>
                    <div className="flex gap-5 flex-wrap">
                        {product?.model && <div className="badge badge-outline">Model: {product?.model}</div>}
                        <div className="badge badge-outline">Price: {product?.price} Taka</div>
                        {/* <div className="badge badge-outline">Stock quantity: {product.quantity ? product.quantity : "200"} </div> */}
                    </div>
                    {/* <p className="text-sm">{product?.description?.slice(0, 150)} .....</p> */}

                    <div className="card-actions">
                        <button className="btn btn-sm btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProductCard;
