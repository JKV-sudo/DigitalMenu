import React from "react";
import { Link } from "react-router-dom";
import GlutAnimation from "./GlutAnimation";
import "./App.css"; // Falls du hier gemeinsame Styles hinterlegt hast

export default function JKV() {
  return (
    <div className="app-container">
      {/* Header */}
      <header className="top-bar">
        <Link to="/" className="logo" aria-label="Zurück zur Startseite">
          <img src="/assets/Logo.png" width={50} height={50} alt="Logo" />
        </Link>
        <div className="titel">
          <h1>
            <span className="master">Master</span>{" "}
            <span className="kebs">Döner</span>
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

      {/* Home-Button (oben links) */}
      <Link to="/" className="logoHome" aria-label="Zurück zur Startseite">
        <img src="/assets/Logo.png" alt="Zurück zur Startseite" />
      </Link>

      <div className="body-container">
        <main className="content">
          {/* Glut-Animation */}
          <GlutAnimation />
          <img src="\assets\QR_working.png" alt="qr code" />
        </main>
      </div>

      {/* Home-Button (unten rechts) */}
      <Link to="/" className="logoHome" aria-label="Zurück zur Startseite">
        <img src="/assets/Logo2.png" alt="Zurück zur Startseite" />
      </Link>
    </div>
  );
}
