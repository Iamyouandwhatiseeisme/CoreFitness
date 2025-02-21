"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useDebounce from "src/app/hooks/useDebounce";
import React from "react";
import { Blog } from "../types";
import { useLocale } from "../providers/LanguageContext";

interface SearchBarProps {
  searchItemType: string;
  setBlogs: (products: Blog[]) => void;
  refetchBlogs: () => void;
}

export default function SearchBlogs(props: SearchBarProps) {
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedValue = useDebounce(searchValue, 500);
  const {
    dictionary: { blog },
  } = useLocale();
  const { setBlogs, refetchBlogs, searchItemType } = props;
  const router = useRouter();
  useEffect(() => {
    async function fetchSearchedValue() {
      if (debouncedValue) {
        const response = await fetch("/api/search", {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            searchValue: encodeURIComponent(debouncedValue),
            searchTable: searchItemType,
          },
        });
        const responseData = (await response.json()) as Blog[];
        if (responseData.length === 0) {
          setBlogs([]);
        } else {
          setBlogs(responseData);
        }
        setBlogs(responseData);
      }
      if (debouncedValue === "") {
        refetchBlogs();
      }
    }
    fetchSearchedValue();
  }, [debouncedValue, router, setBlogs, refetchBlogs, searchItemType]);

  return (
    <div className="flex items-center border border-solid border-gray-300 rounded-lg p-2 bg-white shadow-md dark:bg-gray-700 dark:border-gray-600">
      <input
        className="flex-grow p-2 rounded-lg outline-none bg-transparent text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        type="text"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        placeholder={blog.PlaceHolder}
        title="search"
      />
    </div>
  );
}
