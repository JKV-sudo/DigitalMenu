import React, { FC, ReactNode, useContext } from "react";
import { Link } from "react-router-dom";
import GlutAnimation from "./GlutAnimation";
import { CartProvider, CartContext } from "./context/cartContext";
import "./App.css";
import "./MenuLayout.css";

interface MenuLayoutProps {
  children: ReactNode;
  backgroundImage: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

const LayoutContent: FC<MenuLayoutProps> = ({ children, backgroundImage }) => {
  const { addToCart } = useContext(CartContext);

  const exampleProduct: Product = {
    id: 123,
    name: "Döner Classic",
    price: 4.5,
  };

  const handleAddProduct = () => {
    addToCart(exampleProduct);
  };

  return (
    <div
      className="menu-layout"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
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

        <div className="icon-container">
          <a
            href="https://www.instagram.com/master_doener1/"
            target="_blank"
            rel="noopener noreferrer"
            className="ig-link"
          >
            <img src="/assets/ig.png" alt="Instagram" className="ig-icon" />
          </a>

          <Link to="/cart" className="cart-link" aria-label="Zum Warenkorb">
            <img
              src="/assets/cart1.png"
              width={50}
              height={50}
              alt="Warenkorb"
              className="cart-icon"
            />
          </Link>
        </div>
      </header>

      <Link to="/" className="logoHome" aria-label="Zurück zur Startseite">
        <img
          src="/assets/Logo2.png"
          alt="Zurück zur Startseite"
          width={50}
          height={50}
        />
      </Link>

      <GlutAnimation />

      <main className="menu-content">
        {children}

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
