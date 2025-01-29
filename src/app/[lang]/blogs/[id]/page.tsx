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
      <div className="gap-4 min-h-wrapper pt-40 flex flex-col items-center justify-center ">
        <NotFound page="blogs"></NotFound>
      </div>
    );
  }
  if (data) {
    const blog: Blog = data;

    return (
      <div className="gap-4 min-h-wrapper pt-40 flex flex-col items-center justify-center ">
        <h1 className="underline cursor-pointer font-serif font-bold text-2xl">
          {props.params.lang === "ka" ? blog.title_ka : blog.title}
        </h1>
        <div>
          {" "}
          {props.params.lang === "ka" ? blog.description_ka : blog.description}
        </div>

        <div className="flex flex-row items-center justify-center">
          <ReturnBackButton destination={`${props.params.lang}/blogs`} />
          <Toaster></Toaster>
          {user && user.id === blog.user_id ? (
            <div className="flex flex-row gap-2">
              {" "}
              <DeleteItem id={id} table="blogs"></DeleteItem>
              <EditBlogDIalog blog={blog}></EditBlogDIalog>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
