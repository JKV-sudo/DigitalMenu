// MenuLayout.jsx
import React from "react";
import { Link } from "react-router-dom"; // Importiere Link
import GlutAnimation from "./GlutAnimation";
import "./App.css";
import "./MenuLayout.css";

const MenuLayout = ({
  children,
  backgroundImage,
}: {
  children: React.ReactNode;
  backgroundImage: string;
}) => {
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
            <span className="master">Master</span><span className="kebs"> Döner</span>
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
      {/* Home-Button */}
      <Link to="/" className="logoHome" aria-label="Zurück zur Startseite">
        <img src="/assets/Logo2.png" alt="Zurück zur Startseite" />
      </Link>
      <GlutAnimation /> {/* Bleibt global sichtbar */}
      <main className="menu-content">{children}</main>
    </div>
  );
};

export default MenuLayout;
