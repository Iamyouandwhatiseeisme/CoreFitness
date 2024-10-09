"use client"
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Gear from "../../../../public/images/Gear.gif"
import "./index.css"
import NotFound from "../../notfound/NotFound";
import { ReturnBackButton } from "../../notfound/NotFound";

function PostPage (params) {
    const [posts, setPosts] = useState()
    const [isLoading, setIsLoading] = useState(true);
    const { id } = params.params;
   
    


    useEffect(()=>{

        async function fetchPost (){
            try {
                const response = await fetch(`https://dummyjson.com/posts/${id}`);
            if(!response.ok){
                return notFound();
            
            }
            const data = await response.json();
            setPosts(data);
            
                
            } catch (error) {
                console.error("Failed to find product:", error);
                notFound();
            } finally {
                setIsLoading(false);
            }
        }
        fetchPost()
    },[id])

    if(isLoading) return <div className="loading-screen"><img className="loading-spinner"src={Gear.src} alt="loading-spinner"></img></div>
    if(!posts) return <NotFound page="posts"/>
    return(
        <div className="post">
            <h1>{posts.title}</h1>
            <p>{posts.body}</p>
            <p>
                Tags:{" "}
                {posts.tags.map((tag, index) => (
                <span className="post-tag"key={index}>#{tag}</span>
                ))}{" "}
            </p>
            <div>Views: {posts.views}</div>
            <ReturnBackButton destination={"posts"} />

            
        </div>
    )

}

export default PostPage