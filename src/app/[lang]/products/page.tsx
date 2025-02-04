"use client";
import React from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { Product, SortOption } from "../../components/types";
import AddProductDialog from "src/app/components/AddProductDialog/AddProductDialog";
import { Toaster } from "sonner";
import { useCart } from "src/app/components/providers/CartProvider";
import { useLocale } from "src/app/components/providers/LanguageContext";
import SortButton from "src/app/components/SortButton/SortButton";
import FilterPanel from "src/app/components/FilterPanel/SideFilterPanel";
import ProductCard from "src/app/components/ProductCard/ProductCard";

const PRODUCTS_PER_PAGE = 10;

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<SortOption>(sortOptions[0]);

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
        columnName: sortBy.value,
        orderBy: sortBy.order === "Ascending" ? "true" : "false",
      },
    });

    const productsArray = await response.json();
    setProducts(productsArray);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      console.log(1);
      const start = (page - 1) * PRODUCTS_PER_PAGE;
      const end = page * PRODUCTS_PER_PAGE - 1;
      console.log("start", start, "end", end, page);

      try {
        const response = await fetch("/api/products", {
          headers: {
            start: start.toString(),
            end: end.toString(),
            columnName: sortBy.value,
            orderBy: sortBy.order === "Ascending" ? "true" : "false",
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

  return (
    <div className="w-full  min-h-wrapper  " data-cy="products-loaded">
      <div className="relative flex flex-col items-center">
        <div className="h-24 w-full flex flex-row items-center justify-center gap-2 bg-slate-200/20 bg-opacity-50 dark:bg-slate-800 dark:bg-opacity-50">
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
            sortBy={sortBy}
            setSortBy={setSortBy}
          ></SortButton>
          <Toaster />
        </div>
        <FilterPanel
          refetchProducts={refetchProducts}
          setItems={setProducts}
          setSelectedCategories={setSelectedCategories}
          sortBy={sortBy}
        ></FilterPanel>
        <div className="flex flex-row justify-center">
          <div className="p-5 ml-4 grid w-full sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[min(4vw,4rem)]">
            {products.length === 0 && !isLoading && (
              <div className="flex flex-col items-center justify-center w-full h-full">
                <h2 className="text-gray-700 dark:text-gray-200 font-sans font-bold text-2xl mb-4">
                  Could not find anything...
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  Try adjusting your search or filter to find what you&apos;re
                  looking for.
                </p>
              </div>
            )}
            {!isLoading &&
              products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  locale={locale}
                  addItemToCart={addItemToCart}
                />
              ))}
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
