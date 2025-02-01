import { Input } from "@components/components/ui/input";
import { Label } from "@components/components/ui/label";
import React, { useState } from "react";
import DialogFactory from "../DialogFactory/DialogFactory";

interface AddProductDialogProps {
  refetchProducts: () => void;
}

export default function AddProductDialog(props: AddProductDialogProps) {
  const [errors, setErrors] = useState<{
    title_ka?: string;
    description_ka?: string;
  }>({});

  const handleGeorgianInput = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const input = e.target as HTMLInputElement | HTMLTextAreaElement;
    const field = input.name as "title_ka" | "description_ka";
    const value = input.value;
    const isLanguageValid = /^[\u10A0-\u10FF\s]*$/.test(value);
    console.log(field, value, isLanguageValid);

    setErrors((prev) => ({
      ...prev,
      [field]: isLanguageValid ? undefined : "Only Georgian alphabet allowed",
    }));
    console.log(errors);

    input.value = value.replace(/[^\u10A0-\u10FF\s]/g, "");
  };
  return (
    <DialogFactory
      triggerText="Add Product"
      dialogTitle="Add New Product"
      dialogDescription="Please enter product details"
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
            Title
          </Label>
          <Input
            id="name"
            name="name"
            className="col-span-3"
            data-cy="name-input-field"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name-georgian" className="text-right">
            Title Georgian
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
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <Input
            id="description"
            name="description"
            className="col-span-3"
            data-cy="description-input-field"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description-georgian" className="text-right">
            Description Georgian
          </Label>
          <div className="col-span-3 space-y-1">
            <Input
              id="description-georgian"
              name="description_ka"
              className="col-span-3"
              onInput={handleGeorgianInput}
              data-cy="description-georgian-input-field"
              required
            />
            {errors.description_ka && (
              <p className="text-xs text-red-500">{errors.description_ka}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="price" className="text-right">
            Price
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
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="category" className="text-right">
            Category
          </Label>
          <Input
            id="category"
            name="category"
            className="col-span-3"
            data-cy="category-input-field"
            required
          />
        </div>
        <div>
          <Label htmlFor="file" className="text-right">
            Upload Photo
          </Label>
          <Input
            id="file"
            type="file"
            name="file"
            className="col-span-3"
            data-cy="photo-browse-field"
            required
          />
        </div>
      </div>
    </DialogFactory>
  );
}
