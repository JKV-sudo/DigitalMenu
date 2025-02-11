import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 👈 Navigation importieren
import MenuLayout from "../MenuLayout"; // Correct import path
import { grillOptions } from "../menuData";
import "../MenuItems.css"; // Neue CSS Datei für individuelle Farben

export default function GrillPage() {
  const navigate = useNavigate(); // ✅ Router-Hook für Navigation

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/"); // 🔥 Nach Timeout zurück zur Startseite
    }, 60000); // 🕒 Timeout auf 60 Sekunden (60000ms)

    return () => clearTimeout(timeout); // 🚀 Verhindert Speicherlecks
  }, [navigate]);

  return (
    <MenuLayout backgroundImage="/assets/grill-bg.jpg">
      <h2 className="menu-title">🔥 Grill-Gerichte 🔥</h2>{" "}
      {/* Klasse hinzufügen */}
      <div className="menu-grid grill-menu">
        {" "}
        {/*  Extra Klasse für das Grill-Menü */}
        {grillOptions.map((item) => (
          <div key={item.value} className="menu-item">
            <img src={item.img} alt={item.label} />
            <p>{item.label}</p>
            <p>{item.price.toFixed(2)} €</p>{" "}
          </div>
        ))}
      </div>
    </MenuLayout>
  );
}
