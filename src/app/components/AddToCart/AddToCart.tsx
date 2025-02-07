"use client";
import { useCart } from "../providers/CartProvider";
import { useLocale } from "../providers/LanguageContext";
import { Product } from "../types";
import React from "react";

interface AddToCartProps {
  product: Product;
  quantity: number;
}

export default function AddToCart(props: AddToCartProps) {
  const { addItemToCart } = useCart();
  const {
    dictionary: { products },
  } = useLocale();

  return (
    <button
      className="w-20 max-h-20 z-50 py-2 rounded-lg   dark:bg-white text-black border-black/20 border dark:hover:bg-blue-700 hover:text-white bg-blue-500/20 hover:bg-blue-600 transition-colors duration-300  hover:opacity-100"
      data-cy={`add-to-cart-button-${props.product.title}`}
      onClick={() => addItemToCart({ product: props.product, quantity: 1 })}
    >
      {products.AddToCart}
    </button>
  );
}
