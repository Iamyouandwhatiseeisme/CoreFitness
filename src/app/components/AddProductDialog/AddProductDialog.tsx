import { Button } from "@components/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/components/ui/dialog";
import { Input } from "@components/components/ui/input";
import { Label } from "@components/components/ui/label";
import React from "react";

export default function AddProductDialog() {
  async function createProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const response = await fetch("/api/createProduct", {
      method: "POST",
      body: formData,
    });
    console.log(response.statusText);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[580px] h-80 m-5 p-5 fixed inset-0 bg-slate-200 rounded-2xl ">
        <DialogHeader className="flex flex-col items-start justify-start">
          <DialogTitle>Add Product</DialogTitle>
          <DialogDescription>
            Please type product details below
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={createProduct}>
          <div className="grid gap-4 py-4 pr-10">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" name="name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input id="price" name="price" className="col-span-3" />
            </div>
            <div>
              <Label htmlFor="file" className="text-right">
                Upload Photo
              </Label>
              <Input id="file" type="file" name="file" className="col-span-3" />
            </div>
          </div>

          <DialogFooter className="flex flex-row items-center justify-center">
            <Button
              type="submit"
              className="rounded-2xl bg-slate-400 w-40 h-10"
            >
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
