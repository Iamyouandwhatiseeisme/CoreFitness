import React, { useEffect, useState } from "react";
import { Product } from "../types";
import { createClient } from "src/app/utils/supabase/client";
export interface SideFilterPanelPorps {
  setSelectedCategories: (cateogires: Set<string>) => void;
  setItems: (items: Product[]) => void;
  retriggerFetch: (retriggerFetch: boolean) => void;
}

export default function SideFilterPanel(props: SideFilterPanelPorps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    async function fetchCategories() {
      const supabase = createClient();
      const { data: categoryData, error: categoryError } = await supabase
        .from("products")
        .select("category");
      const categories = new Set(categoryData?.map((item) => item.category));
      if (categoryError) {
        console.error("Error fetching categories:", categoryError);
      } else {
        setCategories(Array.from(categories));
      }
    }
    fetchCategories();
  }, []);
  useEffect(() => {
    async function fetchProducts() {
      console.log(1);
      props.setSelectedCategories(selectedCategories);
      const response = await fetch("/api/filter/category", {
        headers: {
          categories: JSON.stringify(Array.from(selectedCategories)),
          tableName: "products",
        },
      });
      if (response.ok) {
        const responseData = await response.json();
        if (responseData.status === 200) {
          props.setItems(responseData.data);
        }
      }
    }
    if (selectedCategories.size !== 0) {
      fetchProducts();
    }
    if (selectedCategories.size === 0) {
      props.setSelectedCategories(selectedCategories);
      props.retriggerFetch(true);
    }
  }, [selectedCategories]);

  async function handleCategoryChange(category: string) {
    setSelectedCategories((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(category)) {
        newSelected.delete(category);
      } else {
        newSelected.add(category);
      }
      return newSelected;
    });
  }

  return (
    <div className="flex flex-col w-60 h-[470px]  border-r-2 overflow-y-auto border-gray-400 fixed left-0 top-56 z-50 ">
      <div className="overflow-auto h-full flex flex-col items-start w-50 m-1 ">
        <h2 className="font-bold text-lg">Select categories to fetch</h2>
        {categories.map((category) => (
          <div
            key={category}
            className="border-b-2 border-gray-400  m-2 p-2 w-52 "
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                id={category}
                checked={selectedCategories.has(category)}
                onChange={() => handleCategoryChange(category)}
                className="mr-2"
              />
              <label htmlFor={category}>{category}</label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
