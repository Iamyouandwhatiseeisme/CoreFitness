"use client";
import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Blog } from "../../components/types";
// import AddBlogDialog from "src/app/components/AddBlogDialog/AddBlogDialog";
import { Toaster } from "sonner";
import { useLocale } from "src/app/components/providers/LanguageContext";
import SearchBlogs from "src/app/components/SearchBar/SearchBlogs";
import AddBlogDialog from "src/app/components/AddBlogDialog/AddBlogDialog";

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

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
            <SearchBlogs
              searchItemType="blogs"
              setBlogs={setBlogs}
              setIsUpdating={setIsUpdating}
            />
          </div>
          <h2 className="text-black dark:text-gray-200 font-sans font-bold text-2xl">
            Could not find anything...
          </h2>
          <AddBlogDialog retriggerFetch={setIsUpdating}></AddBlogDialog>
        </div>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="">
        <div className="flex flex-col items-center pt-40">
          <div className="mt-5 flex flex-row items-center"></div>
          <h2 className="text-black dark:text-gray-200 font-sans font-bold text-2xl">
            Blogs are loading...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full  min-h-wrapper pt-32 " data-cy="blogs-loaded">
      <div className="relative flex flex-col items-center">
        <div className=" h-24  bg-slate-600 w-full flex flex-row items-center justify-center gap-2">
          <AddBlogDialog retriggerFetch={setIsUpdating}></AddBlogDialog>
          <SearchBlogs
            searchItemType="blogs"
            setBlogs={setBlogs}
            setIsUpdating={setIsUpdating}
          />

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
                    lang={locale}
                    href={`${locale}/blogs/${Blog.id}`}
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
