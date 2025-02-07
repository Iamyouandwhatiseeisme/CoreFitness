"use client";
import { Input } from "@components/components/ui/input";
import { Label } from "@components/components/ui/label";
import { useState } from "react";
import React from "react";
import { Blog } from "../types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import DialogFactory from "../DialogFactory/DialogFactory";
import { useLocale } from "../providers/LanguageContext";
interface EditBlogDIalogProps {
  blog: Blog;
}

export default function EditBlogDIalog(props: EditBlogDIalogProps) {
  const {
    dictionary: { blog: blogDictionary },
  } = useLocale();
  const blog = props.blog;

  const [title, setTitle] = useState<string>(blog.title);
  const [georgianTitle, setGeorgianTitle] = useState<string>(blog.title_ka);
  const [errors, setErrors] = useState<{
    title_ka?: string;
    description_ka?: string;
  }>({});
  const [description, setDescription] = useState<string>(blog.description);
  const [georgianDescription, setGeorgianDescription] = useState<string>(
    blog.description_ka
  );
  const [category, setCategory] = useState<string>(blog.category);
  const router = useRouter();

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
      [field]: isLanguageValid ? undefined : blogDictionary.ErrorMessage,
    }));

    input.value = value.replace(
      /[^\u10A0-\u10FF\s0-9!@#$%^&*()_+=[\]{};':"\\|,.<>/?-]/g,
      ""
    );
  };
  return (
    <DialogFactory
      triggerText={blogDictionary.EditBlog}
      dialogTitle={blogDictionary.EditBlog}
      submitButtonText={blogDictionary.UpdateBlog}
      dialogDescription={blogDictionary.PleaseEnter}
      refetch={() => {
        toast("Blog has been updated", {});
        router.refresh();
      }}
      onSubmit={async (formData) => {
        return await fetch("/api/updateItem", {
          method: "POST",
          headers: {
            id: blog.id.toString(),
            table: "blogs",
          },
          body: formData,
        });
      }}
    >
      <div className="grid gap-4 py-4 ">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="title" className="text-right">
            {blogDictionary.TitleEn}
          </Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            name="title"
            className="col-span-3"
            required
            data-cy="blog-title-input"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="title_ka" className="text-right">
            {blogDictionary.TitleKa}
          </Label>
          <div className="col-span-3 space-y-1">
            <Input
              id="title_ka"
              value={georgianTitle}
              onChange={(e) => setGeorgianTitle(e.target.value)}
              name="title_ka"
              className="w-full"
              onInput={handleInput}
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
          <Label htmlFor="description" className="text-right mt-2">
            {blogDictionary.DescriptionEn}
          </Label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            className="col-span-3 w-full min-w-[500px] h-32 px-3 py-2 border rounded-md text-sm 
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
                   focus-visible:ring-offset-2 resize-none dark:bg-slate-700 dark:border-slate-600 
                   dark:text-white dark:focus-visible:ring-slate-400"
            required
            data-cy="blog-description-input"
          />
        </div>

        <div className="grid grid-cols-4 items-start gap-4">
          <Label htmlFor="description_ka" className="text-right mt-2">
            {blogDictionary.DescriptionKa}
          </Label>
          <div className="col-span-3 space-y-1">
            <textarea
              id="description_ka"
              name="description_ka"
              value={georgianDescription}
              onChange={(e) => setGeorgianDescription(e.target.value)}
              className="w-full min-w-[500px] h-32 px-3 py-2 border rounded-md text-sm 
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
                     focus-visible:ring-offset-2 resize-none dark:bg-slate-700 dark:border-slate-600 
                     dark:text-white dark:focus-visible:ring-slate-400"
              onInput={handleInput}
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
          {blogDictionary.Category}
        </Label>
        <Input
          id="category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="col-span-3"
          required
          data-cy="blog-category-input"
        />
      </div>
    </DialogFactory>
  );
}
