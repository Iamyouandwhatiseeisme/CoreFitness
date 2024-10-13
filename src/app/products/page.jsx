"use client"
import {useEffect, useState} from "react"
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer"
import "./index.css"
import Gear from "../../../public/images/Gear.gif"
import Link from "next/link";
import DropDown from "../components/DropDown/DropDown";



function Products () {
    const [products, setProducts]  = useState([]);
    const [isLoading, setLoading]  = useState(true);
    const [sortOption, setSortOption ] = useState(null)

    const sortOptions = [
        {   label: 'Price: Low to High',
            value: 'price-low-to-high',
            sortFunction: (a, b) => a.price - b.price, },
        {   label: 'Price: High to Low', 
            value: 'price-high-to-low',
            sortFunction: (a, b) => b.price - a.price,
             },
        {   label: 'Name: A-Z',  
            value: 'name-ascending',
            sortFunction: (a, b) => a.title.localeCompare(b.title),},
      ];

    const handleSort = (option) => {
        // setSortOption(option);
        const sortedProducts = [...products].sort(option.sortFunction);

        setProducts(sortedProducts)
        

    }

    



    useEffect(()=> {
        async function fetchProducts() {
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

        

          
          fetchProducts();  
          
    },[])
    if (isLoading) {
        return (
                <div className="loading-screen">
                    <Header />
                        <h2>Loading...</h2>
                        <img src={Gear.src} alt="loading-animation"></img>
                    <Footer />
                </div> 
        ) 
      }

      if (products.length === 0) {
        return (
            <div className="loading-screen">
                    <Header />
                        <h2>Loading...</h2>
                        <img src={Gear.src} alt="loading-animation"></img>
                    <Footer />
                </div> 
    ) 
      }
    return (

        
        <div className="products-page">
            <Header />
            <div className="dropdown-menu"><DropDown onSelect={handleSort} buttonText="Sort Products By:"content={sortOptions}></DropDown></div>
            <div className="products-list">
                {products.map((product)=>{
                    return (
                        <Link key={product.id} href={`/products/${product.id}`}>
                            <div className="product-card">
                                <img className="product-image" src={product.images[0]} alt={product.title}></img>
                                <div className="product-info"><strong>{product.title}</strong></div>
                                <div className="product-info">{product.description}</div>
                                <div className="product-info">Price: {product.price}$</div>
                            </div>
                        </Link>


                    )
                })}
            </div>
            <Footer />
        </div>
    )
}

export default Products;