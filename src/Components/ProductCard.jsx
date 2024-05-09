
import { BsCartDashFill, BsCartPlusFill } from "react-icons/bs";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";

const ProductCard = ({ cart, setCart, id, product }) => {

    const handleAddToCart = (productId, price) => {
        const productIndex = cart.findIndex(item => item.productId === productId);
        const updatedCart = [...cart];

        productIndex !== -1
            ? ""
            : updatedCart.push({ productId: productId, quantity: 1, ProductTotalPrice: 1 * price });
        setCart(updatedCart);
        addNotify()
    };
    console.log(cart);

    const handleRemoveFromCart = (productId) => {
        const productIndex = cart.findIndex(item => item.productId === productId);
        if (productIndex !== -1) {
            const updatedCart = [...cart];
            updatedCart.splice(productIndex, 1); // Remove 1 item at the productIndex
            setCart(updatedCart);
            removeNotify()
        }
    };
    const removeNotify = () => {
        toast.warning("Item Removed From Cart");
    }
    const addNotify = () => {
        toast.success("Item Added To Cart");
    }
    return (
        <div className="card glass w-72 overflow-hidden flex flex-col justify-between shadow-xl my-5">
            {
                cart.find(c => c.productId == product.id) ?
                    <button onClick={() => handleRemoveFromCart(product.id, product.price)} className="absolute right-5 text-2xl text-green-500 hover:bg-text-500 top-5  w-fit"><BsCartDashFill /></button>
                    :
                    <button onClick={() => handleAddToCart(product.id, product.price)} className="absolute right-5 text-2xl text-gray-500 hover:bg-text-500 top-5  w-fit"><BsCartPlusFill /></button>
            }

            <div className="h-fit " onClick={() => document.getElementById(id).showModal()}>
                <figure>
                    {/* <img className='max-w-full max-h-52' src={product?.image} alt={product.title} /> */}
                    <img className='max-w-full max-h-52' src={product?.img[0]} alt={product.title} />
                </figure>
            </div>

            <div className=" h-fit p-5 gap-2 flex flex-col">
                <h2 className="card-title">{product?.title}</h2>
                <div className="flex gap-5 flex-wrap">
                    <div className="badge badge-outline">Price: {product?.price} Taka</div>
                </div>
                <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                        <span key={i}>{i < product.rating ? <FaStar style={{ color: 'orange' }} /> : <FaRegStar />}</span>
                    ))}
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
