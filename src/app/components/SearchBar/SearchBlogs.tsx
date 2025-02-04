"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useDebounce from "src/app/hooks/useDebounce";
import React from "react";
import { Blog } from "../types";

interface SearchBarProps {
  searchItemType: string;
  setBlogs: (products: Blog[]) => void;
  refetchBlogs: () => void;
}

export default function SearchBlogs(props: SearchBarProps) {
  const searchItemType = props.searchItemType;
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedValue = useDebounce(searchValue, 500);
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
          props.setBlogs([]);
        } else {
          props.setBlogs(responseData);
        }
        props.setBlogs(responseData);
      }
      if (debouncedValue === "") {
        props.refetchBlogs();
      }
    }
    fetchSearchedValue();
  }, [debouncedValue, router]);

  return (
    <div className="flex items-center border border-solid border-gray-300 rounded-lg p-2 bg-white shadow-md dark:bg-gray-700 dark:border-gray-600">
      <input
        className="flex-grow p-2 rounded-lg outline-none bg-transparent text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        type="text"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        placeholder={`Search ${searchItemType}`}
        title="search"
      />
    </div>
  );
}
