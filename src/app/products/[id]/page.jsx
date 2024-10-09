"use client"
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Gear from "../../../../public/images/Gear.gif"
import "./index.css"
import NotFound from "../../notfound/NotFound";
import { ReturnBackButton } from "../../notfound/NotFound";

function ProductPage (params) {
    const [products, setProducts] = useState()
    const [isLoading, setIsLoading] = useState(true);
    const { id } = params.params;
   
    


    useEffect(()=>{

        async function fetchProduct (){
            try {
                const response = await fetch(`https://dummyjson.com/products/${id}`);
            if(!response.ok){
                return notFound();
            
            }
            const data = await response.json();
            setProducts(data);
            
                
            } catch (error) {
                console.error("Failed to find product:", error);
                notFound();
            } finally {
                setIsLoading(false);
            }
        }
        fetchProduct()
    },[id])

    if(isLoading) return <div className="loading-screen"><img className="loading-spinner"src={Gear.src} alt="loading-spinner"></img></div>
    if(!products) return <NotFound page="products"/>
    return(
        <div className="product">
            <h1>{products.title}</h1>
            <img className="product-image" src={products.images} alt="product-image"></img>
            <p>
                Tags:{" "}
                {products.tags.map((tag, index) => (
                <span className="product-tag"key={index}>#{tag}</span>
                ))}{" "}
            </p>
            <div>
            <span>Price: {products.price}$</span> </div>
            
            <ReturnBackButton destination={"products"} />

            
        </div>
    )

}

export default ProductPage