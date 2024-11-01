import "./index.css";
import NotFound from "../../notfound/NotFound";
import { ReturnBackButton } from "../../notfound/NotFound";
import fetchSingleProduct from "../../fetcher/fetchSingleProduct";

export default async function ProductPage(params) {
  const { id } = params.params;
  const fetchItemType = "products";
  var product;

  product = await fetchSingleProduct({ fetchItemType, id });

  if (!product.id) return <NotFound page="products" />;
  return (
    <div className="gap-4 flex flex-col items-center justify-center ">
      <h1 className="underline cursor-pointer">{product.title}</h1>
      <img
        className="w-80 h-80 "
        src={product.images}
        alt="product-image"
      ></img>
      <p className="text-5xl p-7">
        Tags:{" "}
        {product.tags.map((tag, index) => (
          <span
            className="bg-gray-400 rounded-xl p-2 dark:bg-gray-200  mr-2"
            key={index}
          >
            #{tag}
          </span>
        ))}{" "}
      </p>
      <div>
        <span className="border border-solid border-gray-500 rounded-lg p-2">
          Price: {product.price}$
        </span>{" "}
      </div>
      <ReturnBackButton destination={"products"} />
    </div>
  );
}
