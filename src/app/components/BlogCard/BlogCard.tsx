import { Link } from "lucide-react";
import { Blog } from "../types";
import React from "react";

interface BlogCardProps {
  blog: Blog;
  locale: string;
}

export default function BlogCard(props: BlogCardProps) {
  const { blog, locale } = props;
  const title = locale === "ka" ? blog.title_ka : blog.title;
  const description = locale === "ka" ? blog.description_ka : blog.description;

  return (
    <div className="group relative flex flex-col border border-opacity-50 border-white dark:border-gray-800 shadow-xl rounded-lg w-80 h-64 overflow-hidden bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 hover:scale-[1.02] transition-transform duration-300">
      <Link
        lang={locale}
        href={`${locale}/blogs/${blog.id}`}
        className="w-full h-full flex flex-col items-center text-center p-6"
      >
        <div className="font-serif text-lg text-gray-800 dark:text-white mb-2 line-clamp-2">
          <strong>{title}</strong>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Posted by {blog.email}
        </div>
        <p className="text-gray-700 dark:text-gray-400 text-sm line-clamp-3">
          {description}
        </p>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/90 dark:from-gray-800/90" />
      </Link>
    </div>
  );
}
