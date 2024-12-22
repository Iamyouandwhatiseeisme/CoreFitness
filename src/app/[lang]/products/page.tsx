"use client";

import Link from "next/link";
import DropDown from "../../components/DropDown/DropDown";
import SearchBar from "../../components/SearchBar/SearchBar";
import fetchProducts from "../../fetcher/fetchProducts";
// import ProductActions from "../../components/buttons/ProductActions";
import { useEffect, useState } from "react";
import { ChevronRight, LucidePlus, LucidePlusCircle, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Product, SortOption } from "../../components/types";
import { Button } from "@components/components/ui/button";
import AddProductDialog from "src/app/components/AddProductDialog/AddProductDialog";

interface ProductsProps {
  searchParams: Record<string, string | undefined>;
}

export default function Products(props: ProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetch() {
      var productsArray = (await fetchProducts()) as Product[];
      console.log(productsArray, "fetching");
      setProducts(productsArray);
    }
    fetch();
  }, []);

  if (products.length === 0) {
    return (
      <div className="">
        <div className="flex flex-col items-center pt-40">
          <div className="mt-5 flex flex-row items-center">
            <SearchBar searchItemType="Search Products" />
          </div>
          <h2 className="text-black dark:text-gray-200 font-sans font-bold text-2xl">
            Could not find anything...
          </h2>
          <AddProductDialog></AddProductDialog>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full  min-h-wrapper ">
      <div className="relative flex flex-col items-center">
        <div className="mt-5 flex flex-row items-center">
          <SearchBar searchItemType="Search Products" />
        </div>
        <div className="fixed left-2 top-16 flex flex-col"></div>
        <div className="p-5 grid grid-cols-3 gap-7  mt-10">
          {products.map((product) => {
            console.log(product.img_url);
            return (
              <div
                key={product.id}
                className="items-center flex flex-col border-2 border-solid border-gray-50 rounded-xl w-80 h-auto overflow-hidden bg-neutral-400 dark:bg-neutral-200"
              >
                <img
                  className="object-scale-down w-6/12 h-3/6 m-2"
                  src={product.img_url}
                  alt={product.title}
                ></img>
                <Link key={product.id} href={`/products/${product.id}`}>
                  <div className="p-2 font-serif size text-xs m-1 ">
                    <strong>{product.title}</strong>
                  </div>
                </Link>

                <div className="p-2 font-serif size text-xs m-1 ">
                  Price: {product.price}$
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
