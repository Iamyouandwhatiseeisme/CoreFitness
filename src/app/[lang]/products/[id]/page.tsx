import NotFound from "../../notfound/NotFound";
import { ReturnBackButton } from "../../notfound/NotFound";
import fetchSingleProduct from "../../../fetcher/fetchSingleProduct";
import { Product } from "../../../components/types";
import { DeleteProductButton } from "src/app/components/DeleteProductButton/DeleteProductButton";
interface ProductDetailsPageProps {
  params: {
    lang: string;
    id: string;
  };
}

export default async function ProductPage(props: ProductDetailsPageProps) {
  const { id } = props.params;

  var product = (await fetchSingleProduct(id)) as Product | null;

  if (!product) return <NotFound page="products" />;
  return (
    <div className="gap-4 min-h-wrapper pt-40 flex flex-col items-center justify-center ">
      <h1 className="underline cursor-pointer font-serif font-bold text-2xl">
        {product.title}
      </h1>
      <img
        className="w-80 h-80 "
        src={product.img_url}
        alt="product-image"
      ></img>

      <div>
        <span className="border border-solid border-gray-500 rounded-lg p-2">
          Price: {product.price}$
        </span>{" "}
      </div>
      <div className="flex flex-row items-center justify-center">
        <ReturnBackButton destination={"products"} />
        <DeleteProductButton id={id}></DeleteProductButton>
      </div>
    </div>
  );
}
