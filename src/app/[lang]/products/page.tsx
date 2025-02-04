"use client";
import React from "react";
import Link from "next/link";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { Product, SortOption } from "../../components/types";
import AddProductDialog from "src/app/components/AddProductDialog/AddProductDialog";
import { Toaster } from "sonner";
import { useCart } from "src/app/components/providers/CartProvider";
import { useLocale } from "src/app/components/providers/LanguageContext";
import SortButton from "src/app/components/SortButton/SortButton";
import FilterPanel from "src/app/components/FilterPanel/SideFilterPanel";
const PRODUCTS_PER_PAGE = 10;

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);

  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setisUpdating] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set()
  );
  const { addItemToCart } = useCart();
  const { locale } = useLocale();
  async function refetchProducts() {
    const end = page * PRODUCTS_PER_PAGE - 1;

    const response = await fetch("/api/products", {
      headers: {
        start: "0",
        end: end.toString(),
      },
    });

    const productsArray = await response.json();
    setProducts(productsArray);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const start = (page - 1) * PRODUCTS_PER_PAGE;
      const end = page * PRODUCTS_PER_PAGE - 1;
      console.log("start", start, "end", end, page);

      try {
        const response = await fetch("/api/products", {
          headers: {
            start: start.toString(),
            end: end.toString(),
          },
        });

        const productsArray = await response.json();

        setProducts((prev) => {
          const newProducts = [...prev, ...productsArray];
          const uniqueProducts = Array.from(
            new Map(newProducts.map((p) => [p.id, p])).values()
          );
          return uniqueProducts;
        });

        if (productsArray.length < PRODUCTS_PER_PAGE) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setisUpdating(false);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 1 &&
        !isUpdating &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isUpdating, hasMore]);

  if (products.length === 0 && !isLoading) {
    return (
      <div className="">
        <div className="flex flex-col items-center pt-40">
          <div className="mt-5 flex flex-row items-center">
            <SearchBar
              searchItemType="products"
              setProducts={setProducts}
              refetchProducts={refetchProducts}
            />
          </div>
          <h2 className="text-black dark:text-gray-200 font-sans font-bold text-2xl">
            Could not find anything...
          </h2>
          <AddProductDialog
            refetchProducts={refetchProducts}
          ></AddProductDialog>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full  min-h-wrapper  " data-cy="products-loaded">
      <div className="relative flex flex-col items-center">
        <div className=" h-24  bg-slate-600 w-full flex flex-row items-center justify-center gap-2">
          <AddProductDialog
            refetchProducts={refetchProducts}
          ></AddProductDialog>
          <SearchBar
            searchItemType="products"
            setProducts={setProducts}
            refetchProducts={refetchProducts}
          />

          <SortButton
            selectedCategories={selectedCategories}
            setItems={setProducts}
            sortOptions={sortOptions}
          ></SortButton>
          <Toaster />
        </div>
        <FilterPanel
          refetchProducts={refetchProducts}
          setItems={setProducts}
          setSelectedCategories={setSelectedCategories}
        ></FilterPanel>
        <div className=" flex flex-row">
          <div className="p-5 ml-44 grid grid-cols-3 gap-7">
            {!isLoading &&
              products.map((product) => {
                const title =
                  locale === "ka" ? product.title_ka : product.title;
                return (
                  <div
                    key={product.id}
                    className="items-center flex flex-col border-2 border-solid border-gray-50 rounded-xl w-80 h-auto overflow-hidden bg-neutral-400 dark:bg-neutral-200"
                  >
                    <Link
                      key={product.id}
                      href={`${locale}/products/${product.id}`}
                      data-cy={product.title}
                      className="items-center flex flex-col border-2 border-solid border-gray-50 rounded-xl w-80 h-auto overflow-hidden bg-neutral-400 dark:bg-neutral-200"
                    >
                      <img
                        className="object-scale-down w-6/12 h-3/6 m-2"
                        src={product.img_url}
                        alt={product.title}
                      ></img>
                      <div className="p-2  size text-xs m-1 ">
                        <strong>{title}</strong>
                      </div>
                      <div className="p-2  size text-xs m-1 ">
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
            {isLoading && (
              <div className="flex justify-center items-center w-full h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-solid border-current border-r-transparent"></div>
              </div>
            )}
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
