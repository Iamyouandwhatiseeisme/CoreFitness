"use client";

import "./index.css";
import Link from "next/link";
import DropDown from "../../components/DropDown/DropDown";
import SearchBar from "../../components/SearchBar/SearchBar";
import fetchProducts from "../../fetcher/fetchProducts";
import ProductActions from "../../components/buttons/ProductActions";
import { useEffect, useState } from "react";
import AddButton from "../../components/AddButton/AddButton";
import { useRouter } from "next/navigation";

export default function Products({ searchParams }) {
  const debouncedSearch = searchParams.search || "";
  const sortOption = searchParams.option || "";
  const sortOrder = searchParams.order || "";
  const fetchItemType = "products";
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState();
  const router = useRouter();

  const sortOptions = [
    {
      label: "Price: Low to High",
      value: "price-low-to-high",
      option: "price",
      order: "asc",
    },
    {
      label: "Price: High to Low",
      value: "price-high-to-low",
      option: "price",
      order: "desc",
    },
    {
      label: "Name: A-Z",
      value: "name-ascending",
      option: "title",
      order: "asc",
    },
    {
      label: "Name: Z-A",
      value: "name-descending",
      option: "title",
      order: "desc",
    },
  ];

  function editProducts({ products, setProducts }) {
    return function changeProductproducts(product) {
      products.forEach((item) => {
        if (item.id === product.id) {
          const index = products.indexOf(item);
          const newArray = products;
          newArray[index] = product;
          setProducts(newArray);
        }
      });
    };
  }

  const deleteProduct = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  const addProduct = (item) => {
    const newId = Date.now();
    const itemWithId = { ...item, id: newId };
    setProducts((prevProducts) => [...prevProducts, itemWithId]);
  };
  const toggleHandler = (option, order) => {
    router.push(`?option=${option}&order=${order}`);
  };

  useEffect(() => {
    async function fetch() {
      var productArray = await fetchProducts({
        fetchItemType,
        debouncedSearch,
        sortOption,
        sortOrder,
      });
      setProducts(productArray);
    }
    fetch();
  }, [fetchItemType, debouncedSearch, sortOption, sortOrder]);
  var callBack = editProducts({ products, setProducts });

  function onEditingChange(editing) {
    setEditing(editing);
  }

  if (products.length === 0) {
    return (
      <div>
        <div className="flex flex-col items-center">
          <div className="mt-5 flex flex-row items-center">
            <SearchBar searchItemType="Search Products" />
          </div>
          <h2 className="text-black dark:text-gray-200 font-sans font-bold text-2xl">
            Could not find anything...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative flex flex-col items-center">
        <div className="mt-5 flex flex-row items-center">
          <SearchBar searchItemType="Search Products" />
        </div>
        <div className="fixed left-2 top-16 flex flex-col">
          <DropDown
            buttonText="Sort Products By:"
            content={sortOptions}
            toggleHandler={toggleHandler}
            type="Sorter"
          ></DropDown>
        </div>
        <div className="p-5 grid grid-cols-3 gap-7 m-0">
          {products.map((product) => {
            return (
              <div
                key={product.id}
                className="items-center flex flex-col border-2 border-solid border-gray-50 rounded-xl w-80 h-auto overflow-hidden bg-neutral-400 dark:bg-neutral-200"
              >
                <img
                  className="object-scale-down w-6/12 h-3/6 m-2"
                  src={product.thumbnail}
                  alt={product.title}
                ></img>
                <Link key={product.id} href={`/products/${product.id}`}>
                  <div className="p-2 font-serif size text-xs m-1 ">
                    <strong>{product.title}</strong>
                  </div>
                </Link>
                <div className="p-2 font-serif size text-xs m-1 ">
                  {product.description}
                </div>
                <div className="p-2 font-serif size text-xs m-1 ">
                  Price: {product.price}$
                </div>
                <ProductActions
                  type={"products"}
                  product={product}
                  setProductCallBack={callBack}
                  onEditingChange={onEditingChange}
                  deleteProductCallback={deleteProduct}
                />
              </div>
            );
          })}
        </div>
        <AddButton item="Products" addProduct={addProduct} />
      </div>
    </div>
  );
}
