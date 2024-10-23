"use client";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Link from "next/link";
import "./index.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import DropDown from "../../components/DropDown/DropDown";
import fetchProducts from "../../fetcher/fetchProducts";
import { useEffect, useState } from "react";
import ProductActions from "../../components/buttons/ProductActions";

export default function Posts({ searchParams }) {
  const debouncedSearch = searchParams.search || "";
  const sortOption = searchParams.option || "";
  const sortOrder = searchParams.order || "";
  const fetchItemType = "posts";
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState();

  const sortOptions = [
    {
      label: "Views: Low to High",
      value: "vews-low-to-high",
      option: "views",
      order: "asc",
    },
    {
      label: "Views: High to Low",
      value: "views-high-to-low",
      option: "views",
      order: "desc",
    },
    {
      label: "Title: A-Z",
      value: "title-ascending",
      option: "title",
      order: "asc",
    },
    {
      label: "Title: Z-A",
      value: "title-descending",
      option: "title",
      order: "desc",
    },
  ];

  function editProducts({ posts, setPosts }) {
    return function changeProductproducts(post) {
      posts.forEach((item) => {
        if (item.id === post.id) {
          const index = posts.indexOf(item);
          const newArray = posts;
          newArray[index] = post;

          console.log(newArray, "benew");
          setPosts(newArray);
        }
      });
    };
  }

  const deleteProduct = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  useEffect(() => {
    async function fetch() {
      var postsArray = await fetchProducts({
        fetchItemType,
        debouncedSearch,
        sortOption,
        sortOrder,
      });
      setPosts(postsArray);
    }
    fetch();
  }, [fetchItemType, debouncedSearch, sortOption, sortOrder]);
  var callBack = editProducts({ posts, setPosts });

  function onEditingChange(editing) {
    setEditing(editing);
  }

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
    );
  }
  return (
    <div className="posts-page">
      <div className="app-bar">
        <Header />
        <SearchBar searchItemType="Search Posts" />
      </div>

      <div className="dropdown-menu">
        <DropDown
          buttonText="Sort Products By:"
          content={sortOptions}
        ></DropDown>
      </div>
      <div className="posts-list">
        {posts.map((post) => {
          return (
            <div key={post.id} className="posts-card">
              <Link href={`/posts/${post.id}`}>
                <div className="posts-info">
                  <strong>{post.title}</strong>
                </div>
              </Link>
              <div className="posts-info">{post.body}</div>

              <div>
                <span className="posts-info">Views: {post.views}</span>
                <span className="posts-info">
                  Likes: {post.reactions.likes}
                </span>
                <span className="posts-info">
                  Dislikes: {post.reactions.dislikes}
                </span>
              </div>
              <div className="posts-info">Post Id: {post.id}</div>
              <div className="posts-info">
                Tags:{" "}
                {post.tags.map((tag, index) => {
                  return (
                    <span
                      key={`${post.id}-${tag}-${index}`}
                      className="post-tag"
                    >
                      #{tag}
                    </span>
                  );
                })}
              </div>
              <ProductActions
                type={"posts"}
                product={post}
                setProductCallBack={callBack}
                onEditingChange={onEditingChange}
                deleteProductCallback={deleteProduct}
              />
            </div>
          );
        })}
      </div>

      <Footer />
    </div>
  );
}
