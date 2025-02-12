import React, { createContext, useState, useContext } from "react";

// 1. Produkt-Interface (kannst du anpassen, falls du andere Felder brauchst)
export interface Product {
  id: number | string; // Ensure id can be a string
  name: string;
  price: number;
  quantity?: number; // Optional, falls du Menge speicherst
  ingredients?: string[]; // Add ingredients property
}

// 2. Interface für den Context-Wert:
//    Hier fügen wir 'total' für die Gesamtsumme hinzu.
interface CartContextValue {
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number | string) => void;
  updateQuantity: (productId: number | string, quantity: number) => void;
  total: number; // <--- NEU: 'total' als number
}

// 3. Context erzeugen. Mit Default-Werten, damit TS nicht meckert.
export const CartContext = createContext<CartContextValue>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  total: 0,
});

// 4. Optional: benutzerdefinierter Hook für Zugriff auf den Context.
export const useCart = () => {
  return useContext(CartContext);
};

// 5. Provider-Komponente (um deinen State global verfügbar zu machen).
//    Hier berechnen wir auch 'total' und geben ihn im Provider weiter.
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  // Produkt hinzufügen
  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        // Produkt bereits im Warenkorb -> Menge erhöhen
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity ?? 1) + 1 }
            : item
        );
      }
      // Neues Produkt hinzufügen (mit quantity = 1, wenn nicht vorhanden)
      return [
        ...prevItems,
        {
          ...product,
          id: prevItems.length + 1, // Ensure unique id
          quantity: product.quantity ?? 1,
          ingredients: product.ingredients ?? [], // Ensure ingredients is initialized
        },
      ];
    });
  };

  // Produkt entfernen
  const removeFromCart = (productId: number | string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  // Menge aktualisieren
  const updateQuantity = (productId: number | string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // 6. Gesamtsumme (total) berechnen
  //    Beispiel: Preis * Menge für alle Items addieren
  const total = cartItems.reduce((acc, item) => {
    const quantity = item.quantity ?? 1;
    return acc + item.price * quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
