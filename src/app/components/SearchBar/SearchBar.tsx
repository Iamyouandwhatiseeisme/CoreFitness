"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useDebounce from "src/app/hooks/useDebounce";
import React from "react";
import { Product } from "../types";
import { useLocale } from "../providers/LanguageContext";

interface SearchBarProps {
  searchItemType: string;
  setProducts: (products: Product[]) => void;
  refetchProducts: () => void;
}

export default function SearchBar(props: SearchBarProps) {
  const {
    dictionary: { products },
  } = useLocale();
  const { searchItemType, refetchProducts, setProducts } = props;
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedValue = useDebounce(searchValue, 500);
  const router = useRouter();
  useEffect(() => {
    async function fetchSearchedValue() {
      if (debouncedValue) {
        const response = await fetch("/api/search", {
          headers: {
            searchValue: encodeURIComponent(debouncedValue),
            searchTable: searchItemType,
          },
        });
        const responseData = (await response.json()) as Product[];
        if (responseData.length === 0) {
          setProducts([]);
        } else {
          setProducts(responseData);
        }
      }
      if (debouncedValue === "") {
        refetchProducts();
      }
    }
    fetchSearchedValue();
  }, [debouncedValue, router, refetchProducts, searchItemType, setProducts]);

  return (
    <div className="flex items-center border border-solid border-gray-300 rounded-lg p-2 bg-white shadow-md dark:bg-gray-700 dark:border-gray-600">
      <input
        id="search-input"
        className="flex-grow p-2 rounded-lg outline-none bg-transparent text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        type="text"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        placeholder={products.SearchProduct}
        title="search"
      />
    </div>
  );
}
