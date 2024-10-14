
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer"
import "./index.css"
import Link from "next/link";
import DropDown from "../components/DropDown/DropDown";
import SearchBar from "../components/SearchBar/SearchBar";



export default async function Products ({searchParams}) {
    const debouncedSearch = searchParams.search || "";
    const sortOption = searchParams.option || ""
    const sortOrder = searchParams.order || ""

    const sortOptions = [
        {   label: 'Price: Low to High',
            value: 'price-low-to-high',
            option: "price",
            order: "asc"
            },
        {   label: 'Price: High to Low', 
            value: 'price-high-to-low',
            option: "price",
            order: "desc"
            
             },
        {   label: 'Name: A-Z',  
            value: 'name-ascending',
            option: "title",
            order: "asc"
            },
        {   label: 'Name: Z-A',  
            value: 'name-descending',
            option: "title",
            order: "desc"
            },
      ];

    let url = "https://dummyjson.com/products";
    if(debouncedSearch){
        url = `https://dummyjson.com/products/search?q=${debouncedSearch}`;
    }
    if(sortOption && sortOrder){
        url = `https://dummyjson.com/products?sortBy=${sortOption}&order=${sortOrder}`
    }
    const response = await fetch(url);
    const data = await response.json();
    var products = data.products || [];

    
    

      if (products.length === 0) {
        return (
            <div className="loading-screen">
                    <div className="app-bar">
                     <Header />
                    <SearchBar searchItemType="Search Products" />
                </div>
                </div> 
    ) 
      }
    return (

        
        <div className="products-page">
            <div className="app-bar">
                <Header />
                <SearchBar searchItemType="Search Posts" />
            </div>
            
            <div className="dropdown-menu"><DropDown buttonText="Sort Products By:"content={sortOptions}></DropDown></div>
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

