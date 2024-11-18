import NotFound from "../[lang]/notfound/NotFound";
import { Post } from "../components/types";

export default async function fetchSingleProduct(
  id: string,
  fetchItemType: string
): Promise<Post | JSX.Element> {
  try {
    let url = `https://dummyjson.com/${fetchItemType}/${id}`;
    const response = await fetch(url);
    if (!response.ok) {
      return <NotFound page={fetchItemType}></NotFound>;
    }
    const fetchedPost: Post = await response.json();
    return fetchedPost;
  } catch (error) {
    console.error("Failed to find product:", error);
    return <NotFound page={fetchItemType}></NotFound>;
  }
}
