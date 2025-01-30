import { Input } from "@components/components/ui/input";
import { Label } from "@components/components/ui/label";
import React, { useState } from "react";
import DialogFactory from "../DialogFactory/DialogFactory";

interface ProductDialogProps {
  retriggerFetch: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddBlogDialog(props: ProductDialogProps) {
  const [errors, setErrors] = useState<{
    title_ka?: string;
    description_ka?: string;
  }>({});

  const handleGeorgianInput = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    const field = input.name as "title_ka" | "description_ka";
    const value = input.value;
    const isLanguageValid = /^[\u10A0-\u10FF\s]*$/.test(value);

    setErrors((prev) => ({
      ...prev,
      [field]: isLanguageValid ? undefined : "Only Georgian alphabet allowed",
    }));

    input.value = value.replace(/[^\u10A0-\u10FF\s]/g, "");
  };

  return (
    <DialogFactory
      triggerText="Add Blog Post"
      dialogTitle="Add New Blog Post"
      dialogDescription="Please enter blog post details"
      retriggerFetch={props.retriggerFetch}
      onSubmit={async (formData) => {
        return fetch("/api/createBlog", {
          method: "POST",
          body: formData,
        });
      }}
    >
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="title" className="text-right">
          Title (English)
        </Label>
        <Input
          id="title"
          name="title"
          className="col-span-3"
          required
          data-cy="blog-title-input"
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="title_ka" className="text-right">
          Title Georgian
        </Label>
        <Input
          id="title_ka"
          name="title_ka"
          className="col-span-3"
          onInput={handleGeorgianInput}
          required
          data-cy="blog-title-ka-input"
        />
        {errors.title_ka && (
          <p className="absolute text-xs text-red-500 bottom-2 left-3">
            {errors.title_ka}
          </p>
        )}
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="description" className="text-right">
          Description (English)
        </Label>
        <Input
          id="description"
          name="description"
          className="col-span-3"
          required
          data-cy="blog-description-input"
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="description_ka" className="text-right">
          Description Georgian
        </Label>
        <Input
          id="description_ka"
          name="description_ka"
          className="col-span-3"
          onInput={handleGeorgianInput}
          required
          data-cy="blog-description-ka-input"
        />
        {errors.description_ka && (
          <p className="absolute text-xs text-red-500 bottom-2 left-3">
            {errors.description_ka}
          </p>
        )}
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="category" className="text-right">
          Category
        </Label>
        <Input
          id="category"
          name="category"
          className="col-span-3"
          required
          data-cy="blog-category-input"
        />
      </div>
    </DialogFactory>
  );
}
