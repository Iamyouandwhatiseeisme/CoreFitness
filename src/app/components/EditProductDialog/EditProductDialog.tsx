"use client";
import { Input } from "@components/components/ui/input";
import { Label } from "@components/components/ui/label";
import { useState } from "react";
import React from "react";
import { Product } from "../types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import DialogFactory from "../DialogFactory/DialogFactory";
import { useLocale } from "../providers/LanguageContext";

interface EditProductDIalogProps {
  product: Omit<
    Product,
    Exclude<
      keyof Product,
      | "title"
      | "price"
      | "img_url"
      | "title_ka"
      | "description"
      | "description_ka"
      | "category"
      | "id"
    >
  >;
}

export default function EditProductDIalog(props: EditProductDIalogProps) {
  const product = props.product;

  const [title, setTitle] = useState<string>(product.title);
  const [georgianTitle, setGeorgianTitle] = useState<string>(product.title_ka);
  const [errors, setErrors] = useState<{
    title_ka?: string;
    description_ka?: string;
    title?: string;
    description?: string;
  }>({});
  const [description, setDescription] = useState<string>(product.description);
  const [georgianDescription, setGeorgianDescription] = useState<string>(
    product.description_ka
  );
  const [price, setPrice] = useState<number>(product.price);
  const [category, setCategory] = useState<string>(product.category);
  const router = useRouter();
  const {
    dictionary: { blog, products },
  } = useLocale();
  const handleEnglishInput = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const input = e.target as HTMLTextAreaElement;
    const value = input.value;
    const field = input.name as "name" | "description";

    const isLanguageValid =
      /^[a-zA-Z\s0-9!@#$%^&*()_+=[\]{};':"\\|,.<>/?-]*$/.test(value);

    setErrors((prev) => ({
      ...prev,
      [field]: isLanguageValid ? undefined : blog.ErrorMessageEn,
    }));

    input.value = value.replace(
      /[^a-zA-Z\s0-9!@#$%^&*()_+=[\]{};':"\\|,.<>/?-]/g,
      ""
    );
  };

  const handleInput = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const input = e.target as HTMLInputElement | HTMLTextAreaElement;
    const field = input.name as "title_ka" | "description_ka";
    const value = input.value;
    const isLanguageValid =
      /^[\u10A0-\u10FF\s0-9!@#$%^&*()_+=[\]{};':"\\|,.<>/?-]*$/.test(value);

    setErrors((prev) => ({
      ...prev,
      [field]: isLanguageValid ? undefined : blog.ErrorMessage,
    }));

    input.value = value.replace(
      /[^\u10A0-\u10FF\s0-9!@#$%^&*()_+=[\]{};':"\\|,.<>/?-]/g,
      ""
    );
  };

  return (
    <DialogFactory
      triggerText={products.EditProduct}
      dialogTitle={products.EditProduct}
      submitButtonText={products.Update}
      dialogDescription={blog.PleaseEnter}
      refetch={() => {
        toast(products.ProductUpdated, {});
        router.refresh();
      }}
      onSubmit={async (formData) => {
        return await fetch("/api/updateItem", {
          method: "POST",
          headers: {
            id: product.id.toString(),
            table: "products",
          },
          body: formData,
        });
      }}
    >
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            {blog.TitleEn}
          </Label>
          <div className="col-span-3 space-y-1">
            <Input
              id="name"
              name="title"
              onInput={handleEnglishInput}
              className="col-span-3"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              required
            />
            {errors.title && (
              <p className="text-xs text-red-500">{errors.title}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name-georgian" className="text-right">
            {blog.TitleKa}
          </Label>
          <div className="col-span-3 space-y-1">
            <Input
              id="name-georgian"
              name="title_ka"
              className="col-span-3"
              value={georgianTitle}
              onChange={(e) => setGeorgianTitle(e.target.value)}
              onInput={handleInput}
              required
            />
            {errors.title_ka && (
              <p className="text-xs text-red-500">{errors.title_ka}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-4 items-start gap-4">
          <Label
            htmlFor="description-georgian"
            className="text-right mt-2 break-words"
          >
            {blog.DescriptionKa}
          </Label>
          <div className="col-span-3 space-y-1">
            <textarea
              id="description-georgian"
              name="description_ka"
              className="w-full sm:min-w-[500px] h-32 px-3 py-2 border rounded-md text-sm 
               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
               focus-visible:ring-offset-2 resize-none dark:bg-slate-700 dark:border-slate-600 
               dark:text-white dark:focus-visible:ring-slate-400"
              onInput={handleInput}
              value={georgianDescription}
              onChange={(e) => setGeorgianDescription(e.target.value)}
              required
            />
            {errors.description_ka && (
              <p className="text-xs text-red-500">{errors.description_ka}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-4 items-start gap-4">
          <Label
            htmlFor="description-georgian"
            className="text-right mt-2 break-words"
          >
            {blog.DescriptionEn}
          </Label>
          <div className="col-span-3 space-y-1">
            <textarea
              id="description"
              name="description"
              onInput={handleEnglishInput}
              className="w-full sm:min-w-[500px] h-32 px-3 py-2 border rounded-md text-sm 
               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
               focus-visible:ring-offset-2 resize-none dark:bg-slate-700 dark:border-slate-600 
               dark:text-white dark:focus-visible:ring-slate-400"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            {errors.description && (
              <p className="text-xs text-red-500">{errors.description}</p>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="price" className="text-right">
          {products.Price}
        </Label>
        <Input
          type="number"
          id="price"
          name="price"
          value={price}
          maxLength={9}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="category" className="text-right">
          {blog.Category}
        </Label>
        <Input
          id="category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="col-span-3"
          required
        />
      </div>
      <div>
        <Label htmlFor="file" className="text-right">
          {products.UploadPhotos}
        </Label>
        <div className="col-span-3 space-y-1">
          <Input
            id="file1"
            type="file"
            name="file1"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
          <Input
            id="file2"
            type="file"
            name="file2"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>
      </div>
    </DialogFactory>
  );
}
