import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuLayout from "../MenuLayout";
import { grillOptions } from "../menuData";

import "../MenuItems.css";
import { addToCart } from "../cartService"; // 🔥 Firestore-Warenkorb nutzen

export default function GrillPage() {
  const navigate = useNavigate();
  const [selectedIngredients, setSelectedIngredients] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, 60000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  const handleIngredientClick = (ingredient: string) => {
    setSelectedIngredients((prevSelectedIngredients) => ({
      ...prevSelectedIngredients,
      [ingredient]: !prevSelectedIngredients[ingredient],
    }));
  };

  const handleItemClick = (itemValue: string) => {
    setSelectedItem(itemValue);
  };

  const handleAddProduct = async () => {
    if (selectedItem) {
      const item = grillOptions.find((option) => option.value === selectedItem);
      if (item) {
        const selectedIngredientsList =
          item.ingredients?.filter(
            (ingredient) => selectedIngredients[ingredient]
          ) ?? [];

        // 🔥 Produkt in Firestore-Warenkorb speichern
        await addToCart({
          id: item.value,
          name: item.label,
          price: item.price,
          ingredients: selectedIngredientsList,
          img: item.img,
        });

        // Show banner
        setShowBanner(true);
        setTimeout(() => setShowBanner(false), 3000); // Hide banner after 3 seconds

        console.log("✅ Produkt hinzugefügt:", {
          id: item.value,
          name: item.label,
          price: item.price,
          ingredients: selectedIngredientsList,
          img: item.img,
        });

        // Reset Auswahl
        setSelectedItem(null);
        setSelectedIngredients({});
      }
    }
  };

  return (
    <MenuLayout backgroundImage="/assets/grill-bg.jpg">
      {showBanner && (
        <div className="banner">Artikel wurde zum Warenkorb hinzugefügt!</div>
      )}
      <h2 className="menu-title">🔥 Grill-Gerichte 🔥</h2>
      <div className="menu-grid grill-menu">
        {grillOptions.map((item) => (
          <div
            key={item.value}
            className={`menu-item ${
              selectedItem === item.value ? "selected-item" : ""
            }`}
            onClick={() => handleItemClick(item.value)}
          >
            <img src={item.img} alt={item.label} />
            <p>{item.label}</p>
            <p>{item.price.toFixed(2)} €</p>
            {selectedItem === item.value && (
              <>
                <ul>
                  {item.ingredients?.map((ingredient, index) => (
                    <li
                      key={index}
                      className={`ingredient ${
                        selectedIngredients[ingredient]
                          ? "selected"
                          : "not-selected"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the item click event
                        handleIngredientClick(ingredient);
                      }}
                      style={{ width: "45%", margin: "5px" }}
                    >
                      {ingredient}
                    </li>
                  )) ?? []}
                </ul>
                <button onClick={handleAddProduct} className="add-to-cart">
                  In den Warenkorb
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </MenuLayout>
  );
}
