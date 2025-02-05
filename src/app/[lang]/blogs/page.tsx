"use client";
import React, { useEffect, useState } from "react";
import { Blog } from "../../components/types";
import { Toaster } from "sonner";
import { useLocale } from "src/app/components/providers/LanguageContext";
import SearchBlogs from "src/app/components/SearchBar/SearchBlogs";
import AddBlogDialog from "src/app/components/AddBlogDialog/AddBlogDialog";
import BlogCard from "src/app/components/BlogCard/BlogCard";
const BLOGS_PER_PAGE = 9;

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const [isUpdating, setIsUpdating] = useState(false);
  const { locale } = useLocale();
  async function refetchBlogs() {
    const end = page * BLOGS_PER_PAGE - 1;

    const response = await fetch("/api/blogs", {
      headers: {
        start: "0",
        end: end.toString(),
      },
    });

    const blogsArray = await response.json();
    setBlogs(blogsArray);
  }

  useEffect(() => {
    const fetchBlogs = async () => {
      const start = (page - 1) * BLOGS_PER_PAGE;
      const end = page * BLOGS_PER_PAGE - 1;

      try {
        const response = await fetch("/api/blogs", {
          headers: {
            start: start.toString(),
            end: end.toString(),
          },
        });

        const blogsArray = await response.json();

        setBlogs((prev) => {
          const newBlogs = [...prev, ...blogsArray];
          const uniqueBlogs = Array.from(
            new Map(newBlogs.map((b) => [b.id, b])).values()
          );
          return uniqueBlogs;
        });

        if (blogsArray.length < BLOGS_PER_PAGE) {
          console.log("No more blogs");
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsUpdating(false);
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [page]);
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 1 &&
        !isUpdating &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isUpdating, hasMore]);

  // if (!blogs.length && !isLoading) {
  //   return (
  //     <div className="flex flex-col items-center pt-40">
  //       <div className="mt-5 flex flex-row items-center">
  //         <SearchBlogs
  //           searchItemType="blogs"
  //           setBlogs={setBlogs}
  //           refetchBlogs={refetchBlogs}
  //         />
  //       </div>

  //       <AddBlogDialog refetchBlogs={refetchBlogs} />
  //     </div>
  //   );
  // }

  return (
    <div className="w-full min-h-screen  bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-900 dark:to-purple-900">
      <div className="relative flex flex-col items-center  ">
        <div className="h-24 bg-white/30 dark:bg-black/30 backdrop-blur-lg w-full  flex items-center justify-center gap-4 shadow-lg ">
          <AddBlogDialog refetchBlogs={refetchBlogs} />
          <SearchBlogs
            searchItemType="blogs"
            setBlogs={setBlogs}
            refetchBlogs={refetchBlogs}
          />
          <Toaster richColors position="top-right" />
        </div>

        <div className="mt-12 w-full max-w-6xl pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {blogs.length === 0 && !isLoading && (
              <div className="flex flex-col items-center justify-center w-full h-full">
                <h2 className="text-gray-700 dark:text-gray-200 font-sans font-bold text-2xl mb-4">
                  Could not find anything...
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  Try adjusting your search or filter to find what you&apos;re
                  looking for.
                </p>
              </div>
            )}
            {!isLoading &&
              blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} locale={locale} />
              ))}
          </div>
          {isLoading && (
            <div className="flex justify-center items-center w-full h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-solid border-current border-r-transparent"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
