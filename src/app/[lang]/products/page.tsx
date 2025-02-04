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
        <div className=" flex flex-row">
          <div className="p-5 ml-44 grid grid-cols-3 gap-7">
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
interface ProductCardtProps {
  product: Product;
  locale: string;
  addItemToCart: (product: { product: Product; quantity: number }) => void;
}

function ProductCard({ product, locale, addItemToCart }: ProductCardtProps) {
  const [isHovered, setIsHovered] = useState(false);
  const title = locale === "ka" ? product.title_ka : product.title;
  return (
    <div className="flex flex-col items-center rounded-lg shadow-lg w-full sm:w-80 bg-white dark:bg-gray-800 overflow-hidden group">
      <div
        key={product.id}
        className="flex flex-col items-center border h-80 rounded-t-lg  border-gray-200 border-b-0 dark:border-gray-700 shadow-lg w-full sm:w-80 bg-white dark:bg-gray-800 overflow-hidden group"
      >
        <Link
          key={product.id}
          href={`${locale}/products/${product.id}`}
          data-cy={product.title}
          className="flex flex-col items-center w-full h-full relative"
        >
          <img src={product.images[0]} alt={product.title} />
          <img
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`object-cover w-full h-full duration-500 ease-in-out absolute top-0 left-0 transition-opacity ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            src={product.images[1]}
            alt={product.title}
          />
        </Link>
      </div>
      <button
        className="w-full py-2 bg-gray-600/40 text-black border-b-0 hover:bg-blue-700 hover:text-white dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-300 opacity-0 group-hover:opacity-100"
        data-cy={`add-to-cart-button-${product.title}`}
        onClick={() => addItemToCart({ product: product, quantity: 1 })}
      >
        Add To Cart
      </button>
      <div className="p-4 w-full text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Price: ${product.price}
        </p>
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
