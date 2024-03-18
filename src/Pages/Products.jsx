import { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";

const Products = () => {

    const [products, setProducts] = useState([])
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => setProducts(json))
    }, [])

    return (
        <div className="flex flex-wrap gap-5 justify-evenly p-10">
            {
                products.map((p, i) => <div key={i}><ProductCard product={p} /></div>)

            }


        </div>
    );
};

export default Products;