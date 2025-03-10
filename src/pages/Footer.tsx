import React from "react";
import { Link } from "react-router-dom";
import "../Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>© {new Date().getFullYear()} Master Döner </p>
        <nav>
          <Link to="/rechtliches">Impressum & Datenschutzerklärung </Link>
          <Link to="/vision"> <span className="vision">Split/Vision</span> </Link>
        </nav>
      </div>
    </footer>
  );
}