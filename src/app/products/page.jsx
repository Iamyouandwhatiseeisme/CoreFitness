"use client"
import {useEffect, useState} from "react"
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer"
import "./index.css"




function Products () {
    const [products, setProducts]  = useState([]);
    const [isLoading, setLoading]  = useState(true);

    useEffect(()=> {
        async function fetchPosts() {
            try {
              const response = await fetch("https://dummyjson.com/products"); 
            //   console.log(response);
              const data = await response.json()
              const productsList = data.products;
              setProducts(productsList)
              setLoading(false);
              

                
            } catch (error) {
              console.error('Error fetching data:', error);  
            }
          }

        

          
          fetchPosts();  
          
    },[])
    if (isLoading) {
        return (
                <div>
                    <Header />
                        <h2>Loading...</h2>
                    <Footer />
                </div> 
        ) 
      }

      if (products.length === 0) {
        return (
            <div>
                <Header />
                    <h2>Loading...</h2>
                <Footer />
            </div> 
    ) 
      }
    return (

        
        <div className="products-page">
            <Header />
            <div className="products-list">
                {products.map((product)=>{
                    return (

                        <div className="product-card">
                            <img className="product-image" src={product.images[0]} alt={product.title}></img>
                            <div className="product-info"><strong>{product.title}</strong></div>
                            <div className="product-info">{product.description}</div>
                            <div className="product-info">Price: {product.price}$</div>
                        </div>


                    )
                })}
            </div>
            <Footer />
        </div>
    )
}

export default Products;