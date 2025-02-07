import React, { useState } from "react";
import { Product } from "../types";
import Link from "next/link";
import { useLocale } from "../providers/LanguageContext";
interface ProductCardtProps {
  product: Product;
  locale: string;
  addItemToCart: (product: { product: Product; quantity: number }) => void;
}

export default function ProductCard({
  product,
  locale,
  addItemToCart,
}: ProductCardtProps) {
  const [isHovered, setIsHovered] = useState(false);
  const {
    dictionary: { products },
  } = useLocale();
  const title = locale === "ka" ? product.title_ka : product.title;
  const description =
    locale === "ka" ? product.description_ka : product.description;
  return (
    <div
      className={`flex flex-col items-center rounded-lg shadow-lg w-full sm:w-80 bg-white dark:bg-gray-800 overflow-hidden group duration-100 ease-in-out transition-transform transform hover:scale-105`}
    >
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
        {products.AddToCart}
      </button>
      <div className="p-4 w-full text-center flex flex-col items-center space-y-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 min-h-8 max-h-8 overflow-hidden ">
          {title}
        </h3>
        <h4 className="text-md text-gray-900 dark:text-gray-100 h-16 min-h-16 max-h-16 overflow-hidden">
          {description}
        </h4>
        <p className="text-gray-600 dark:text-gray-400">
          {products.Price} : ${product.price}
        </p>
      </div>
    </div>
  );
}
