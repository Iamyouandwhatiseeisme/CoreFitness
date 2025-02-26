import { Input } from "@components/components/ui/input";
import { Label } from "@components/components/ui/label";
import React, { useState } from "react";
import DialogFactory from "../DialogFactory/DialogFactory";
import { useLocale } from "../providers/LanguageContext";

interface AddProductDialogProps {
  refetchProducts: () => void;
  setRefetchCategories: (refetch: boolean) => void;
}

export default function AddProductDialog(props: AddProductDialogProps) {
  const [errors, setErrors] = useState<{
    title_ka?: string;
    description_ka?: string;
    name?: string;
    description?: string;
  }>({});

  const {
    dictionary: { products, blog },
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

  const handleGeorgianInput = (
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
      triggerText={products.AddProduct}
      dialogTitle={products.AddProduct}
      setRefetchCategories={props.setRefetchCategories}
      submitButtonText={products.AddProduct}
      dialogDescription={blog.PleaseEnter}
      refetch={props.refetchProducts}
      onSubmit={async (formData) => {
        return fetch("/api/createProduct", {
          method: "POST",
          body: formData,
        });
      }}
    >
      <div className="grid gap-4 py-4 pr-10">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            {blog.TitleEn}
          </Label>
          <div className="col-span-3 space-y-1">
            <Input
              id="name"
              name="name"
              onInput={handleEnglishInput}
              className="col-span-3"
              data-cy="name-input-field"
              required
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name}</p>
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
              onInput={handleGeorgianInput}
              data-cy="name-georgian-input-field"
              required
            />
            {errors.title_ka && (
              <p className="text-xs text-red-500">{errors.title_ka}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-4 items-start gap-4">
          <Label htmlFor="description" className="text-right mt-2 break-words">
            {blog.DescriptionEn}
          </Label>
          <div className="col-span-3 space-y-1">
            <textarea
              id="description"
              name="description"
              onInput={handleEnglishInput}
              className="col-span-3 w-full sm:min-w-[500px] h-32 px-3 py-2 border rounded-md text-sm 
             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
             focus-visible:ring-offset-2 resize-none dark:bg-slate-700 dark:border-slate-600 
             dark:text-white dark:focus-visible:ring-slate-400"
              data-cy="description-input-field"
              required
            />
            {errors.description && (
              <p className="text-xs text-red-500">{errors.description}</p>
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
              onInput={handleGeorgianInput}
              data-cy="description-georgian-input-field"
              required
            />
            {errors.description_ka && (
              <p className="text-xs text-red-500">{errors.description_ka}</p>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 items-center gap-4 mr-10">
        <Label htmlFor="price" className="text-right">
          {products.Price}
        </Label>
        <Input
          id="price"
          name="price"
          type="number"
          className="col-span-3"
          data-cy="price-input-field"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4 mr-10">
        <Label htmlFor="category" className="text-right">
          {blog.Category}
        </Label>
        <Input
          id="category"
          name="category"
          className="col-span-3"
          data-cy="category-input-field"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4 mr-10">
        <Label htmlFor="file" className="text-right">
          {products.UploadPhotos}
        </Label>
        <div className="col-span-3 space-y-1">
          <Input
            id="file1"
            type="file"
            name="file1"
            className="col-span-3"
            data-cy="photo-browse-field-1"
            required
          />
          <Input
            id="file2"
            type="file"
            name="file2"
            className="col-span-3"
            data-cy="photo-browse-field-2"
            required
          />
        </div>
      </div>
    </DialogFactory>
  );
}
