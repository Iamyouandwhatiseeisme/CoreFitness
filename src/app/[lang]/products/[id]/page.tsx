import React from "react";
import NotFound from "../../notfound/NotFound";
import { ReturnBackButton } from "../../notfound/NotFound";
import fetchSingleProduct from "../../../fetcher/fetchSingleProduct";
import { Product } from "../../../components/types";
import { DeleteItem } from "src/app/components/DeleteItem/DeleteItem";
import { createClient } from "src/app/utils/supabase/server";
import EditProductDIalog from "src/app/components/EditProductDialog/EditProductDialog";
import { Toaster } from "sonner";

import ImageCarousel from "src/app/components/ImageCarousel/ImageCarousel";

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
    <div className="min-h-screen flex flex-row items-start justify-between gap-20 dark:bg-gray-900">
      <ReturnBackButton destination={`${props.params.lang}/products`} />

      <div className="min-h-screen flex flex-col items-center justify-center py-10 bg-gray-100 dark:bg-gray-800">
        <div className="relative w-150 max-w-4xl p-6">
          <h1 className="text-4xl font-bold mb-4 text-center dark:text-white">
            {props.params.lang === "ka" ? product.title_ka : product.title}
          </h1>
          <ImageCarousel images={product.images} />

          <div className="text-lg mb-4 dark:text-gray-300">
            <p>
              {props.params.lang === "ka"
                ? product.description_ka
                : product.description}
            </p>
          </div>
          <div className="text-lg mb-4 dark:text-gray-300">
            <p>Category: {product.category}</p>
          </div>
          <div className="flex flex-col items-center">
            <Toaster />
          </div>
          <div className="text-2xl font-semibold mb-4 text-center dark:text-white">
            Price: ${product.price}
          </div>
        </div>
      </div>
      {user && user.id === product.user_id && (
        <div className="flex flex-col gap-4 mt-4">
          <DeleteItem id={id} table="products" />
          <EditProductDIalog product={product} />
        </div>
      )}
    </div>
  );
}
