import NotFound from "../[lang]/notfound/NotFound";
import { Post, Product } from "../components/types";

export default async function fetchSingleProduct(
  id: string,
  fetchItemType: string
): Promise<Post | JSX.Element | Product | null> {
  try {
    let url = `https://dummyjson.com/${fetchItemType}/${id}`;
    const response = await fetch(url);
    if (!response.ok) {
      return <NotFound page={fetchItemType}></NotFound>;
    }
    if (fetchItemType === "posts") {
      const data: Post = await response.json();
      return data;
    }

    if (fetchItemType === "products") {
      const data: Product = await response.json();
      return data;
    }
    return null;
  } catch (error) {
    console.error("Failed to find product:", error);
    return <NotFound page={fetchItemType}></NotFound>;
  }
}
