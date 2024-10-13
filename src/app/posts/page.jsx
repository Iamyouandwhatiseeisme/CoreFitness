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
        {   label: 'Views: Low to High',
            value: 'vews-low-to-high',
            option: "views",
            order: "asc"
            },
        {   label: 'Views: High to Low', 
            value: 'views-high-to-low',
            option: "views",
            order: "desc"
            
             },
             
             
        {   label: 'Likes: High to Low', 
            value: 'likes-high-to-low',
            option: "likes",
            order: "desc"
            
             },
        {   label: 'Likes: Low to High', 
            value: 'likes-low-to-high',
            option: "likes",
            order: "asc"
             },
        
        
        {   label: 'Title: A-Z',  
            value: 'title-ascending',
            option: "title",
            order: "asc"
            },
        {   label: 'Title: Z-A',  
            value: 'title-descending',
            option: "title",
            order: "desc"
            },
      ];
        
       
       
    

    const handleSort = async (sortOption) => {
        setSortOption(sortOption);
        setLoading(true);


        if(sortOption.option === "likes"){

            // decided to sort the fetched posts with js logic because api endpoint didn't support sorting by nested object parameters"

            console.log('sorting');
            const sortedPosts = [...posts].sort((a,b)=> sortOption.order === "desc" ? b.reactions.likes - a.reactions.likes : a.reactions.likes - b.reactions.likes,
            )
            console.log(sortedPosts);
            setposts(sortedPosts);
            setLoading(false)
            
        }else{
            try {
                const response = await fetch(`https://dummyjson.com/posts?sortBy=${sortOption.option}&order=${sortOption.order}`)
                const data = await response.json();
                const sortedPosts = data.posts;
                setposts(sortedPosts)
    
    
                
            } catch (error) {
                console.log('Error', error)
                
            }finally{
                setLoading(false);
    
    
            }

        }

        

        

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