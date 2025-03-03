// src/cartService.ts
import { db, auth } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

// 🛒 Funktion zum Hinzufügen eines Produkts zum Warenkorb
export const addToCart = async (product: { 
    id: string; 
    name: string; 
    price: number; 
    ingredients?: string[]; // ✅ Ingredients jetzt erlaubt
    img?: string; 
    email?: string;
    isPickup?: boolean;
  }) => {
    const user = auth.currentUser;
    if (!user) {
      console.error("❌ Kein Benutzer angemeldet!");
      return;
    }
  
    const userCartRef = doc(db, "carts", user.uid);
    const cartSnapshot = await getDoc(userCartRef);
    let cartData = cartSnapshot.exists() ? cartSnapshot.data() : { items: [] };
  
    // ✅ Ingredients werden jetzt korrekt gespeichert
    cartData.items.push(product);
  
    await setDoc(userCartRef, cartData);
    console.log("✅ Produkt in Firestore gespeichert:", product);
  };

// 🛒 Funktion zum Abrufen des Warenkorbs
export const getCart = async () => {
  const user = auth.currentUser;
  if (!user) {
    console.error("Kein Benutzer angemeldet!");
    return [];
  }

  const cartRef = doc(db, "carts", user.uid);
  const cartSnap = await getDoc(cartRef);

  if (cartSnap.exists()) {
    const cartData = cartSnap.data();
    return cartData.items;
  } else {
    return [];
  }
};

// 🛒 Funktion zum Entfernen eines Produkts aus dem Warenkorb
export const removeFromCart = async (productId: string) => {
  const user = auth.currentUser;
  if (!user) {
    console.error("Kein Benutzer angemeldet!");
    return;
  }

  const cartRef = doc(db, "carts", user.uid);
  const cartSnap = await getDoc(cartRef);

  if (cartSnap.exists()) {
    const cartData = cartSnap.data();
    const updatedItems = cartData.items.filter((item: any) => item.id !== productId);
    await setDoc(cartRef, { items: updatedItems });
  }
};
import { collection, addDoc, Timestamp, deleteDoc } from "firebase/firestore";

// 🛒 Funktion zum Aufgeben einer Bestellung
export const placeOrder = async (customerInfo: { name: string; address: string; phone: string; email: string; isPickup: boolean }) => {
  const user = auth.currentUser;
  if (!user) {
    console.error("❌ Kein Benutzer angemeldet!");
    return false;
  }

  const cartRef = doc(db, "carts", user.uid);
  const cartSnap = await getDoc(cartRef);

  if (!cartSnap.exists()) {
    console.error("❌ Kein Warenkorb gefunden!");
    return false;
  }

  const cartData = cartSnap.data();
  if (!cartData.items || cartData.items.length === 0) {
    console.error("❌ Warenkorb ist leer!");
    return false;
  }

  const orderData = {
    userId: user.uid,
    customer: {
      name: customerInfo.name,
      address: customerInfo.address,
      phone: customerInfo.phone,
      email: customerInfo.email,
    },
    items: cartData.items,
    total: cartData.items.reduce((sum: number, item: any) => sum + item.price, 0),
    isPickup: customerInfo.isPickup, // ✅ Now storing Pickup/Delivery option
    status: "pending",
    createdAt: Timestamp.now(),
  };
  

  try {
    await addDoc(collection(db, "orders"), orderData); // 🔥 Speichert die Bestellung in Firestore
    await deleteDoc(cartRef); // 🗑️ Löscht den Warenkorb nach der Bestellung
    console.log("✅ Bestellung erfolgreich gespeichert:", orderData);
    return true;
  } catch (error) {
    console.error("❌ Fehler beim Speichern der Bestellung:", error);
    return false;
  }
};
import emailjs from "@emailjs/browser";

export const sendOrderEmail = async (customerEmail: string, customerName: string, orderDetails: string, total: number) => {
  const serviceId = "PASTE_YOUR_SERVICE_ID"; // 🔥 Service ID von EmailJS
  const templateId = "PASTE_YOUR_TEMPLATE_ID"; // 🔥 Template ID von EmailJS
  const publicKey = "PASTE_YOUR_PUBLIC_KEY"; // 🔥 Public Key von EmailJS

  const templateParams = {
    to_email: customerEmail,
    to_name: customerName,
    order_details: orderDetails,
    total_price: total.toFixed(2),
  };

  try {
    await emailjs.send(serviceId, templateId, templateParams, publicKey);
    console.log("✅ Bestellbestätigung gesendet an:", customerEmail);
  } catch (error) {
    console.error("❌ Fehler beim Senden der E-Mail:", error);
  }
};
