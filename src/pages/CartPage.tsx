import React, { useEffect, useState } from "react";
import { getCart, removeFromCart, placeOrder } from "../cartService";
import GlutAnimation from "../GlutAnimation";
import "./CartPage.css";
import { Link } from "react-router-dom";

interface CartItem {
  id: string;
  name: string;
  price: number;
  img?: string;
  ingredients?: string[];
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [showModal, setShowModal] = useState(false); // 🔥 Toggle modal
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    isPickup:"",
    isDelivery:""
  });

  // 🛒 Load cart items
  useEffect(() => {
    const fetchCart = async () => {
      const items = await getCart();
      setCartItems(items);
      setTotal(
        items.reduce((sum: number, item: CartItem) => sum + item.price, 0)
      );
    };

    fetchCart();
  }, []);

  // 🛒 Remove item from cart
  const handleRemoveFromCart = async (
    productId: string,
    indexToRemove: number
  ) => {
    await removeFromCart(productId);
    setCartItems((prevItems) =>
      prevItems.filter((_, index) => index !== indexToRemove)
    );
    setTotal((prevTotal) => prevTotal - (cartItems[indexToRemove]?.price || 0));
  };

  // 📩 Handle customer input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const handleConfirmOrder = async () => {
    if (
      !customerInfo.name ||
      !customerInfo.address ||
      !customerInfo.phone ||
      !customerInfo.email ||
      !customerInfo.isDelivery ||
      !customerInfo.isPickup
    ) {
      alert("Bitte fülle alle Felder aus!");
      return;
    }

    const success = await placeOrder(customerInfo);
    if (success) {
      alert("Bestellung erfolgreich aufgegeben!");
      setCartItems([]); // 🛒 Warenkorb-UI zurücksetzen
      setTotal(0);
      setShowModal(false);
    } else {
      alert("Fehler beim Aufgeben der Bestellung. Bitte versuche es erneut.");
    }
  };

  return (
    <>
      <GlutAnimation />
      <header className="top-bar">
        <Link to="/" className="logo" aria-label="Zurück zur Startseite">
          <img src="/assets/Logo.png" width={50} height={50} alt="Logo" />
        </Link>
        <div className="titel">
          <h1>
            <span className="master">Master</span>
            <span className="kebs"> Döner</span>
          </h1>
        </div>
        <a
          href="https://www.instagram.com/master_doener1/"
          target="_blank"
          rel="noopener noreferrer"
          className="ig-link"
        >
          <img src="/assets/ig.png" alt="Instagram" className="ig-icon" />
        </a>
      </header>

      <div className="cart-container">
        <h1>Warenkorb</h1>
        {cartItems.length === 0 ? (
          <p className="empty-cart">Der Warenkorb ist leer.</p>
        ) : (
          <ul className="cart-items">
            {cartItems.map((item, index) => (
              <li key={`${item.id}-${index}`}>
                <div className="item-header">
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveFromCart(item.id, index)}
                  >
                    X
                  </button>
                </div>
                {item.img && (
                  <img src={item.img} alt={item.name} className="item-img" />
                )}
                <div className="item-info">
                  <span className="item-name">{item.name}</span>
                  <span className="item-price">{item.price.toFixed(2)} €</span>
                  {item.ingredients && item.ingredients.length > 0 && (
                    <ul className="cart-item-ingredients">
                      {item.ingredients.map((ingredient, i) => (
                        <li
                          key={`${item.id}-ingredient-${i}`}
                          className="cart-ingredient"
                        >
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
        <p className="cart-total">Gesamt: {total.toFixed(2)} €</p>

        {/* 🔥 Open Confirmation Modal */}
        {cartItems.length > 0 && (
          <button className="checkout-btn" onClick={() => setShowModal(true)}>
            Bestellung absenden
          </button>
        )}
      </div>

      <div>
        <Link to="/" className="logoHome" aria-label="Zurück zur Startseite">
          <img src="/assets/Logo2.png" alt="Zurück zur Startseite" />
        </Link>
      </div>

      {/* 🔥 Order Confirmation Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Bestellung bestätigen</h2>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="isPickup"
                  value={customerInfo.isPickup}
                  onChange={handleChange}
                />
                Abholung
              </label>
              <label>
                <input
                  type="radio"
                  name="isPickup"
                  value={customerInfo.isDelivery}
                  onChange={handleChange}
                />
                Lieferung
              </label>
            </div>

            <label>
              <br></br>Name:
              <input
                type="text"
                name="name"
                value={customerInfo.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Adresse:
              <input
                type="text"
                name="address"
                value={customerInfo.address}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Telefonnummer:
              <input
                type="number"
                name="phone"
                value={customerInfo.phone}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={customerInfo.email}
                onChange={handleChange}
                required
              />
            </label>

            <p>
              <strong>Gesamtbetrag:</strong> {total.toFixed(2)} €
            </p>
            <button className="confirm-btn" onClick={handleConfirmOrder}>
              Bestellung bestätigen
            </button>
            <button className="close-btn" onClick={() => setShowModal(false)}>
              Schließen
            </button>
          </div>
        </div>
      )}
    </>
  );
}
