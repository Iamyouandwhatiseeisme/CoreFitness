"use client"
import {useEffect, useState} from "react"
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer"
import "./index.css"




function Posts () {
    const [posts, setProducts]  = useState([]);
    const [isLoading, setLoading]  = useState(true);

    useEffect(()=> {
        async function fetchPosts() {
            try {
              const response = await fetch("https://dummyjson.com/posts"); 
            //   console.log(response);
              const data = await response.json()
              const postsList = data.posts;
              setProducts(postsList)
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

      if (posts.length === 0) {
        return (
            <div>
                <Header />
                    <h2>Loading...</h2>
                <Footer />
            </div> 
    ) 
      }
    return (

        
        <div className="posts-page">
            <Header />
            <div className="posts-list">
                {posts.map((product)=>{
                    return (

                        <div className="posts-card">
                            <div className="posts-info"><strong>{product.title}</strong></div>
                            <div className="posts-info">{product.description}</div>
                            <div className="posts-info">Price: {product.price}$</div>
                        </div>


                    )
                })}
            </div>
            <Footer />
        </div>
    )
}

export default Posts;