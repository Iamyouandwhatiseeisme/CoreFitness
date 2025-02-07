import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@components/components/ui/dialog";
import { Minus, Plus, X } from "lucide-react";
import { CartItem, useCart } from "../providers/CartProvider";
import { Button } from "@components/components/ui/button";
import React, { useState } from "react";
import { PiShoppingCart } from "react-icons/pi";
import { useLocale } from "../providers/LanguageContext";

const CartDialog = () => {
  const { cartItems, removeItemFromCart, clearCart, updateItemQuantity } =
    useCart();
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const totalPrice = cartItems.reduce((total, item) => {
    return total + (item.product.price * item.quantity) / 100;
  }, 0);
  const {
    dictionary: { cart },
  } = useLocale();

  async function handleChekout() {
    if (cartItems.length !== 0) {
      try {
        const response = await fetch("/api/checkout", {
          method: "POST",
          body: JSON.stringify({
            line_items: cartItems.map((item) => ({
              quantity: item.quantity,
              price: item.product.stripe_price_id,
            })),
            cart_items: cartItems.map((item) => ({
              title: item.product.title,
              product_id: item.product.id,
              quantity: item.quantity,
            })),
          }),
        });
        const { url } = await response.json();
        if (url !== undefined) {
          window.location.assign(url as string);
          clearCart();
        }
      } catch (error) {
        alert(error);
      }
    } else {
      setError("You need to add items to cart before buying");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          data-cy="open-cart-button"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors shadow-lg"
        >
          <PiShoppingCart className="w-5 h-5" />
          <span>
            {cart.ViewCart}({cartItems.length})
          </span>
        </button>
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
          <div className="w-full h-full max-w-none max-h-none bg-white rounded-none md:rounded-xl shadow-2xl flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <DialogTitle className="text-2xl font-bold">
                {cart.YourCart}
              </DialogTitle>
              <DialogClose
                className="rounded-full p-2 hover:bg-gray-100 transition-colors"
                onClick={() => setOpen(false)}
              >
                <X className="w-6 h-6 text-gray-500" />
              </DialogClose>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <ul className="space-y-4">
                {cartItems?.length > 0 ? (
                  cartItems.map((item: CartItem) => (
                    <li
                      key={item.product.id}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <img
                        src={item.product.images?.[0] || "/placeholder.jpg"}
                        alt={item.product.title}
                        className="w-20 h-20 object-cover rounded-md border"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.product.title}</h3>
                        <p className="text-gray-500 text-sm">
                          ${(item.product.price / 100).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-white rounded-full px-3 py-1 shadow-sm">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              updateItemQuantity(
                                item.product.id,
                                item.quantity - 1
                              )
                            }
                            className="h-8 w-8 p-0 rounded-full"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-6 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              updateItemQuantity(
                                item.product.id,
                                item.quantity + 1
                              )
                            }
                            className="h-8 w-8 p-0 rounded-full"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItemFromCart(item.product.id)}
                          className="text-red-500 hover:bg-red-50 rounded-full"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </li>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    {error ? (
                      <div className="text-red-500 bg-red-50 px-4 py-2 rounded-lg">
                        {error}
                      </div>
                    ) : (
                      cart.EmptyCart
                    )}
                  </div>
                )}
              </ul>
            </div>

            {cartItems.length > 0 && (
              <div className="border-t p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-lg font-semibold">
                    {cart.Total}:{totalPrice} $
                  </div>
                  <div className="text-xl font-bold">
                    ${totalPrice.toFixed(2)}
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="hover:bg-red-50 hover:text-red-600"
                  >
                    {cart.ClearCart}
                  </Button>
                  <Button
                    onClick={handleChekout}
                    data-cy="buy-button"
                    className="bg-green-600 hover:bg-green-700 px-8 py-4"
                  >
                    {cart.Checkout}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default CartDialog;
