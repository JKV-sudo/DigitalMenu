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
