
import "./index.css"
import NotFound from "../../notfound/NotFound";
import { ReturnBackButton } from "../../notfound/NotFound";

export default async function ProductPage (params) {
   
    const { id } = params.params;
    var product;

    try {
        let url = `https://dummyjson.com/products/${id}`
        const response = await fetch(url);
        if(!response.ok){
            return (
                <NotFound page="products"></NotFound>
            )
        }
        const fetchedProduct = await response.json();
        product = fetchedProduct;
        
    } catch (error) {
        console.error("Failed to find product:", error);
        return (
            <NotFound page="products"></NotFound>

        )
        
    }
   
    


   

    if(!product) return <NotFound page="products"/>
    return(
        <div className="product">
            <h1>{product.title}</h1>
            <img className="product-image" src={product.images} alt="product-image"></img>
            <p>
                Tags:{" "}
                {product.tags.map((tag, index) => (
                <span className="product-tag"key={index}>#{tag}</span>
                ))}{" "}
            </p>
            <div>
            <span>Price: {product.price}$</span> </div>
            
            <ReturnBackButton destination={"products"} />

            
        </div>
    )

}

