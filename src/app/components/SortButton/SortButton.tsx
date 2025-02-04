import React from "react";
import { Product, SortOption } from "../types";
export interface SortButtonProps {
  setItems: (products: Product[]) => void;
  sortOptions: SortOption[];
  selectedCategories: Set<string>;
  setSortBy: (sortOption: SortOption) => void;
  sortBy: SortOption;
}
export default function SortButton(props: SortButtonProps) {
  const sortOptions = props.sortOptions;
  const setItems = props.setItems;

  async function handleSort(optionValue: number) {
    const sortOption = sortOptions[optionValue - 1];
    props.setSortBy(sortOption);

    const response = await fetch("/api/filter", {
      headers: {
        tableName: "products",
        columnName: sortOption.value,
        orderBy: sortOption.order === "Ascending" ? "true" : "false",
        selectedCategory: JSON.stringify(Array.from(props.selectedCategories)),
      },
    });
    if (response.ok) {
      const responseData = await response.json();
      setItems(responseData.data);
    }
  }

  return (
    <div>
      <select
        id="sort-select"
        className="sort-select block w-full p-2 shadow-black/20 dark:shadow-white/20 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
        onChange={(e) => handleSort(Number(e.target.value))}
      >
        {sortOptions.map((sortOption: SortOption) => (
          <option key={sortOption.option} value={sortOption.option}>
            {sortOption.label}
          </option>
        ))}
      </select>
      <span className="sort-select-arrow absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-gray-700 dark:text-gray-300">
        &#9662;
      </span>
    </div>
  );
}
