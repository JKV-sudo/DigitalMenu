import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MenuLayout from "../MenuLayout";
import "../pers_KebabPage.css";
import { addToCart } from "../cartService";
import { kebabOptions, sauceOptions } from "../menuData"; // Import kebab and sauce options from menuData

export default function pers_KebabPage() {
  const navigate = useNavigate();
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedSauces, setSelectedSauces] = useState<string[]>([]);
  const [showBanner, setShowBanner] = useState(false);
  const [selectedKebab, setSelectedKebab] = useState(kebabOptions[0]);
  const [rotation, setRotation] = useState(0);
  const [meatOption, setMeatOption] = useState("Chicken");
  const [isSaturday, setIsSaturday] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [isMenuSelected, setIsMenuSelected] = useState(false); // State to track "Menü" option
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const today = new Date();
    setIsSaturday(today.getDay() === 6);
  }, []);

  useEffect(() => {
    if (selectAll) {
      const mainIngredients = [
        "Tomaten",
        "Gurken",
        "Zwiebeln",
        "Salat",
        "Jalapeno",
        "Blaukraut",
      ];
      setSelectedIngredients(mainIngredients);
    }
  }, [selectAll]);

  const handleIngredientClick = (ingredient: string) => {
    setSelectedIngredients((prevSelectedIngredients) => {
      const newSelectedIngredients = prevSelectedIngredients.includes(
        ingredient
      )
        ? prevSelectedIngredients.filter((item) => item !== ingredient)
        : [...prevSelectedIngredients, ingredient];

      // Reset selectAll if any main ingredient is unselected
      if (
        !newSelectedIngredients.includes(ingredient) &&
        [
          "Tomaten",
          "Gurken",
          "Zwiebeln",
          "Salat",
          "Jalapeno",
          "Blaukraut",
        ].includes(ingredient)
      ) {
        setSelectAll(false);
      }

      return newSelectedIngredients;
    });
  };

  const handleSauceClick = (sauce: string) => {
    setSelectedSauces((prevSelectedSauces) =>
      prevSelectedSauces.includes(sauce)
        ? prevSelectedSauces.filter((item) => item !== sauce)
        : [...prevSelectedSauces, sauce]
    );
  };

  const calculatePrice = () => {
    let price = selectedKebab.price;
    if (selectedIngredients.includes("Käse")) {
      price += 1;
    }
    if (selectedIngredients.includes("Pommes")) {
      price += 3.5;
    }
    if (selectedIngredients.includes("Hot Cheddar")) {
      price += 2;
    }
    if (meatOption === "Steak") {
      price += 10;
    }
    if (isMenuSelected) {
      price += 5; // Add 5€ for "Menü" option
    }
    return price.toFixed(2);
  };

  const handleAddProduct = async () => {
    const selectedIngredientsList = selectedIngredients;
    const selectedSaucesList = selectedSauces;

    // 🔥 Produkt in Firestore-Warenkorb speichern
    await addToCart({
      id: selectedKebab.value,
      name:
        `${selectedKebab.label} (${meatOption})` +
        (isMenuSelected ? " (Menü)" : ""),
      price: parseFloat(calculatePrice()),
      ingredients: [...selectedIngredientsList, ...selectedSaucesList],
      img: selectedKebab.img,
    });

    // Show banner
    setShowBanner(true);
    setTimeout(() => setShowBanner(false), 3000); // Hide banner after 3 seconds

    console.log("✅ Produkt hinzugefügt:", {
      id: selectedKebab.value,
      name:
        `${selectedKebab.label} (${meatOption})` +
        (isMenuSelected ? " (Menü)" : ""),
      price: parseFloat(calculatePrice()),
      ingredients: [...selectedIngredientsList, ...selectedSaucesList],
      img: selectedKebab.img,
    });

    // Reset Auswahl with animation
    setTimeout(() => {
      setSelectedIngredients([]);
      setSelectedSauces([]);
      setIsMenuSelected(false); // Reset "Menü" option
    }, 300); // Delay to allow animation
  };

  const handleKebabChange = (direction: string) => {
    const currentIndex = kebabOptions.findIndex(
      (option) => option.value === selectedKebab.value
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
      <div
        className="carousel_kebab"
        ref={carouselRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <button
          onClick={() => handleKebabChange("prev")}
          className="pers_kebab carousel-button prev"
          style={{
            top: "20%",
            left: "25vw",
            opacity: "0.7",
            height: "100px",
            width: "100px",
          }}
        >
          &lt;
        </button>
        <div
          className="carousel-container"
          style={{ transform: `rotateY(${rotation}deg)` }}
        >
          {kebabOptions.map((kebab, index) => (
            <div
              key={kebab.value}
              className={`carousel-item ${
                selectedKebab.value === kebab.value ? "selected" : ""
              }`}
              style={{
                transform: `rotateY(${index * 120}deg) translateZ(300px)`,
              }}
            >
              <img src={kebab.img} alt={kebab.label} />
            </div>
          ))}
        </div>
        <button
          onClick={() => handleKebabChange("next")}
          className="pers_kebab carousel-button next"
          style={{
            top: "20%",
            right: "25vw",
            opacity: "0.7",
            height: "100px",
            width: "100px",
          }}
        >
          &gt;
        </button>
      </div>
      <div className="kebab-details">
        <h3>{selectedKebab.label}</h3>
        <p>{calculatePrice()} €</p>
      </div>
      <div className="body-grid">
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
        <div className="select-all">
          <label>
            <input
              type="checkbox"
              checked={selectAll}
              onChange={() => setSelectAll(!selectAll)}
            />
            Mit allem
          </label>
        </div>
     
        <div className="content-container">
          <div className="second-container">
            <div className="additional-options">
              <p
                style={{
                  color: "rgb(191, 255, 0)",
                  fontWeight: "bold",
                  backgroundColor: "rgba(0, 0, 0, 0.44)",
                  borderRadius: "30px",
                  border: "3px solid rgb(191, 255, 0)",
                  marginTop: "5px",
                }}
              >
                {" "}
                Extras
              </p>
              {["Hot Cheddar", "Käse", "Pommes"].map((option, index) => (
                <div
                  key={index}
                  className={`additional-option ${
                    selectedIngredients.includes(option) ? "selected" : ""
                  }`}
                  onClick={() => handleIngredientClick(option)}
                >
                  <img
                    src={`/assets/${option.toLowerCase()}.png`}
                    alt={option}
                  />
                  <p>{option} {selectedIngredients.includes(option) ? "✔️" : ""} </p>
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
              "Jalapeno",
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
              <p
                style={{
                  color: "rgba(235, 151, 8, 0.91)",
                  fontWeight: "bold",
                  backgroundColor: "rgba(0, 0, 0, 0.44)",
                  borderRadius: "30px",
                  border: "3px solid rgba(255, 0, 0, 0.91)",
                  marginTop: "10px",
                }}
              >
                {" "}
                Schärfe
              </p>
              {["Scharf", "Sehr scharf", "Habanero"].map((option, index) => (
                <div
                  key={index}
                  className={`additional-option ${
                    selectedIngredients.includes(option) ? "selected" : ""
                  } ${option === "Scharf" ? "scharf" : "sehr-scharf"}`}
                  onClick={() => handleIngredientClick(option)}
                >
                  <img
                    src={`/assets/${option.toLowerCase()}.png`}
                    alt={option}
                  />
                  <p>{option}  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="sauce-title"
          style={{
            color: "rgba(255, 255, 255, 0.91)",
            backgroundColor: "rgba(0, 0, 0, 0.78)",
            borderRadius: "30px",
            fontWeight: "bold",
            justifyContent: "center",
            maxWidth: "20%",
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "-15px",
            border: "3px solid rgb(255, 255, 255)",
            
          }}
        >
          Saucen
        </p>
        <div className="sauces-grid">
          {sauceOptions.map((sauce, index) => (
            <div
              key={index}
              className={`sauce-item ${
                selectedSauces.includes(sauce.value) ? "selected" : ""
              }`}
              onClick={() => handleSauceClick(sauce.value)}
            >
              <img src={sauce.img} alt={sauce.label} />
              <p>{sauce.label}</p>
            </div>
          ))}
        </div>

        <button
          onClick={handleAddProduct}
          className="add-to-cart"
          style={{ marginTop: "0px", marginLeft: "auto", marginRight: "auto" }}
        >
          Warenkorb
        </button>
        {showBanner && (
          <div className="banner">Artikel wurde zum Warenkorb hinzugefügt!</div>
        )}
      </div>
    </MenuLayout>
  );
}
