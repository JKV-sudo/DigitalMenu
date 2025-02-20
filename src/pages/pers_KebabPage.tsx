import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MenuLayout from "../MenuLayout";
import "../pers_KebabPage.css";
import { addToCart } from "../cartService";

const kebabOptions = [
  {
    id: "kebab",
    name: "Kebab",
    img: "/assets/kebab1.jpg",
    price: 5.99,
  },
  {
    id: "dürüm",
    name: "Dürüm",
    img: "/assets/durum.jpeg", // Ensure this path is correct
    price: 6.99,
  },
  {
    id: "bowl",
    name: "Bowl",
    img: "/assets/bowl.png", // Ensure this path is correct
    price: 7.99,
  },
];

export default function pers_KebabPage() {
  const navigate = useNavigate();
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [showBanner, setShowBanner] = useState(false);
  const [selectedKebab, setSelectedKebab] = useState(kebabOptions[0]);
  const [rotation, setRotation] = useState(0);
  const [meatOption, setMeatOption] = useState("Chicken");
  const [isSaturday, setIsSaturday] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const today = new Date();
    setIsSaturday(today.getDay() === 6);
  }, []);

  const handleIngredientClick = (ingredient: string) => {
    setSelectedIngredients((prevSelectedIngredients) =>
      prevSelectedIngredients.includes(ingredient)
        ? prevSelectedIngredients.filter((item) => item !== ingredient)
        : [...prevSelectedIngredients, ingredient]
    );
  };

  const calculatePrice = () => {
    let price = selectedKebab.price;
    if (selectedIngredients.includes("Käse")) {
      price += 3;
    }
    if (selectedIngredients.includes("Mais")) {
      price += 3;
    }
    if (meatOption === "Steak") {
      price += 10;
    }
    return price.toFixed(2);
  };

  const handleAddProduct = async () => {
    const selectedIngredientsList = selectedIngredients;

    // 🔥 Produkt in Firestore-Warenkorb speichern
    await addToCart({
      id: selectedKebab.id,
      name: `${selectedKebab.name} (${meatOption})`,
      price: parseFloat(calculatePrice()),
      ingredients: selectedIngredientsList,
      img: selectedKebab.img,
    });

    // Show banner
    setShowBanner(true);
    setTimeout(() => setShowBanner(false), 3000); // Hide banner after 3 seconds

    console.log("✅ Produkt hinzugefügt:", {
      id: selectedKebab.id,
      name: `${selectedKebab.name} (${meatOption})`,
      price: parseFloat(calculatePrice()),
      ingredients: selectedIngredientsList,
      img: selectedKebab.img,
    });

    // Reset Auswahl with animation
    setTimeout(() => {
      setSelectedIngredients([]);
    }, 300); // Delay to allow animation
  };

  const handleKebabChange = (direction: string) => {
    const currentIndex = kebabOptions.findIndex(
      (option) => option.id === selectedKebab.id
    );
    const newIndex =
      direction === "next"
        ? (currentIndex + 1) % kebabOptions.length
        : (currentIndex - 1 + kebabOptions.length) % kebabOptions.length;
    setSelectedKebab(kebabOptions[newIndex]);
    setRotation(
      (prevRotation) => prevRotation + (direction === "next" ? 120 : -120)
    );
  };

  const handleMeatOptionChange = () => {
    if (isSaturday || meatOption === "Steak") {
      setMeatOption((prevOption) =>
        prevOption === "Chicken" ? "Steak" : "Chicken"
      );
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    carouselRef.current!.dataset.startX = touch.clientX.toString();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const startX = parseFloat(carouselRef.current!.dataset.startX!);
    const deltaX = touch.clientX - startX;

    if (deltaX > 50) {
      handleKebabChange("prev");
      carouselRef.current!.dataset.startX = touch.clientX.toString();
    } else if (deltaX < -50) {
      handleKebabChange("next");
      carouselRef.current!.dataset.startX = touch.clientX.toString();
    }
  };

  return (
    <MenuLayout backgroundImage="/assets/kebab-bg.webp">
      <div>
        <h2 className="menu-title">🥙 Döner-Spezialitäten 🥙</h2>
      </div>
      <div
        className="carousel"
        ref={carouselRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <button
          onClick={() => handleKebabChange("prev")}
          className="carousel-button prev"
        >
          &lt;
        </button>
        <div
          className="carousel-container"
          style={{ transform: `rotateY(${rotation}deg)` }}
        >
          {kebabOptions.map((kebab, index) => (
            <div
              key={kebab.id}
              className={`carousel-item ${
                selectedKebab.id === kebab.id ? "selected" : ""
              }`}
              style={{
                transform: `rotateY(${index * 120}deg) translateZ(300px)`,
              }}
            >
              <img src={kebab.img} alt={kebab.name} />
            </div>
          ))}
        </div>
        <button
          onClick={() => handleKebabChange("next")}
          className="carousel-button next"
        >
          &gt;
        </button>
      </div>
      <div className="kebab-details">
        <h3>{selectedKebab.name}</h3>
        <p>{calculatePrice()} €</p>
      </div>
      <div className="meat-slider">
        <div
          className={`slider ${!isSaturday ? "disabled" : ""}`}
          onClick={handleMeatOptionChange}
          title={!isSaturday ? "Steakspieß nur Samstags verfügbar" : ""}
        >
          <div
            className={`slider-option ${
              meatOption === "Chicken" ? "active" : ""
            }`}
          >
            Chicken
          </div>
          <div
            className={`slider-option ${
              meatOption === "Steak" ? "active" : ""
            }`}
          >
            Steak
          </div>
          <div
            className={`slider-thumb ${
              meatOption === "Steak" ? "right" : "left"
            }`}
          ></div>
        </div>
      </div>
      <div className="content-container">
        <div className="second-container">
          <div className="additional-options">
            {["Käse", "Mais"].map((option, index) => (
              <div
                key={index}
                className={`additional-option ${
                  selectedIngredients.includes(option) ? "selected" : ""
                }`}
                onClick={() => handleIngredientClick(option)}
              >
                <img src={`/assets/${option.toLowerCase()}.png`} alt={option} />
                <p>{option}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="ingredients-grid">
          {[
            "Tomaten",
            "Gurken",
            "Zwiebeln",
            "Salat",
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
        <div className="third-container">
          <div className="additional-options">
            {["Scharf", "Sehr scharf"].map((option, index) => (
              <div
                key={index}
                className={`additional-option ${
                  selectedIngredients.includes(option) ? "selected" : ""
                } ${option === "Scharf" ? "scharf" : "sehr-scharf"}`}
                onClick={() => handleIngredientClick(option)}
              >
                <img src={`/assets/${option.toLowerCase()}.png`} alt={option} />
                <p>{option}</p>
              </div>
            ))}
          </div>
        </div>
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
