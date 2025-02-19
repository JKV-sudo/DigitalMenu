import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuLayout from "../MenuLayout";
import { kebabOptions } from "../menuData";
import "../MenuItems.css";
import { addToCart } from "../cartService"; // 🔥 Firestore-Warenkorb nutzen

export default function KebabPage() {
  const navigate = useNavigate();
  const [selectedIngredients, setSelectedIngredients] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [showBanner, setShowBanner] = useState(false);

 

  useEffect(() => {
    console.log("Selected item changed:", selectedItem);
  }, [selectedItem]);

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
      const item = kebabOptions.find((option) => option.value === selectedItem);
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

        // Reset Auswahl with animation
        setTimeout(() => {
          setSelectedItem(null);
          setSelectedIngredients({});
        }, 300); // Delay to allow animation
      }
    }
  };

  return (
    <MenuLayout backgroundImage="/assets/kebab-bg.webp">
      {showBanner && (
        <div className="banner">Artikel wurde zum Warenkorb hinzugefügt!</div>
      )}
      <h2 className="menu-title">🥙Döner-Spezialitäten🥙</h2>
      <div key={selectedItem || "default"} className="menu-grid kebab-menu">
        {kebabOptions.map((item) => (
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
                        e.stopPropagation();
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
