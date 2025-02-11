import React, { FC, ReactNode, useContext } from "react";
import { Link } from "react-router-dom";
import GlutAnimation from "./GlutAnimation";
// Importiere sowohl den Provider als auch den Kontext
import { CartProvider, CartContext } from "./context/cartContext";

import "./App.css";
import "./MenuLayout.css";

// ----------------------------------
// 1) Typen definieren
// ----------------------------------
interface MenuLayoutProps {
  children: ReactNode;
  backgroundImage: string;
}

// Beispiel für ein Produkt
interface Product {
  id: number;
  name: string;
  price: number;
}

// ----------------------------------
// 2) Unterkomponente: LayoutContent
//    - Zeigt das eigentliche Layout an
//    - Holt Funktionen (z.B. addToCart) aus dem Kontext
// ----------------------------------
const LayoutContent: FC<MenuLayoutProps> = ({ children, backgroundImage }) => {
  // Zugriff auf den CartContext
  const { addToCart } = useContext(CartContext);

  // Beispielprodukt
  const exampleProduct: Product = {
    id: 123,
    name: "Döner Classic",
    price: 4.5,
  };

  // Handler für "Add to Cart"
  const handleAddProduct = () => {
    addToCart(exampleProduct);
  };

  return (
    <div
      className="menu-layout"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <header className="top-bar">
        {/* Logo zur Startseite */}
        <Link to="/" className="logo" aria-label="Zurück zur Startseite">
          <img src="/assets/Logo.png" width={50} height={50} alt="Logo" />
        </Link>

        {/* Titel */}
        <div className="titel">
          <h1>
            <span className="master">Master</span>
            <span className="kebs"> Döner</span>
          </h1>
        </div>

        {/* Instagram-Link */}
        <a
          href="https://www.instagram.com/master_doener1/"
          target="_blank"
          rel="noopener noreferrer"
          className="ig-link"
        >
          <img src="/assets/ig.png" alt="Instagram" className="ig-icon" />
        </a>

        {/* NEU: Link zum Warenkorb */}
        <Link to="/cart" className="cart-link" aria-label="Zum Warenkorb">
          <img
            src="/assets/cart1.png"
            width={50}
            height={50}
            alt="Warenkorb"
            className="cart-icon"
          />
        </Link>
      </header>

      {/* Home-Button */}
      <Link to="/" className="logoHome" aria-label="Zurück zur Startseite">
        <img src="/assets/Logo2.png" alt="Zurück zur Startseite" />
      </Link>

      <GlutAnimation />

      {/* Hier kommt der Seiteninhalt rein (children) */}
      <main className="menu-content">
        {children}

        {/* NEU: Button, der ein Beispielprodukt in den Warenkorb legt */}
        <button onClick={handleAddProduct} style={{ marginTop: "20px" }}>
          Döner Classic in den Warenkorb
        </button>
      </main>
    </div>
  );
};
const MenuLayout: FC<MenuLayoutProps> = ({ children, backgroundImage }) => {
  return (
    <CartProvider>
      <LayoutContent backgroundImage={backgroundImage}>
        {children}
      </LayoutContent>
    </CartProvider>
  );
};

export default MenuLayout;
