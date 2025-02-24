import { Input } from "@components/components/ui/input";
import { Label } from "@components/components/ui/label";
import React, { useState } from "react";
import DialogFactory from "../DialogFactory/DialogFactory";
import { useLocale } from "../providers/LanguageContext";

interface ProductDialogProps {
  refetchBlogs: () => void;
}

export default function AddBlogDialog(props: ProductDialogProps) {
  const [errors, setErrors] = useState<{
    title_ka?: string;
    description_ka?: string;
    description?: string;
    title?: string;
  }>({});
  const {
    dictionary: { blog },
  } = useLocale();

  const handleEnglishInput = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const input = e.target as HTMLTextAreaElement;
    const value = input.value;
    const field = input.name as "title" | "description";

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
      triggerText={blog.AddBlog}
      dialogTitle={blog.AddBlog}
      dialogDescription={blog.PleaseEnter}
      refetch={props.refetchBlogs}
      submitButtonText={blog.CreateBlog}
      onSubmit={async (formData) => {
        return fetch("/api/createBlog", {
          method: "POST",
          body: formData,
        });
      }}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              {blog.TitleEn}
            </Label>
            <div className="col-span-3 space-y-1">
              <Input
                id="title"
                name="title"
                className="col-span-3"
                onInput={handleEnglishInput}
                required
                data-cy="blog-title-input"
              />
              {errors.title && (
                <p className="text-xs text-red-500">{errors.title}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title_ka" className="text-right">
              {blog.TitleKa}
            </Label>
            <div className="col-span-3 space-y-1">
              <Input
                id="title_ka"
                name="title_ka"
                className="w-full"
                onInput={handleGeorgianInput}
                required
                data-cy="blog-title-ka-input"
              />
              {errors.title_ka && (
                <p className="text-xs text-red-500">{errors.title_ka}</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-4 items-start gap-4">
            <Label
              htmlFor="description"
              className="text-right mt-2 break-words"
            >
              {blog.DescriptionEn}
            </Label>
            <div className="col-span-3 space-y-1">
              <textarea
                id="description"
                name="description"
                className="w-full sm:min-w-[500px] h-32 px-3 py-2 border rounded-md text-sm 
               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
               focus-visible:ring-offset-2 resize-none dark:bg-slate-700 dark:border-slate-600 
               dark:text-white dark:focus-visible:ring-slate-400"
                onInput={handleEnglishInput}
                required
                data-cy="blog-description-input"
              />
              {errors.description && (
                <p className="text-xs text-red-500">{errors.description}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label
              htmlFor="description_ka"
              className="text-right mt-2 break-words"
            >
              {blog.DescriptionKa}
            </Label>
            <div className="col-span-3 space-y-1">
              <textarea
                id="description_ka"
                name="description_ka"
                className="w-full sm:min-w-[500px] h-32 px-3 py-2 border rounded-md text-sm 
               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
               focus-visible:ring-offset-2 resize-none dark:bg-slate-700 dark:border-slate-600 
               dark:text-white dark:focus-visible:ring-slate-400"
                onInput={handleGeorgianInput}
                required
                data-cy="blog-description-ka-input"
              />
              {errors.description_ka && (
                <p className="text-xs text-red-500">{errors.description_ka}</p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="category" className="text-right">
            {blog.Category}
          </Label>
          <Input
            id="category"
            name="category"
            className="col-span-3"
            required
            data-cy="blog-category-input"
          />
        </div>
      </div>
    </DialogFactory>
  );
}
