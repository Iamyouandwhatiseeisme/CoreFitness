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
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import React from "react";
import { Button } from "@components/components/ui/button";

interface DialogFactoryProps {
  triggerText: string;
  dialogTitle: string;
  submitButtonText: string;
  dialogDescription: string;
  children: React.ReactNode;
  onSubmit: (formData: FormData) => Promise<Response>;
  refetch: () => void;
}

export default function DialogFactory(props: DialogFactoryProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    try {
      const response = await props.onSubmit(formData);
      if (response.ok) {
        toast.success(`${props.dialogTitle} has been added`);
        props.refetch();
        setOpen(false);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          data-cy="add-product-button"
          className="border w-40 rounded-lg shadow-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
        >
          {props.triggerText}
        </Button>
      </DialogTrigger>

      <div
        className={`${
          open &&
          "fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50 backdrop:blur-lg"
        }`}
        onClick={() => setOpen(false)}
      >
        <DialogContent
          onClick={(e) => e.stopPropagation()}
          className="fixed inset-0 w-[90vw] ml-auto mr-auto mt-10  h-[80vh] max-w-none max-h-none bg-white dark:bg-gray-900 p-10 backdrop-blur-2xl "
        >
          <DialogHeader className="flex flex-row items-start justify-around">
            <div className=" flex-col  flex-1 text-center ">
              <DialogTitle className="text-lg font-semibold">
                {props.dialogTitle}
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-600 dark:text-gray-400">
                {props.dialogDescription}
              </DialogDescription>
            </div>
            <DialogClose onClick={() => setOpen(false)} className="ml-auto">
              <X className="h-5 w-5 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-red-500" />
            </DialogClose>
          </DialogHeader>

          {isLoading && <div className="text-center text-sm">Loading...</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>{props.children}</div>
            <DialogFooter className="flex justify-end">
              <Button
                type="submit"
                data-cy="create-product-button"
                className="rounded-lg w-32 h-10 bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                {props.submitButtonText}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </div>
    </Dialog>
  );
}
