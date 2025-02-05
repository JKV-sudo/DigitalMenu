// client/src/context/cartContext.tsx

import React, { createContext, useContext, useState, ReactNode } from "react";

// Beispiel-Interface für ein Cart-Item
interface CartItem {
  id: number;
  name: string;
  price: number;
  // Optional weitere Felder, z. B. ingredients?: string[];
}

// Kontext-Wert: Welche Daten/Funktionen sollen im Warenkorb verfügbar sein?
interface CartContextValue {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  total: number;
}

// createContext erhält hier den Typ. Mit "| null" erlaubst du den leeren Initialzustand:
const CartContext = createContext<CartContextValue | null>(null);

// Custom Hook, damit du auf den Kontext zugreifen kannst:
export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside a CartProvider.");
  }
  return context;
}

// CartProvider umschließt die App und stellt die Werte bereit
interface CartProviderProps {
  children: ReactNode; // Was innerhalb des Providers gerendert wird
}

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  function addToCart(item: CartItem) {
    setCartItems((prevItems) => [...prevItems, item]);
    setTotal((prevTotal) => prevTotal + item.price);
  }

  function removeFromCart(itemId: number) {
    setCartItems((prevItems) => prevItems.filter((i) => i.id !== itemId));
    const itemToRemove = cartItems.find((item) => item.id === itemId);
    if (itemToRemove) {
      setTotal((prevTotal) => prevTotal - itemToRemove.price);
    }
  }

  const value: CartContextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
