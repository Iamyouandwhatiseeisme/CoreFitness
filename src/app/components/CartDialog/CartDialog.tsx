import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter,
} from "@components/components/ui/dialog";
import { Minus, Plus, X } from "lucide-react";
import { CartItem, useCart } from "../providers/CartProvider";
import { Button } from "@components/components/ui/button";
import { createCheckoutSessionForCart } from "src/app/actions/stripe";

const CartDialog = () => {
  const { cartItems, removeItemFromCart, clearCart, updateItemQuantity } =
    useCart();
  const totalPrice = cartItems.reduce((total, item) => {
    return total + (item.product.price * item.quantity) / 100;
  }, 0);
  async function handleChekout() {
    const { url } = await createCheckoutSessionForCart(cartItems);

    window.location.assign(url as string);
  }

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
          className="w-3/4 h-3/4 z-50 top-[12.5%] left-[12.5%] fixed pl-10 pr-10 bg-white rounded-xl  flex flex-col items-center justify-between  "
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
            className=" justify-end rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
          </DialogClose>

          <DialogDescription className="w-full h-full ">
            <ul>
              {cartItems.length === 0 ? (
                <li>Your cart is empty...</li>
              ) : (
                cartItems.map((item: CartItem) => {
                  return (
                    <li
                      className="flex flex-row items-center justify-between h-16 border border-gray-200 p-2 m-2 rounded-2xl"
                      key={item.product.id}
                    >
                      <div className="flex flex-row">
                        <img
                          className="border mr-2 "
                          style={{ width: "30px", height: "30px" }}
                          src={item.product.img_url}
                          alt={item.product.title}
                        ></img>
                        <div className=" mr-2 "> {item.product.title} </div>
                      </div>
                      <div className="flex flex-row gap-2">
                        <div> Price: {item.product.price / 100}$</div>
                        <div className="flex flex-row gap-2">
                          {" "}
                          Quantity:{" "}
                          <div className="flex flex-row gap-2">
                            <Minus
                              className="cursor-pointer border rounded-2xl hover:bg-slate-200"
                              onClick={() =>
                                updateItemQuantity(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              }
                            ></Minus>
                            {item.quantity}
                            <Plus
                              onClick={() =>
                                updateItemQuantity(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                              className="cursor-pointer border rounded-2xl hover:bg-slate-200"
                            ></Plus>
                            <X
                              className="cursor-pointer"
                              onClick={() => {
                                removeItemFromCart(item.product.id);
                              }}
                            ></X>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
          </DialogDescription>
          <DialogFooter className="flex flex-row w-full justify-between p-5 ">
            <div> Total Price:{totalPrice} $</div>

            <Button
              className="flex flex-row items-center justify-center bg-red-800 text-white w-20"
              variant="destructive"
              onClick={() => clearCart()}
            >
              Clear Cart
            </Button>
            <Button onClick={() => handleChekout()}>Buy</Button>
          </DialogFooter>
        </DialogContent>
      </DialogContent>
    </Dialog>
  );
};

export default CartDialog;
