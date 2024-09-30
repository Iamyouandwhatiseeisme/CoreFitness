import React from "react"
import List from "./List.js";
import Header from "../../header/Header.js";
import Footer from "../../footer/Footer.js";
import "./Assignment3.css"

function Assignment3 () {
    const product = {
        id: '10002',
        name: 'Eco-Friendly Water Bottle',
        description: 'Stay hydrated with our durable, eco-friendly water bottle.',
        price: 14.99,
        currency: 'USD',
        imageURL: 'https://example.com/images/product-10002.jpg',
      };
      const formattedTable = Object.entries(product).reduce((acc, [key, value]) => {
        acc.push({ key, value }); 
        return acc;
    }, []);
    return (
        <div>
            <Header />
            <div className="assignment-table"><List product={formattedTable} /></div>
            <Footer />
        </div>
    )
}

export default Assignment3;
