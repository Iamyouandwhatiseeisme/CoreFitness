import React from "react";
import NotFound from "../../notfound/NotFound";
import { ReturnBackButton } from "../../notfound/NotFound";
import { Blog } from "../../../components/types";
import { createClient } from "src/app/utils/supabase/server";
import { Toaster } from "sonner";
import { DeleteItem } from "src/app/components/DeleteItem/DeleteItem";
import EditBlogDIalog from "src/app/components/EditBlogDialog/EditBlogDIalog";

interface BlogDetailsProps {
  params: {
    lang: string;
    id: string;
  };
}

export default async function BlogDetails(props: BlogDetailsProps) {
  const { id } = props.params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("blogs")
    .select()
    .eq("id", id)
    .single();

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <NotFound page="blogs" />
      </div>
    );
  }

  if (data) {
    const blog: Blog = data;
    const formattedDate = new Date(blog.created_at).toLocaleDateString();

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl  mt-40 mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-colors duration-300">
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {blog.category}
              </span>
              <time className="text-sm text-gray-500 dark:text-gray-400">
                {formattedDate}
              </time>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 ">
              {props.params.lang === "ka" ? blog.title_ka : blog.title}
            </h1>

            <div className="flex items-center mb-8">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Posted by {user?.email}
              </span>
            </div>

            <article className="prose lg:prose-lg max-w-none mb-8 dark:prose-invert">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed break-words max-w-[600px]">
                {props.params.lang === "ka"
                  ? blog.description_ka
                  : blog.description}
              </p>
            </article>

            <div className="flex items-center justify-between border-t pt-6 dark:border-gray-700">
              <div className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                <ReturnBackButton destination={`${props.params.lang}/blogs`} />
              </div>

              {user && user.id === blog.user_id && (
                <div className="flex gap-3">
                  <div className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                    <EditBlogDIalog blog={blog} />
                  </div>
                  <div className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors">
                    <DeleteItem id={id} table="blogs" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <Toaster position="top-right" richColors theme="system" />
      </div>
    );
  }
}
