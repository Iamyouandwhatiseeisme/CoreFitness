"use client";
import React, { useEffect, useState } from "react";
import { Blog } from "../../components/types";
import { Toaster } from "sonner";
import { useLocale } from "src/app/components/providers/LanguageContext";
import SearchBlogs from "src/app/components/SearchBar/SearchBlogs";
import AddBlogDialog from "src/app/components/AddBlogDialog/AddBlogDialog";
import BlogCard from "src/app/components/BlogCard/BlogCard";
const BLOGS_PER_PAGE = 10;

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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
      console.log("start", start, "end", end, page);

      try {
        const response = await fetch("/api/blogs", {
          headers: {
            start: start.toString(),
            end: end.toString(),
          },
        });

        const blogsArray = await response.json();

        setBlogs((prev) =>
          page === 1 ? blogsArray : [...prev, ...blogsArray]
        );

        if (blogsArray.length < BLOGS_PER_PAGE) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [page, isLoading]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isUpdating, page]);
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.scrollHeight &&
      !isLoading &&
      hasMore
    ) {
      setPage((prev) => prev + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center pt-40">
        <h2 className="text-black dark:text-gray-200 font-sans font-bold text-2xl">
          Blogs are loading...
        </h2>
      </div>
    );
  }

  if (!blogs.length) {
    return (
      <div className="flex flex-col items-center pt-40">
        <div className="mt-5 flex flex-row items-center">
          <SearchBlogs
            searchItemType="blogs"
            setBlogs={setBlogs}
            refetchBlogs={refetchBlogs}
          />
        </div>
        <h2 className="text-black dark:text-gray-200 font-sans font-bold text-2xl">
          Could not find anything...
        </h2>
        <AddBlogDialog refetchBlogs={refetchBlogs} />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen pt-32 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-900 dark:to-purple-900">
      <div className="relative flex flex-col items-center px-4">
        <div className="h-24 bg-white/30 dark:bg-black/30 backdrop-blur-lg w-full max-w-6xl flex items-center justify-center gap-4 shadow-lg rounded-md">
          <AddBlogDialog refetchBlogs={refetchBlogs} />
          <SearchBlogs
            searchItemType="blogs"
            setBlogs={setBlogs}
            refetchBlogs={refetchBlogs}
          />
          <Toaster richColors position="top-right" />
        </div>

        <div className="mt-12 w-full max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} locale={locale} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
