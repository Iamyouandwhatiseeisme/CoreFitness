import NotFound from "../[lang]/notfound/NotFound";
import { Post, Product } from "../components/types";

interface PostsResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}
interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export default async function fetchProducts(
  fetchItemType: string,
  debouncedSearch: string,
  sortOption: string,
  sortOrder: string
) {
  try {
    let url = `https://dummyjson.com/${fetchItemType}`;
    if (debouncedSearch) {
      url = `https://dummyjson.com/${fetchItemType}/search?q=${debouncedSearch}`;
    }
    if (sortOption && sortOrder) {
      url = `https://dummyjson.com/${fetchItemType}?sortBy=${sortOption}&order=${sortOrder}`;
    }
    const response = await fetch(url);

    if (fetchItemType === "posts") {
      const data: PostsResponse = await response.json();
      return data.posts;
    }
    if (fetchItemType === "products") {
      const data: ProductsResponse = await response.json();
      return data.products;
    }
    return [];
  } catch (error) {
    return <NotFound page={fetchItemType}></NotFound>;
  }
}
