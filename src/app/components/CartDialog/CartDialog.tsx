import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@components/components/ui/dialog";
import { X } from "lucide-react";

const CartDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>Open Cart</button>
      </DialogTrigger>
      <DialogContent className="fixed top-0 left-0 w-full h-full bg-gray-400 bg-opacity-50 backdrop-blur-md z-40">
        <DialogContent
          style={{
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
          className="w-3/4 h-3/4 z-50 top-[12.5%] left-[12.5%] fixed pl-10 pr-10 bg-white rounded-xl  flex flex-col items-center justify-start  "
        >
          <DialogTitle className="w-full h-16 border-b-2 border-gray-400 flex flex-row items-center justify-center ">
            Your Cart
          </DialogTitle>
          <DialogClose
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
            }}
            className="    justify-end rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
          </DialogClose>

          <DialogDescription>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ul>
          </DialogDescription>
        </DialogContent>
      </DialogContent>
    </Dialog>
  );
};

export default CartDialog;
