import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import "./App.css";
import { CartProvider } from "./context/cartContext";
import GlutAnimation from "./GlutAnimation";
import AnimatedMenu from "./AnimatedMenu";
import GrillPage from "./pages/GrillPage";
import BurgerPage from "./pages/BurgerPage";
import KebabPage from "./pages/KebabPage";
import CartPage from "./pages/CartPage";
import JKV from "./jkv";

// 🔥 Firebase Imports
import { auth } from "./firebase";
import { signInAnonymously, onAuthStateChanged, User } from "firebase/auth";

interface MenuOption {
  label: string;
  value: string;
  className: string;
  img: string;
}

// Hauptmenü-Optionen:
const mainMenuOptions: MenuOption[] = [
  {
    label: "Grill-Gerichte",
    value: "grill",
    className: "grill",
    img: "/assets/grill.jpg",
  },
  {
    label: "Smash-Burger",
    value: "burger",
    className: "burger",
    img: "/assets/smash.jpg",
  },
  {
    label: "Kebab-Spezialitäten",
    value: "kebab",
    className: "kebab",
    img: "/assets/kebab.jpg",
  },
];

// 🔥 Firebase Auth-Handling (Anonyme Anmeldung)
const useFirebaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        console.log("🔹 Angemeldeter Nutzer:", currentUser.uid);
      } else {
        try {
          const userCredential = await signInAnonymously(auth);
          setUser(userCredential.user);
          console.log("✅ Neuer anonymer Nutzer:", userCredential.user.uid);
        } catch (error) {
          console.error("❌ Fehler bei der anonymen Anmeldung:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return user;
};

// 1) Die MainMenu-Komponente:
function MainMenu() {
  const [animationKey, setAnimationKey] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const user = useFirebaseAuth(); // 🔥 Firebase Auth-Status abrufen

  const handleMenuSelect = (value: string) => {
    if (value === "grill") {
      navigate("/grill");
    } else if (value === "burger") {
      navigate("/burger");
    } else if (value === "kebab") {
      navigate("/kebab");
    } else {
      console.log("Untermenü gewählt:", value);
    }
  };

  const handleLogoClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (location.pathname === "/") {
      e.preventDefault();
      setAnimationKey((prevKey) => prevKey + 1);
    }
  };

  return (
    <CartProvider>
      <div className="app-container">
        <header className="top-bar">
          <Link
            to="/"
            className="logo"
            onClick={handleLogoClick}
            aria-label="Zurück zur Startseite"
          >
            <img src="/assets/Logo.png" width={60} height={60} alt="Logo" />
          </Link>
          <div className="titel">
            <h1>
              <span className="master">Master</span>{" "}
              <span className="kebs">Döner</span>
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
          <Link to="/cart" className="cart-link" aria-label="Zum Warenkorb">
            <img
              src="/assets/cart1.png"
              width={50}
              height={50}
              alt="Warenkorb"
              className="cart-icon"
            />
          </Link>
        </header>

        <Link
          to="/"
          className="logoHome"
          onClick={handleLogoClick}
          aria-label="Zurück zur Startseite"
        >
          <img src="/assets/Logo.png" alt="Zurück zur Startseite" />
        </Link>

        <div className="qr">
          <Link to="/jkv">
            <img
              src="/assets/Logo_1_JKV.png"
              width={150}
              height={100}
              alt="JKV SoftwareSolutions"
            />
          </Link>
        </div>

        <div className="body-container">
          <main className="content">
            <GlutAnimation />
          </main>

          <div className="mainbox">
            <AnimatedMenu
              key={animationKey}
              options={mainMenuOptions}
              onSelect={handleMenuSelect}
            />
          </div>
        </div>

        <Link
          to="/"
          className="logoHome"
          onClick={handleLogoClick}
          aria-label="Zurück zur Startseite"
        >
          <img src="/assets/Logo2.png" alt="Zurück zur Startseite" />
        </Link>
      </div>
    </CartProvider>
  );
}

// 2) Die Haupt-App mit Routing:
export default function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/grill" element={<GrillPage />} />
          <Route path="/burger" element={<BurgerPage />} />
          <Route path="/kebab" element={<KebabPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/jkv" element={<JKV />} />
          <Route path="*" element={<MainMenu />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}
