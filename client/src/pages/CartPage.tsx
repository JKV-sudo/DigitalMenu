// client/src/pages/CartPage.tsx

import React from "react";
// Hier der richtige Pfad zu deinem Context:
import { useCart } from "../context/cartContext";

export default function CartPage() {
  const { cartItems, removeFromCart, total } = useCart();

  return (
    <div>
      <h1>Warenkorb</h1>
      {cartItems.length === 0 ? (
        <p>Der Warenkorb ist leer.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} — {item.price} €
              <button onClick={() => removeFromCart(item.id)}>Entfernen</button>
            </li>
          ))}
        </ul>
      )}
      <p>Gesamt: {total} €</p>
    </div>
  );
}
