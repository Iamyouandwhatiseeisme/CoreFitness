"use client";
import React from "react";
import { Minus, Plus, X } from "lucide-react";
import { CartItem, useCart } from "../../components/providers/CartProvider";
import { Button } from "@components/components/ui/button";
import { useLocale } from "../../components/providers/LanguageContext";

export default function CartPage() {
  const { cartItems, removeItemFromCart, clearCart, updateItemQuantity } =
    useCart();
  const [error, setError] = React.useState<string>("");
  const totalPrice = cartItems.reduce((total, item) => {
    return total + (item.product.price * item.quantity) / 100;
  }, 0);
  const {
    dictionary: { cart },
  } = useLocale();

  async function handleCheckout() {
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
    <div className="container mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
        {cart.YourCart}
      </h1>
      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
        <ul className="space-y-4">
          {cartItems?.length > 0 ? (
            cartItems.map((item: CartItem) => (
              <li
                key={item.product.id}
                className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-gray-50 rounded-lg"
              >
                <img
                  src={item.product.images?.[0] || "/placeholder.jpg"}
                  alt={item.product.title}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md border"
                />
                <div className="flex-1 text-center sm:text-left">
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
                        updateItemQuantity(item.product.id, item.quantity - 1)
                      }
                      className="h-8 w-8 p-0 rounded-full"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        updateItemQuantity(item.product.id, item.quantity + 1)
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
        <div className="border-t p-4 sm:p-6 mt-4 sm:mt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            <div className="text-lg font-semibold">
              {cart.Total}:{totalPrice} $
            </div>
            <div className="text-xl font-bold">${totalPrice.toFixed(2)}</div>
          </div>
          <div className="flex flex-col sm:flex-row justify-end gap-3">
            <Button
              variant="outline"
              onClick={clearCart}
              className="hover:bg-red-50 hover:text-red-600"
            >
              {cart.ClearCart}
            </Button>
            <Button
              onClick={handleCheckout}
              data-cy="buy-button"
              className="bg-green-600 hover:bg-green-700 px-6 sm:px-8 py-3 sm:py-4"
            >
              {cart.Checkout}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
