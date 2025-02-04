"use client";
import { Button } from "@components/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/components/ui/dialog";
import { Input } from "@components/components/ui/input";
import { Label } from "@components/components/ui/label";
import { X } from "lucide-react";
import { useState } from "react";
import React from "react";
import { Product } from "../types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
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

  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(product.title);
  const [georgianTitle, setGeorgianTitle] = useState<string>(product.title_ka);
  const [error, setError] = useState<string | null>(null);
  const [description, setDescription] = useState<string>(product.description);
  const [georgianDescription, setGeorgianDescription] = useState<string>(
    product.description_ka
  );
  const [price, setPrice] = useState<number>(product.price);
  const [category, setCategory] = useState<string>(product.category);
  const router = useRouter();

  async function updateProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/updateItem", {
      method: "POST",
      headers: {
        id: product.id.toString(),
        table: "products",
      },
      body: formData,
    });

    if (response.ok) {
      toast("Product has been updated", {});
      setOpen(false);
      router.refresh();
    }
  }

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    const value = input.value;

    const isLanguageValid = /^[\u10A0-\u10FF\s]*$/.test(value);

    if (!isLanguageValid) {
      setError("Only Georgian alphabet allowed");
    } else if (!input.validity.valid) {
      setError("");
    } else {
      setError(null);
    }

    input.value = value.replace(/[^\u10A0-\u10FF\s]/g, "");
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          data-cy="add-product-button"
          onClick={() => setOpen(true)}
          variant="outline"
          className="border w-40 rounded shadow-lg bg-slate-400 hover:bg-slate-300"
        >
          Edit Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[580px] h-120 m-5 p-5 absolute top-0 right-96 bg-slate-200 rounded-2xl   ">
        <DialogHeader className="flex flex-col items-start justify-start">
          <DialogTitle>Add Product</DialogTitle>
          <DialogClose
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
            }}
            onClick={() => setOpen(false)}
            className=" justify-end rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
          </DialogClose>

          <DialogDescription>
            Please type product details below
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={updateProduct}>
          <div className="grid gap-4 py-4 pr-10">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Title
              </Label>
              <Input
                id="name"
                name="name"
                className="col-span-3"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name-georgian" className="text-right">
                Title Georgian
              </Label>
              <Input
                id="name-georgian"
                name="name-georgian"
                className="col-span-3"
                value={georgianTitle}
                onChange={(e) => setGeorgianTitle(e.target.value)}
                onInput={handleInput}
                required
              />
              {error && (
                <p className="absolute text-xs text-red-500 bottom-2 left-3">
                  {error}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                className="col-span-3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description-georgian" className="text-right">
                Description Georgian
              </Label>
              <Input
                id="description-georgian"
                name="description-georgian"
                className="col-span-3"
                onInput={handleInput}
                value={georgianDescription}
                onChange={(e) => setGeorgianDescription(e.target.value)}
                required
              />
              {error && (
                <p className="absolute text-xs text-red-500 bottom-2 left-3">
                  {error}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
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
                Category
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
                Upload Photo
              </Label>
              <div className="col-span-3 space-y-1">
                <Input
                  id="file1"
                  type="file"
                  name="file1"
                  className="col-span-3"
                  required
                />
                <Input
                  id="file2"
                  type="file"
                  name="file2"
                  className="col-span-3"
                  required
                />
              </div>
            </div>
          </div>

          <DialogFooter className="flex flex-row items-center justify-center">
            <Button
              data-cy="create-product-button"
              type="submit"
              className="rounded-2xl bg-slate-400 w-40 h-10"
            >
              Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
