import { useState } from "react";
import type { ReactNode } from "react";
import { CartContext } from "./cart.context";
import type { CartItem } from "./cart.types";
import type { Product } from "../types/product";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  function addToCart(product: Product) {
    setItems((prev) => {
      const existing = prev.find((item) => item.product._id === product._id);

      if (existing) {
        return prev.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { product, quantity: 1 }];
    });
  }

  function removeFromCart(productId: string) {
    setItems((prev) =>
      prev.filter((item) => item.product._id !== productId)
    );
  }

  function updateQuantity(productId: string, quantity: number) {
    if (quantity < 1) return;

    setItems((prev) =>
      prev.map((item) =>
        item.product._id === productId
          ? { ...item, quantity }
          : item
      )
    );
  }

  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}