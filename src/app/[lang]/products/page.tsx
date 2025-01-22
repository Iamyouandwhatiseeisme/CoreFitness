"use client";
import React from "react";
import Link from "next/link";
import SearchBar from "../../components/SearchBar/SearchBar";
import fetchProducts from "../../fetcher/fetchProducts";
import { useEffect, useState } from "react";
import { Product, SortOption } from "../../components/types";
import AddProductDialog from "src/app/components/AddProductDialog/AddProductDialog";
import { Toaster } from "sonner";
import { useCart } from "src/app/components/providers/CartProvider";
import { useLocale } from "src/app/components/providers/LanguageContext";
import SortButton from "src/app/components/SortButton/SortButton";
import { createClient } from "src/app/utils/supabase/client";
import SideFilterPanel from "src/app/components/SideFilterPanel/SideFilterPanel";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set()
  );
  const { addItemToCart } = useCart();
  const { locale } = useLocale();

  useEffect(() => {
    async function fetch() {
      setIsUpdating(false);
      const productsArray = (await fetchProducts()) as Product[];
      setProducts(productsArray);
    }

    fetch();
  }, [isUpdating]);

  if (products.length === 0) {
    return (
      <div className="">
        <div className="flex flex-col items-center pt-40">
          <div className="mt-5 flex flex-row items-center">
            <SearchBar
              searchItemType="products"
              setProducts={setProducts}
              setIsUpdating={setIsUpdating}
            />
          </div>
          <h2 className="text-black dark:text-gray-200 font-sans font-bold text-2xl">
            Could not find anything...
          </h2>
          <AddProductDialog retriggerFetch={setIsUpdating}></AddProductDialog>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full  min-h-wrapper pt-32 " data-cy="products-loaded">
      <SideFilterPanel
        retriggerFetch={setIsUpdating}
        setItems={setProducts}
        setSelectedCategories={setSelectedCategories}
      ></SideFilterPanel>
      <div className="relative flex flex-col items-center">
        <div className=" h-24  bg-slate-600 w-full flex flex-row items-center justify-center gap-2">
          <AddProductDialog retriggerFetch={setIsUpdating}></AddProductDialog>
          <SearchBar
            searchItemType="products"
            setProducts={setProducts}
            setIsUpdating={setIsUpdating}
          />

          <SortButton
            selectedCategories={selectedCategories}
            setItems={setProducts}
            sortOptions={sortOptions}
          ></SortButton>
          <Toaster />
        </div>
        <div className=" flex flex-row">
          <div className="p-5 ml-44 grid grid-cols-3 gap-7">
            {products.map((product) => {
              const title = locale === "ka" ? product.title_ka : product.title;
              return (
                <div
                  key={product.id}
                  className="items-center flex flex-col border-2 border-solid border-gray-50 rounded-xl w-80 h-auto overflow-hidden bg-neutral-400 dark:bg-neutral-200"
                >
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    data-cy={product.title}
                    className="items-center flex flex-col border-2 border-solid border-gray-50 rounded-xl w-80 h-auto overflow-hidden bg-neutral-400 dark:bg-neutral-200"
                  >
                    <img
                      className="object-scale-down w-6/12 h-3/6 m-2"
                      src={product.img_url}
                      alt={product.title}
                    ></img>
                    <div className="p-2 font-serif size text-xs m-1 ">
                      <strong>{title}</strong>
                    </div>
                    <div className="p-2 font-serif size text-xs m-1 ">
                      Price: {product.price}$
                    </div>
                  </Link>
                  <div
                    className="cursor-pointer"
                    data-cy={`add-to-cart-button-${product.title}`}
                    onClick={() =>
                      addItemToCart({ product: product, quantity: 1 })
                    }
                  >
                    Add To cart
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const sortOptions: SortOption[] = [
  {
    label: "Price: Low to High",
    value: "price",
    option: "1",
    order: "Ascending",
  },
  {
    label: "Price: High to Low",
    value: "price",
    option: "2",
    order: "Descending",
  },
  {
    label: "Title: A-Z",
    value: "title",
    option: "3",
    order: "Ascending",
  },
  {
    label: "Title: Z-A",
    value: "title",
    option: "4",
    order: "Descending",
  },
];
