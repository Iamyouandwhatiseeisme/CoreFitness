"use client";

import Link from "next/link";
import "./index.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import DropDown from "../../components/DropDown/DropDown";
import fetchProducts from "../../fetcher/fetchProducts";
import { useEffect, useState } from "react";
// import ProductActions from "../../components/buttons/ProductActions";
// import AddButton from "../../components/AddButton/AddButton";
import { useRouter } from "next/navigation";
import { Post, SortOption } from "../../components/types";

interface PostsProps {
  searchParams: Record<string, string | undefined>;
}

export default function Posts(props: PostsProps) {
  const searchParams = props.searchParams;
  const debouncedSearch = searchParams.search || "";
  const sortOption = searchParams.option || "";
  const sortOrder = searchParams.order || "";
  const fetchItemType = "posts";
  const [posts, setPosts] = useState<Post[]>([]);
  const [editing, setEditing] = useState<boolean>();
  const router = useRouter();
  const postInfo =
    "bg-gray-400 dark:bg-gray-200 font-sans p-2 rounded-xl text-xl m-2";

  const sortOptions: SortOption[] = [
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

  // function editProducts(props: { posts, setPosts }) {
  //   return function changeProductproducts(post) {
  //     posts.forEach((item) => {
  //       if (item.id === post.id) {
  //         const index = posts.indexOf(item);
  //         const newArray = posts;
  //         newArray[index] = post;

  //         setPosts(newArray);
  //       }
  //     });
  //   };
  // }

  // const deleteProduct = (postId) => {
  //   setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  // };

  // const addPost = (item) => {
  //   const newId = Date.now();
  //   const itemWithId = { ...item, id: newId };
  //   setPosts((prevPosts) => [...prevPosts, itemWithId]);
  // };

  const toggleHandler = (
    option: string | undefined,
    order: string | undefined
  ) => {
    router.push(`?option=${option}&order=${order}`);
  };

  useEffect(() => {
    async function fetch() {
      var postsArray: Post[] = (await fetchProducts(
        fetchItemType,
        debouncedSearch,
        sortOption,
        sortOrder
      )) as Post[];
      setPosts(postsArray);
    }
    fetch();
  }, [fetchItemType, debouncedSearch, sortOption, sortOrder]);
  // var callBack = editProducts({ posts, setPosts });

  // function onEditingChange(editing) {
  //   setEditing(editing);
  // }

  if (posts.length === 0) {
    return (
      <div>
        <div className="flex flex-col items-center relative">
          <div className="mt-5 flex flex-row items-center">
            <SearchBar searchItemType="Search Posts" />
          </div>
          <h2 className="text-black dark:text-gray-200 font-sans font-bold text-2xl">
            Couldn not find anything...
          </h2>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="flex flex-col items-center relative">
        <div className="mt-5 flex flex-row items-center">
          <SearchBar searchItemType="Search Posts" />
        </div>
        <div className="fixed left-2 top-28 flex flex-col z-10">
          <DropDown
            buttonText={["Sort Products By:"]}
            content={sortOptions}
            toggleHandler={toggleHandler}
            type="Sorter"
          ></DropDown>
        </div>
        <div>
          {posts.map((post) => {
            return (
              <div
                key={post.id}
                className="flex shadow-md dark:shadow-yellow-400 shadow-blue-400 flex-col border border-solid border-gray-400 rounded-xl w-60wv items-center overflow-hidden bg-gray-400 dark:bg-gray-200 m-5 gap-2 hover:scale-1.02"
              >
                <Link href={`/posts/${post.id}`}>
                  <div className={postInfo}>
                    <strong>{post.title}</strong>
                  </div>
                </Link>
                <div className={postInfo}>{post.body}</div>

                <div>
                  <span className={postInfo}>Views: {post.views}</span>
                  <span className={postInfo}>
                    Likes: {post.reactions.likes}
                  </span>
                  <span className={postInfo}>
                    Dislikes: {post.reactions.dislikes}
                  </span>
                </div>
                <div className={postInfo}>Post Id: {post.id}</div>
                <div className={postInfo}>
                  Tags:{" "}
                  {post.tags.map((tag, index) => {
                    return (
                      <span
                        key={`${post.id}-${tag}-${index}`}
                        className="bg-gray-200 dark:bg-gray-400 p-2 rounded-sm m-2"
                      >
                        #{tag}
                      </span>
                    );
                  })}
                </div>
                {/* <ProductActions
                  type={"posts"}
                  product={post}
                  setProductCallBack={callBack}
                  onEditingChange={onEditingChange}
                  deleteProductCallback={deleteProduct}
                /> */}
              </div>
            );
          })}
        </div>
        {/* <AddButton item="Posts" addProduct={addPost} /> */}
      </div>
    </div>
  );
}
