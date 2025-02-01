import React from "react";
import MenuLayout from "./MenuLayout";
import { grillOptions } from "./menuData";
import "./MenuItems.css"; // Neue CSS Datei für individuelle Farben

export default function GrillPage() {
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
          </div>
        ))}
      </div>
    </MenuLayout>
  );
}
