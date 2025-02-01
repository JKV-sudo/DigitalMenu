import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 👈 Navigation importieren
import MenuLayout from "./MenuLayout";
import { kebabOptions } from "./menuData";
import "./MenuItems.css";

export default function KebabPage() {
  const navigate = useNavigate(); // ✅ Router-Hook für Navigation

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/"); // 🔥 Nach Timeout zurück zur Startseite
    }, 60000); // 🕒 Timeout auf 60 Sekunden (60000ms)

    return () => clearTimeout(timeout); // 🚀 Verhindert Speicherlecks
  }, [navigate]);

  return (
    <MenuLayout backgroundImage="/assets/kebab-bg.webp">
      <h2 className="menu-title">🥙 Döner-Spezialitäten 🥙</h2>
      <div className="menu-grid kebab-menu">
        {kebabOptions.map((item) => (
          <div key={item.value} className="menu-item">
            <img src={item.img} alt={item.label} />
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </MenuLayout>
  );
}
