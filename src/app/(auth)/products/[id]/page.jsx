import "./index.css";
import NotFound from "../../notfound/NotFound";
import { ReturnBackButton } from "../../notfound/NotFound";
import fetchSingleProduct from "../../../fetcher/fetchSingleProduct";

export default async function ProductPage(params) {
  console.log("page loading");

  const { id } = params.params;
  const fetchItemType = "products";
  var product;

  product = await fetchSingleProduct({ fetchItemType, id });

  if (!product.id) return <NotFound page="products" />;
  return (
    <div className="product">
      <h1>{product.title}</h1>
      <img
        className="product-image"
        src={product.images}
        alt="product-image"
      ></img>
      <p>
        Tags:{" "}
        {product.tags.map((tag, index) => (
          <span className="product-tag" key={index}>
            #{tag}
          </span>
        ))}{" "}
      </p>
      <div>
        <span>Price: {product.price}$</span>{" "}
      </div>
      <ReturnBackButton destination={"products"} />
    </div>
  );
}
