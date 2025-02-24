import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuLayout from "../MenuLayout";
import { burgerOptions } from "../menuData";
import "../MenuItems.css";
import { addToCart } from "../cartService"; // 🔥 Firestore-Warenkorb nutzen

export default function BurgerPage() {
  const navigate = useNavigate();
  const [selectedIngredients, setSelectedIngredients] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isMenuSelected, setIsMenuSelected] = useState(false); // State to track "Menü" option

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

  const handleMenuClick = () => {
    setIsMenuSelected((prevIsMenuSelected) => !prevIsMenuSelected);
  };

  const calculatePrice = (itemValue: string | null) => {
    const defaultItem = burgerOptions[0];
    const item = itemValue
      ? burgerOptions.find((option) => option.value === itemValue)
      : defaultItem;
    if (!item) return "0";
    let price = item.price;
    if (isMenuSelected) {
      price += 5; // Add 5€ for "Menü" option
    }
    return price.toFixed(2);
  };

  const handleAddProduct = async () => {
    if (selectedItem) {
      const item = burgerOptions.find(
        (option) => option.value === selectedItem
      );
      if (item) {
        const selectedIngredientsList =
          item.ingredients?.filter(
            (ingredient) => selectedIngredients[ingredient]
          ) ?? [];

        // 🔥 Produkt in Firestore-Warenkorb speichern
        await addToCart({
          id: item.value,
          name: item.label + (isMenuSelected ? " (Menü)" : ""),
          price: parseFloat(calculatePrice(selectedItem)),
          ingredients: selectedIngredientsList,
          img: item.img,
        });

        // Show banner
        setShowBanner(true);
        setTimeout(() => setShowBanner(false), 3000); // Hide banner after 3 seconds

        console.log("✅ Produkt hinzugefügt:", {
          id: item.value,
          name: item.label + (isMenuSelected ? " (Menü)" : ""),
          price: parseFloat(calculatePrice(selectedItem)),
          ingredients: selectedIngredientsList,
          img: item.img,
        });

        // Reset Auswahl with animation
        setTimeout(() => {
          setSelectedItem(null);
          setSelectedIngredients({});
          setIsMenuSelected(false); // Reset "Menü" option
        }, 300); // Delay to allow animation
      }
    }
  };

  return (
    <MenuLayout backgroundImage="/assets/burger-bg.webp">
      {showBanner && (
        <div className="banner">Artikel wurde zum Warenkorb hinzugefügt!</div>
      )}

      <div key={selectedItem || "default"} className="menu-list burger-menu">
        {burgerOptions.map((item) => (
          <div
            key={item.value}
            className={`menu-item ${
              selectedItem === item.value ? "selected-item" : ""
            }`}
            onClick={() => handleItemClick(item.value)}
          >
            <img src={item.img} alt={item.label} />
            <div className="menu-item-details">
              <h3>{item.label}</h3>
              <p>{calculatePrice(item.value)} €</p>
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
                      >
                        {ingredient}
                      </li>
                    )) ?? []}
                  </ul>
                  <div className="menu-option">
                    <label>
                      <input
                        type="checkbox"
                        checked={isMenuSelected}
                        onChange={handleMenuClick}
                      />
                      Menü (+5€)
                    </label>
                  </div>
                  <button onClick={handleAddProduct} className="add-to-cart">
                    In den Warenkorb
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </MenuLayout>
  );
}
