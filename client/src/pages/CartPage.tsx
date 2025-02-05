// client/src/pages/CartPage.tsx
import React from "react";
import { useCart } from "../context/cartContext";

import "./CartPage.css";

export default function CartPage() {
  const { cartItems, removeFromCart, total } = useCart();

  console.log("CartPage gerendert!");
  return (
    <div className="cart-container">
      <h1>Warenkorb</h1>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Der Warenkorb ist leer.</p>
      ) : (
        <ul className="cart-items">
          {cartItems.map((item) => (
            <li key={item.id}>
              <div className="item-info">
                <span className="item-name">{item.name}</span>
                <span className="item-price">{item.price} €</span>
              </div>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Entfernen
              </button>
            </li>
          ))}
        </ul>
      )}
      <p className="cart-total">Gesamt: {total} €</p>
    </div>
  );
}
