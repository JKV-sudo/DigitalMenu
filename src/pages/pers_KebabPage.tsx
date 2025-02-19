import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuLayout from "../MenuLayout";
import "../pers_KebabPage.css";
import { addToCart } from "../cartService";

const kebabOptions = [
  {
    id: "kebab",
    name: "Kebab",
    img: "/assets/kebab1.jpg",
  },
  {
    id: "dürüm",
    name: "Dürüm",
    img: "/assets/durum.jpeg",
  },
  {
    id: "bowl",
    name: "Bowl",
    img: "/assets/bowl.png",
  },
];

export default function pers_KebabPage() {
  const navigate = useNavigate();
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [showBanner, setShowBanner] = useState(false);
  const [selectedKebab, setSelectedKebab] = useState(kebabOptions[0]);

  const handleIngredientClick = (ingredient: string) => {
    setSelectedIngredients((prevSelectedIngredients) =>
      prevSelectedIngredients.includes(ingredient)
        ? prevSelectedIngredients.filter((item) => item !== ingredient)
        : [...prevSelectedIngredients, ingredient]
    );
  };

  const handleAddProduct = async () => {
    const selectedIngredientsList = selectedIngredients;

    // 🔥 Produkt in Firestore-Warenkorb speichern
    await addToCart({
      id: selectedKebab.id,
      name: selectedKebab.name,
      price: 5.99,
      ingredients: selectedIngredientsList,
      img: selectedKebab.img,
    });

    // Show banner
    setShowBanner(true);
    setTimeout(() => setShowBanner(false), 3000); // Hide banner after 3 seconds

    console.log("✅ Produkt hinzugefügt:", {
      id: selectedKebab.id,
      name: selectedKebab.name,
      price: 5.99,
      ingredients: selectedIngredientsList,
      img: selectedKebab.img,
    });

    // Reset Auswahl with animation
    setTimeout(() => {
      setSelectedIngredients([]);
    }, 300); // Delay to allow animation
  };

  const handleKebabChange = (kebab) => {
    setSelectedKebab(kebab);
  };

  const getNextKebab = () => {
    const currentIndex = kebabOptions.findIndex(
      (option) => option.id === selectedKebab.id
    );
    const nextIndex = (currentIndex + 1) % kebabOptions.length;
    return kebabOptions[nextIndex];
  };

  const getPrevKebab = () => {
    const currentIndex = kebabOptions.findIndex(
      (option) => option.id === selectedKebab.id
    );
    const prevIndex =
      (currentIndex - 1 + kebabOptions.length) % kebabOptions.length;
    return kebabOptions[prevIndex];
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
      <div>
        <h2 className="menu-title">🥙 Döner-Spezialitäten 🥙</h2>
      </div>
      <div className="carousel">
        <div
          className="carousel-preview"
          onClick={() => handleKebabChange(getPrevKebab())}
        >
          <img src={getPrevKebab().img} alt={getPrevKebab().name} />
        </div>
        <div className="kebab-photo">
          <img src={selectedKebab.img} alt={selectedKebab.name} />
        </div>
        <div
          className="carousel-preview"
          onClick={() => handleKebabChange(getNextKebab())}
        >
          <img src={getNextKebab().img} alt={getNextKebab().name} />
        </div>
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
      <button onClick={handleAddProduct} className="add-to-cart">
        In den Warenkorb
      </button>
      {showBanner && (
        <div className="banner">Artikel wurde zum Warenkorb hinzugefügt!</div>
      )}
    </MenuLayout>
  );
}
