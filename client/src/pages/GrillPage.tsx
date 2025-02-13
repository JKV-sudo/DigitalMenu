import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuLayout from "../MenuLayout";
import { grillOptions } from "../menuData";
import { useCart } from "../context/cartContext";
import "../MenuItems.css";

export default function GrillPage() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedIngredients, setSelectedIngredients] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, 60000000);

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

  const handleAddProduct = () => {
    if (selectedItem) {
      const item = grillOptions.find((option) => option.value === selectedItem);
      if (item) {
        const selectedIngredientsList =
          item.ingredients?.filter(
            (ingredient) => selectedIngredients[ingredient]
          ) ?? [];
        addToCart({
          id: item.value, // Ensure unique id
          name: item.label, // Ensure name is passed
          price: item.price,
          ingredients: selectedIngredientsList, // Ensure ingredients are passed
          img: item.img, // Ensure img is passed
        });
        console.log("Product added to cart:", {
          id: item.value,
          name: item.label,
          price: item.price,
          ingredients: selectedIngredientsList,
          img: item.img,
        });
      }
    }
  };

  return (
    <MenuLayout backgroundImage="/assets/grill-bg.jpg">
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
