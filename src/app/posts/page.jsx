'use client'
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer"
import Link from "next/link";
import "./index.css"
import SearchBar from "../components/SearchBar/SearchBar";
import DropDown from "../components/DropDown/DropDown";
import fetchProducts from "../fetcher/fetchProducts";
import AddButton from '../components/AddButton/AddButton';

async function Posts ({searchParams}) {
    const debouncedSearch = searchParams.search || "";
    const sortOption = searchParams.option || ""
    const sortOrder = searchParams.order || ""
    const fetchItemType = "posts"

    const handlePostClick = () => {
        alert('Post action triggered!');
      };
    
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
    
      var posts = await fetchProducts({fetchItemType, debouncedSearch, sortOption, sortOrder})
    
      if (posts.length === 0) {
        return (
            <div className="posts-page">
                    <div className="app-bar">
                    <Header />
                    <SearchBar searchItemType="Search Posts" />
            </div>
            <h2>Search query empty...</h2>
                <Footer />
            </div> 
    ) 
      }
    return (
        <div className="posts-page">
        <div className="app-bar">
            <Header />
            <SearchBar searchItemType="Search Posts" />
            <AddButton item="Posts" onClick={handlePostClick} />
        </div>
            <div className="dropdown-menu"><DropDown buttonText="Sort Products By:"content={sortOptions}></DropDown></div>
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