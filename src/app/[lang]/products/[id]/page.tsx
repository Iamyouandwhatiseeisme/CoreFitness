import NotFound from "../../notfound/NotFound";
import { ReturnBackButton } from "../../notfound/NotFound";
import fetchSingleProduct from "../../../fetcher/fetchSingleProduct";
import { Product } from "../../../components/types";

export default async function ProductPage(
  params: Record<string, Record<string, string>>
) {
  const { id } = params.params;
  const fetchItemType = "products";
  var product: Product;

  product = (await fetchSingleProduct(id, fetchItemType)) as Product;

  if (!product.id) return <NotFound page="products" />;
  return (
    <div className="gap-4 flex flex-col items-center justify-center ">
      <h1 className="underline cursor-pointer font-serif font-bold text-2xl">
        {product.title}
      </h1>
      <img
        className="w-80 h-80 "
        src={product.img_url}
        alt="product-image"
      ></img>
      {/* <p className="text-5xl p-7">
        Tags:{" "}
        {product..map((tag, index) => (
          <span
            className="bg-gray-400 rounded-xl p-2 dark:bg-gray-200  mr-2"
            key={index}
          >
            #{tag}
          </span>
        ))}{" "}
      </p> */}
      <div>
        <span className="border border-solid border-gray-500 rounded-lg p-2">
          Price: {product.price}$
        </span>{" "}
      </div>
      <ReturnBackButton destination={"products"} />
    </div>
  );
}
