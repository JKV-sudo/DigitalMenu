import React from "react";
import { useCart } from "../context/cartContext";
import GlutAnimation from "../GlutAnimation";
import "./CartPage.css";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { cartItems, removeFromCart, total } = useCart();

  return (
    <>
      <GlutAnimation />
      <header className="top-bar">
        <Link to="/" className="logo" aria-label="Zurück zur Startseite">
          <img src="/assets/Logo.png" width={50} height={50} alt="Logo" />
        </Link>
        <div className="titel">
          <h1>
            <span className="master">Master</span>
            <span className="kebs"> Döner</span>
          </h1>
        </div>
        <a
          href="https://www.instagram.com/master_doener1/"
          target="_blank"
          rel="noopener noreferrer"
          className="ig-link"
        >
          <img src="/assets/ig.png" alt="Instagram" className="ig-icon" />
        </a>
      </header>
      <div className="cart-container">
       

        <h1>Warenkorb</h1>

        {cartItems.length === 0 ? (
          <p className="empty-cart">Der Warenkorb ist leer.</p>
        ) : (
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={`${item.id}-${item.name}`}>
                <div className="item-header">
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    X
                  </button>
                </div>
                <img src={item.img} alt={item.name} className="item-img" />
                <div className="item-info">
                  <span className="item-name">{item.name}</span>
                  <span className="item-price">{item.price.toFixed(2)} €</span>
                  {item.ingredients && item.ingredients.length > 0 && (
                    <ul className="item-ingredients">
                      {item.ingredients.map((ingredient, index) => (
                        <li key={index} className="ingredient" >
                          {ingredient}
                          
                        </li>
                         
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
        <p className="cart-total">Gesamt: {total.toFixed(2)} €</p>
      </div>
      <div>
     <Link to="/" className="logoHome" aria-label="Zurück zur Startseite">
       <img src="/assets/Logo2.png" alt="Zurück zur Startseite" />
     </Link>
   </div>
    </>
     
  );
}
