"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { Product } from "../types";

export interface CartItem {
  product: Product;
  quantity: number;
}
interface CartContextType {
  cartItems: CartItem[];
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (itemId: number) => void;
  updateItemQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    async function fetchCart() {
      const response = await fetch("/api/cart");
      const cartData = await response.json();
      setCartItems([...cartData]);
    }
    fetchCart();
  }, []);
  useEffect(() => {
    async function updateCart() {
      const response = await fetch("/api/cart/updateCart", {
        method: "POST",
        body: JSON.stringify(cartItems),
      });
    }
    updateCart();
  }, [cartItems]);
  const addItemToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.product.id === item.product.id
      );
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.product.id === item.product.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }

      return [...prevItems, item];
    });
  };

  const removeItemFromCart = (itemId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== itemId)
    );
  };

  const updateItemQuantity = (itemId: number, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === itemId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        removeItemFromCart,
        updateItemQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
