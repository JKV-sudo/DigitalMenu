import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuLayout from "../MenuLayout";
import "../pers_KebabPage.css";

export default function pers_KebabPage() {
  const navigate = useNavigate();
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const handleIngredientClick = (ingredient: string) => {
    setSelectedIngredients((prevSelectedIngredients) =>
      prevSelectedIngredients.includes(ingredient)
        ? prevSelectedIngredients.filter((item) => item !== ingredient)
        : [...prevSelectedIngredients, ingredient]
    );
  };

  return (
    <MenuLayout backgroundImage="/assets/kebab-bg.webp">
      <div className="top-bar">
        <div className="logo" onClick={() => navigate("/")}>
          <img src="/assets/logo.png" alt="Logo" />
        </div>
        <div className="titel">
          <h1>Kebab Page</h1>
        </div>
        <div className="icon-container">
          <div className="cart-link" onClick={() => navigate("/cart")}>
            <img src="/assets/cart-icon.png" alt="Cart" />
          </div>
        </div>
      </div>
      <div className="logoHome" onClick={() => navigate("/")}>
        <img src="/assets/home-icon.png" alt="Home" />
      </div>
      <div className="kebab-photo">
        <img src="/assets/selected-kebab.png" alt="Selected Kebab" />
      </div>
      <div className="ingredients-grid">
        {[
          "Tomaten",
          "Gurken",
          "Zwiebeln",
          "Salat",
          "Käse",
          "Mais",
          "Paprika",
          "Blaukraut",
        ].map((ingredient, index) => (
          <div
            key={index}
            className={`ingredient-item ${
              selectedIngredients.includes(ingredient) ? "selected" : ""
            }`}
            onClick={() => handleIngredientClick(ingredient)}
          >
            <img
              src={`/assets/${ingredient.toLowerCase()}.png`}
              alt={ingredient}
            />
            <p>{ingredient}</p>
          </div>
        ))}
      </div>
    </MenuLayout>
  );
}
