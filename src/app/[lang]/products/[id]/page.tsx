import React from "react";
import NotFound from "../../notfound/NotFound";
import { ReturnBackButton } from "../../notfound/NotFound";
import fetchSingleProduct from "../../../fetcher/fetchSingleProduct";
import { Product } from "../../../components/types";
import { DeleteItem } from "src/app/components/DeleteItem/DeleteItem";
import { createClient } from "src/app/utils/supabase/server";
import EditProductDIalog from "src/app/components/EditProductDialog/EditProductDialog";
import { Toaster } from "sonner";
interface ProductDetailsPageProps {
  params: {
    lang: string;
    id: string;
  };
}

export default async function ProductPage(props: ProductDetailsPageProps) {
  const { id } = props.params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const product = (await fetchSingleProduct(id)) as Product | null;

  if (!product) return <NotFound page="products" />;
  return (
    <div className="gap-4 min-h-wrapper pt-40 flex flex-col items-center justify-center ">
      <h1 className="underline cursor-pointer  font-bold text-2xl">
        {props.params.lang === "ka" ? product.title_ka : product.title}
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
        <ReturnBackButton destination={`${props.params.lang}/products`} />
        <Toaster></Toaster>
        {user && user.id === product.user_id ? (
          <div className="flex flex-row gap-2">
            {" "}
            <DeleteItem id={id} table="products"></DeleteItem>
            <EditProductDIalog product={product}></EditProductDIalog>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
