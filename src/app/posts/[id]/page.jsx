import "./index.css";
import NotFound from "../../notfound/NotFound";
import { ReturnBackButton } from "../../notfound/NotFound";
import fetchSingleProduct from "../../fetcher/fetchSingleProduct";

export default async function PostPage(params) {
  const { id } = params.params;
  const fetchItemType = "posts";
  var post;

  post = await fetchSingleProduct({ fetchItemType, id });

  if (!post.id) return <NotFound page="posts" />;
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center justify-center w-2/4 border border-solid border-gray-700 rounded-2xl bg-gray-200 dark:bg-gray-800 gap-5 p-5 h-auto mb-60 mt-4">
        <h1 className="underline font-serif cursor-pointer text-black dark:text-gray-300 text-3xl font-bold">
          {post.title}
        </h1>
        <p className="text-black dark:text-gray-300 font-serif font-normal">
          {post.body}
        </p>
        <p className="text-black font-sans dark:text-gray-200">
          Tags:{" "}
          {post.tags.map((tag, index) => (
            <span
              className="bg-gray-400 dark:bg-gray-200 text-black p-2 m-2 rounded-lg mr-1"
              key={index}
            >
              #{tag}
            </span>
          ))}{" "}
        </p>
        <div className="text-black dark:text-gray-300 font-serif font-normal">
          Views: {post.views}
        </div>
        <ReturnBackButton destination={"posts"} />
      </div>
    </div>
  );
}
