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
  dialogDescription: string;
  children: React.ReactNode;
  onSubmit: (formData: FormData) => Promise<Response>;
  retriggerFetch: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DialogFactory(props: DialogFactoryProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);

    try {
      const response = await props.onSubmit(formData);
      if (response.ok) {
        toast.success(`${props.dialogTitle} has been added`);
        props.retriggerFetch(true);
        setOpen(false);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="text-gray-200 border border-solid border-gray-400 rounded-xl p-3 dark:border-gray-200 bg-gray-800">
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="border w-40 rounded shadow-lg bg-slate-400 hover:bg-slate-300"
          >
            {props.triggerText}
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent className="sm:max-w-[580px] h-120 m-5 p-5 absolute top-0 right-96 bg-slate-200 rounded-2xl">
        <DialogHeader className="flex flex-row items-start justify-between">
          <div className="flex flex-col items-start justify-center">
            <DialogTitle>{props.dialogTitle}</DialogTitle>
            <DialogDescription>{props.dialogDescription}</DialogDescription>
          </div>

          <DialogClose onClick={() => setOpen(false)} className="...">
            <X className="h-4 w-4" />
          </DialogClose>
        </DialogHeader>

        {isLoading && <div>...isLoading</div>}
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4 pr-10">
            {props.children}
            <DialogFooter className="flex flex-row items-center justify-center">
              <Button
                type="submit"
                className="rounded-2xl bg-slate-400 w-40 h-10"
              >
                Create
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
