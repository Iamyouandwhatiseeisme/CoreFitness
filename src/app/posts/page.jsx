"use client"
import {useEffect, useState} from "react"
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer"
import Link from "next/link";
import Gear from "../../../public/images/Gear.gif"
import "./index.css"
import DropDown from "../components/DropDown/DropDown";




function Posts () {
    const [posts, setposts]  = useState([]);
    const [isLoading, setLoading]  = useState(true);
    const [sortOption, setSortOption ] = useState(null)


    const sortOptions = [
        {
            label: 'Title: A-Z',
            value: 'title-ascending',
            sortFunction: (a, b) => a.title.localeCompare(b.title),
        },
        {
            label: 'Title: Z-A',
            value: 'title-descending',
            sortFunction: (a, b) => b.title.localeCompare(a.title),
        },
        {
            label: 'Views: High-To-Low',
            value: 'views-high-to-low',
            sortFunction: (a, b) => b.views - a.views,
        },
        {
            label: 'Likes: High-To-Low',
            value: 'likes-high-to-low',
            sortFunction: (a, b) => b.reactions.likes - a.reactions.likes,
        },
        
       
       
    ];

    const handleSort = (option) => {
        setSortOption(option);
        const sortedProducts = [...posts].sort(option.sortFunction);
        setposts(sortedProducts)
        


    }

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
            <div className="dropdown-menu"><DropDown onSelect={handleSort} buttonText="Sort Products By:"content={sortOptions}></DropDown></div>

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