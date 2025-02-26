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

  const { data: dictionaryData } = await supabase
    .from("dictionary")
    .select()
    .eq("locale", props.params.lang)
    .single();

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <NotFound page="blogs" />
      </div>
    );
  }

  if (data && dictionaryData) {
    const blog: Blog = data;
    const blogDictionary = dictionaryData.dictionary.blog;

    const formattedDate = new Date(blog.created_at).toLocaleDateString();

    return (
      <div className="flex mt-10 sm:mt-0 md:flex-row flex-col items-start justify-between gap-10 sm:gap-20 dark:bg-gray-900">
        <div className="text-gray-600 hidden sm:flex hover:text-gray-800 max-w-12 mr-8 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
          <ReturnBackButton destination={`${props.params.lang}/blogs`} />
        </div>
        <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 py-4 sm:py-12 px-4 sm:px-6 lg:px-8 ">
          <div className="max-w-3xl flex flex-col items-start  mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-colors duration-300">
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
                  {blogDictionary.PostedBy}: {user?.email}
                </span>
              </div>

              <article className="prose lg:prose-lg max-w-none mb-8 dark:prose-invert">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed break-words max-w-[600px]">
                  {props.params.lang === "ka"
                    ? blog.description_ka
                    : blog.description}
                </p>
              </article>
            </div>
          </div>

          <Toaster position="top-right" richColors theme="system" />
        </div>
        {user && user.id === blog.user_id && (
          <div className="flex flex-row sm:flex-col w-full sm:w-40 items-center justify-center sm:pr-20 sm:pt-20 gap-4">
            <EditBlogDIalog blog={blog} />
            <DeleteItem id={id} table="blogs" />
          </div>
        )}
      </div>
    );
  }
}
