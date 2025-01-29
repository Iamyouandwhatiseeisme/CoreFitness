import React from "react";
import NotFound from "../../notfound/NotFound";
import { ReturnBackButton } from "../../notfound/NotFound";
// import fetchSingleBlog from "../../../fetcher/fetchSingleBlog";
import { Blog } from "../../../components/types";
// import { DeleteBlogButton } from "src/app/components/DeleteBlogButton/DeleteBlogButton";
import { createClient } from "src/app/utils/supabase/server";
// import EditBlogDIalog from "src/app/components/EditBlogDialog/EditBlogDialog";
import { Toaster } from "sonner";

interface BlogDetailsProps {
  params: {
    lang: string;
    id: string;
  };
}

export default async function BlogDetails(props: BlogDetailsProps) {
  let blog: Blog | null = null;
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
    console.log(props.params.lang);

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
              {/* <DeleteBlogButton id={id}></DeleteBlogButton> */}
              {/* <EditBlogDIalog Blog={Blog}></EditBlogDIalog> */}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
