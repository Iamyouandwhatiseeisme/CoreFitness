"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useDebounce from "src/app/hooks/useDebounce";
import React from "react";
import { Blog } from "../types";

interface SearchBarProps {
  searchItemType: string;
  setBlogs: (products: Blog[]) => void;
  setIsUpdating: (isUpdating: boolean) => void;
}

export default function SearchBlogs(props: SearchBarProps) {
  const searchItemType = props.searchItemType;
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedValue = useDebounce(searchValue, 500);
  const router = useRouter();
  useEffect(() => {
    async function fetchSearchedValue() {
      if (debouncedValue) {
        console.log(debouncedValue);
        const response = await fetch("/api/search", {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            searchValue: encodeURIComponent(debouncedValue),
            searchTable: searchItemType,
          },
        });
        console.log(response);
        const responseData = (await response.json()) as Blog[];
        console.log(responseData);
        props.setBlogs(responseData);
      }
      if (debouncedValue === "") {
        props.setIsUpdating(true);
      }
    }
    fetchSearchedValue();
  }, [debouncedValue, router]);

  return (
    <div className="text-black border border-solid border-gray-400 rounded-xl p-3 dark:border-gray-200 bg-gray-800 ">
      Search:{"  "}
      <input
        className="rounded-xl placeholder:p-2"
        type="text"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        placeholder={searchItemType}
        title="search"
      ></input>
    </div>
  );
}
