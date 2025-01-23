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
    <Dialog open={open} onOpenChange={setOpen}>
      <div className=" border border-solid border-gray-400 rounded-xl p-3 dark:border-gray-200 bg-gray-800 ">
        <DialogTrigger asChild>
          <Button
            data-cy="add-product-button"
            onClick={() => setOpen(true)}
            variant="outline"
            className="border w-40 rounded shadow-lg bg-slate-400 hover:bg-slate-300"
          >
            Add Product
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent className="sm:max-w-[580px] h-80 m-5 p-5 absolute top-0 right-96 bg-slate-200 rounded-2xl   ">
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
        {isLoading && <div>...isLoading</div>}
        <form onSubmit={createProduct}>
          <div className="grid gap-4 py-4 pr-10">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
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
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                name="price"
                className="col-span-3"
                data-cy="price-input-field"
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

          <DialogFooter className="flex flex-row items-center justify-center">
            <Button
              data-cy="create-product-button"
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
