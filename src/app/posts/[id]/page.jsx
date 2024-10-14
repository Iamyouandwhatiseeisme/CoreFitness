// "use client"
// import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
// import Gear from "../../../../public/images/Gear.gif"
import "./index.css"
import NotFound from "../../notfound/NotFound";
import { ReturnBackButton } from "../../notfound/NotFound";

export default async function PostPage (params) {
    
    const { id } = params.params;
    var post = [];

    

    try {
        let url = `https://dummyjson.com/posts/${id}`
        const response = await fetch(url);
        if(!response.ok){
            return (
                <NotFound page="posts"></NotFound>
            )
        }
        const fetchedPost = await response.json();
        post = fetchedPost
        
    } catch (error) {
        console.error("Failed to find product:", error);
        notFound();

        
    }
    
    if(!post) return <NotFound page="posts"/>
    return(
        <div className="post">
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <p>
                Tags:{" "}
                {post.tags.map((tag, index) => (
                <span className="post-tag"key={index}>#{tag}</span>
                ))}{" "}
            </p>
            <div>Views: {post.views}</div>
            <ReturnBackButton destination={"posts"} />

            
        </div>
    )

}

