import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MenuLayout from "../MenuLayout";
import { beilagenOptions, SubMenuItem } from "../menuData";
import "../MenuItems.css";
import { addToCart } from "../cartService";

export default function GrillPage() {
  const navigate = useNavigate();
  const [selectedIngredients, setSelectedIngredients] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<SubMenuItem | null>(
    null
  );
  const [showBanner, setShowBanner] = useState(false);
  const [rotation, setRotation] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedItem) {
      const item = beilagenOptions.find(
        (option) => option.value === selectedItem
      );
      if (item) {
        if (selectedVersion && item.versions) {
          const version = item.versions.find(
            (v) => v.value === selectedVersion
          );
          setSelectedProduct(version || null);
        } else {
          setSelectedProduct(item);
        }
      }
    }
  }, [selectedItem, selectedVersion]);

  const handleIngredientClick = (ingredient: string) => {
    setSelectedIngredients((prev) => ({
      ...prev,
      [ingredient]: !prev[ingredient],
    }));
  };

  const handleItemClick = (itemValue: string) => {
    setSelectedItem(itemValue);
    const item = beilagenOptions.find((option) => option.value === itemValue);
    if (item?.versions && item.versions.length > 0) {
      setSelectedVersion(item.versions[0].value);
      setRotation(0);
    } else {
      setSelectedVersion(null);
    }
  };

  const handleVersionChange = (direction: string) => {
    const item = beilagenOptions.find(
      (option) => option.value === selectedItem
    );
    if (item && item.versions) {
      const currentIndex = item.versions.findIndex(
        (v) => v.value === selectedVersion
      );
      const newIndex =
        direction === "next"
          ? (currentIndex + 1) % item.versions.length
          : (currentIndex - 1 + item.versions.length) % item.versions.length;

      const newVersion = item.versions[newIndex];
      setSelectedVersion(newVersion.value);
      setSelectedProduct(newVersion);
      setRotation((prev) => prev + (direction === "next" ? 120 : -120));
    }
  };

  const handleVersionClick = (versionValue: string) => {
    setSelectedVersion(versionValue);
  };

  const handleAddProduct = async () => {
    if (selectedProduct) {
      const selectedIngredientsList =
        selectedProduct.ingredients?.filter(
          (ingredient) => selectedIngredients[ingredient]
        ) ?? [];

      await addToCart({
        id: selectedProduct.value,
        name: selectedProduct.label,
        price: selectedProduct.price,
        ingredients: selectedIngredientsList,
        img: selectedProduct.img,
      });

      setShowBanner(true);
      setTimeout(() => setShowBanner(false), 3000);

      setTimeout(() => {
        setSelectedItem(null);
        setSelectedVersion(null);
        setSelectedIngredients({});
      }, 300);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    carouselRef.current!.dataset.startX = e.touches[0].clientX.toString();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const startX = parseFloat(carouselRef.current!.dataset.startX!);
    const deltaX = e.touches[0].clientX - startX;

    if (deltaX > 50) {
      handleVersionChange("prev");
      carouselRef.current!.dataset.startX = e.touches[0].clientX.toString();
    } else if (deltaX < -50) {
      handleVersionChange("next");
      carouselRef.current!.dataset.startX = e.touches[0].clientX.toString();
    }
  };

  return (
    <MenuLayout backgroundImage="/assets/desserts_bg.webp">
      {showBanner && (
        <div className="banner">Artikel wurde zum Warenkorb hinzugefügt!</div>
      )}

      <div className="menu-grid grill-menu">
        {beilagenOptions.map((item) => (
          <div
            key={item.value}
            className={`menu-item ${
              selectedItem === item.value ? "selected-item" : ""
            } ${item.value.includes("pommes") ? "pommes-item" : ""}`}
            onClick={() => handleItemClick(item.value)}
          >
            {item.versions ? (
              <div
                className="carousel"
                ref={carouselRef}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
              >
                <div className="carousel-buttons">
                  <button
                    className="carousel-button prev"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleVersionChange("prev");
                    }}
                  >
                    &lt;
                  </button>
                  <button
                    className="carousel-button next"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleVersionChange("next");
                    }}
                  >
                    &gt;
                  </button>
                </div>
                <div
                  className="carousel-container"
                  style={{ transform: `rotateY(${rotation}deg)` }}
                >
                  {item.versions.map((version, index) => (
                    <div
                      key={version.value}
                      className={`carousel-item ${
                        selectedVersion === version.value ? "selected" : ""
                      }`}
                      style={{
                        transform: `rotateY(${
                          index * 120
                        }deg) translateZ(300px)`,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVersionClick(version.value);
                      }}
                    >
                      <img src={version.img} alt={version.label} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <img src={item.img} alt={item.label} />
            )}

            <div className="menu-item-details">
              <h3>
                {selectedItem === item.value
                  ? selectedProduct?.label
                  : item.label}
              </h3>
              <p>
                {selectedItem === item.value
                  ? selectedProduct?.price.toFixed(2)
                  : item.price.toFixed(2)}{" "}
                €
              </p>
              {selectedItem === item.value ? (
                <>
                  <ul>
                    {selectedProduct?.ingredients?.map((ingredient, index) => (
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
                    ))}
                  </ul>
                  <div style={{ height: "50px" }}></div>{" "}
                  {/* Unsichtbarer Abstandshalter */}
                 
                  <button onClick={handleAddProduct} className="add-to-cart">
                    In den Warenkorb
                  </button>
                </>
              ) : (
                <button className="invisible-button">Invisible</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </MenuLayout>
  );
}
