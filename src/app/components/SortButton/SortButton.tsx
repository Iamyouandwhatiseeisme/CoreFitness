import React, { useState } from "react";
import { Product, SortOption } from "../types";
export interface SortButtonProps {
  setItems: (products: Product[]) => void;
  sortOptions: SortOption[];
  selectedCategories: Set<string>;
}
export default function SortButton(props: SortButtonProps) {
  const sortOptions = props.sortOptions;
  const setItems = props.setItems;

  const [sortBy, setSortBy] = useState<SortOption>(sortOptions[0]);

  async function handleSort(optionValue: number) {
    const sortOption = sortOptions[optionValue - 1];
    setSortBy(sortOption);

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
      <select onChange={(e) => handleSort(Number(e.target.value))}>
        {sortOptions.map((sortOption: SortOption) => {
          return (
            <option key={sortOption.option} value={sortOption.option}>
              {sortOption.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}
