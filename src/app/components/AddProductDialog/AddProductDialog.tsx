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
import React, { useState } from "react";
import { toast } from "sonner";

interface AddProductDialogProps {
  retriggerFetch: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddProductDialog(props: AddProductDialogProps) {
  const retriggerFetch = props.retriggerFetch;
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  async function createProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);

    const response = await fetch("/api/createProduct", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      toast("Product has been added", {});
      retriggerFetch(true);
      setOpen(false);
      setIsLoading(false);
    }
  }
  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          variant="outline"
          className="border w-40 rounded shadow-lg bg-slate-400 hover:bg-slate-300"
        >
          Add Product
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[580px] h-80 m-5 p-5 absolute top-0 right-96 bg-slate-200 rounded-2xl   ">
        <DialogHeader className="flex flex-col items-start justify-start">
          <DialogTitle>Add Product</DialogTitle>
          <DialogDescription>
            Please type product details below
          </DialogDescription>
        </DialogHeader>
        {isLoading && <div>...isLoading</div>}
        <form onSubmit={createProduct}>
          <div className="grid gap-4 py-4 pr-10">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" name="name" className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input id="price" name="price" className="col-span-3" required />
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
                required
              />
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
