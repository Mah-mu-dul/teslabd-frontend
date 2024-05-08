import { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import ProductDetailsModal from "../Components/ProductDetailsModal";
import productsData from '../db/products.json';

const Products = ({ cart, setCart }) => {

    const [products, setProducts] = useState([])
    useEffect(() => {
        // fetch(productsData)
        //     .then(res => res.json())
        //     .then(json => setProducts(json))
        setProducts(productsData)
    }, [])

    return (
        <div className="">
            {products.length < 1 ?
                <div className="mx-auto w-fit mt-20"><span className="loading  loading-ring loading-lg" /></div>
                :
                <div className="flex flex-wrap gap-5 items-stretch  justify-evenly p-10">
                    {
                        products.map((p, i) =>
                            <>
                                <div key={i} className="flex items-stretch ">
                                    <ProductCard cart={cart} setCart={setCart} id={i} product={p} />
                                </div>
                                <ProductDetailsModal cart={cart} setCart={setCart} id={i} product={p} />
                            </>)
                    }
                </div>
            }
        </div>



    );
};

export default Products;