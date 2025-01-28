"use client";
import React from "react";
import Link from "next/link";
// import SearchBar from "../../components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { Blog, SortOption } from "../../components/types";
// import AddBlogDialog from "src/app/components/AddBlogDialog/AddBlogDialog";
import { Toaster } from "sonner";
import { useLocale } from "src/app/components/providers/LanguageContext";
// import SortButton from "src/app/components/SortButton/SortButton";
// import SideFilterPanel from "src/app/components/SideFilterPanel/SideFilterPanel";

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set()
  );
  const { locale } = useLocale();

  useEffect(() => {
    async function fetchBlogs() {
      setIsUpdating(false);
      const response = await fetch("/api/blogs");
      const blogsArray = (await response.json()) as Blog[];
      setBlogs(blogsArray);
      setIsLoading(false);
    }

    fetchBlogs();
  }, [isUpdating]);

  if (blogs.length === 0 && !isLoading) {
    return (
      <div className="">
        <div className="flex flex-col items-center pt-40">
          <div className="mt-5 flex flex-row items-center">
            {/* <SearchBar
              searchItemType="blogs"
              setBlogs={setBlogs}
              setIsUpdating={setIsUpdating}
            /> */}
          </div>
          <h2 className="text-black dark:text-gray-200 font-sans font-bold text-2xl">
            Could not find anything...
          </h2>
          {/* <AddBlogDialog retriggerFetch={setIsUpdating}></AddBlogDialog> */}
        </div>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="">
        <div className="flex flex-col items-center pt-40">
          <div className="mt-5 flex flex-row items-center">
            {/* <SearchBar
              searchItemType="blogs"
              setBlogs={setBlogs}
              setIsUpdating={setIsUpdating}
            /> */}
          </div>
          <h2 className="text-black dark:text-gray-200 font-sans font-bold text-2xl">
            Blogs are loading...
          </h2>
          {/* <AddBlogDialog retriggerFetch={setIsUpdating}></AddBlogDialog> */}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full  min-h-wrapper pt-32 " data-cy="blogs-loaded">
      {/* <SideFilterPanel
        retriggerFetch={setIsUpdating}
        setItems={setBlogs}
        setSelectedCategories={setSelectedCategories}
      ></SideFilterPanel> */}
      <div className="relative flex flex-col items-center">
        <div className=" h-24  bg-slate-600 w-full flex flex-row items-center justify-center gap-2">
          {/* <AddBlogDialog retriggerFetch={setIsUpdating}></AddBlogDialog> */}
          {/* <SearchBar
            searchItemType="blogs"
            setBlogs={setBlogs}
            setIsUpdating={setIsUpdating}
          /> */}

          {/* <SortButton
            selectedCategories={selectedCategories}
            setItems={setBlogs}
            sortOptions={sortOptions}
          ></SortButton> */}
          <Toaster />
        </div>
        <div className=" flex flex-row">
          <div className="p-5 ml-44 grid grid-cols-3 gap-7">
            {blogs.map((Blog) => {
              const title = locale === "ka" ? Blog.title_ka : Blog.title;
              return (
                <div
                  key={Blog.id}
                  className="items-center flex flex-col border-2 border-solid border-gray-50 rounded-xl w-80 h-auto overflow-hidden bg-neutral-400 dark:bg-neutral-200"
                >
                  <Link
                    key={Blog.id}
                    href={`/blogs/${Blog.id}`}
                    data-cy={Blog.title}
                    className="items-center flex flex-col border-2 border-solid border-gray-50 rounded-xl w-80 h-auto overflow-hidden bg-neutral-400 dark:bg-neutral-200"
                  >
                    <div className="p-2 font-serif size text-xs m-1 ">
                      <strong>{title}</strong>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const sortOptions: SortOption[] = [
  {
    label: "Price: Low to High",
    value: "price",
    option: "1",
    order: "Ascending",
  },
  {
    label: "Price: High to Low",
    value: "price",
    option: "2",
    order: "Descending",
  },
  {
    label: "Title: A-Z",
    value: "title",
    option: "3",
    order: "Ascending",
  },
  {
    label: "Title: Z-A",
    value: "title",
    option: "4",
    order: "Descending",
  },
];
