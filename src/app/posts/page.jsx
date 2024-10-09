"use client"
import {useEffect, useState} from "react"
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer"
import Link from "next/link";
import Gear from "../../../public/images/Gear.gif"
import "./index.css"




function Posts () {
    const [posts, setposts]  = useState([]);
    const [isLoading, setLoading]  = useState(true);

    useEffect(()=> {
        async function fetchPosts() {
            try {
              const response = await fetch("https://dummyjson.com/posts"); 
            //   console.log(response);
              const data = await response.json()
              const postsList = data.posts;
              setposts(postsList)
              setLoading(false);
              

                
            } catch (error) {
              console.error('Error fetching data:', error);  
            }
          }

        

          
          fetchPosts();  
          
    },[])
    if (isLoading) {
        return (
                <div className="loading-page">
                    <Header />
                    <div className="loading-animation">
                        <h2>Loading...</h2>
                        <img src={Gear.src} alt="loading animation"></img>
                    </div>
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
                {posts.map((post)=>{
                    return (
                        

                        <Link key={post.id} href={`/posts/${post.id}`}>
                        <div className="posts-card">
                            <div className="posts-info"><strong>{post.title}</strong></div>
                            <div className="posts-info">{post.body}</div>
                           
                            <div>
                                <span className="posts-info">Views: {post.views}</span>
                                <span className="posts-info">Likes: {post.reactions.likes}</span>
                                <span className="posts-info">Dislikes: {post.reactions.dislikes}</span>

                            </div>
                            <div className="posts-info">Post Id: {post.id}</div>
                            <div className="posts-info">Tags: {post.tags.map((tag)=>{
                                return (
                                    <span className="post-tag">#{tag}</span>
                                )
                                
                            })}</div>


                        </div>
                        </Link>



                    )
                })}
            </div>
            <Footer />
        </div>
    )
}

export default Posts;