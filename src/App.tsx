// MainMenu.jsx
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import "./App.css";
import GlutAnimation from "./GlutAnimation";
import AnimatedMenu from "./AnimatedMenu";
import GrillPage from "./GrillPage";
import BurgerPage from "./BurgerPage";
import KebabPage from "./KebabPage";

interface MenuOption {
  label: string;
  value: string;
  className: string;
  img: string;
}

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

function MainMenu() {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [currentOptions, setCurrentOptions] =
    useState<MenuOption[]>(mainMenuOptions);
  const [animationKey, setAnimationKey] = useState(0); // Neuer Zustand für das Zurücksetzen der Animation
  const navigate = useNavigate();
  const location = useLocation();

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
      e.preventDefault(); // Verhindert die normale Navigation
      setAnimationKey((prevKey) => prevKey + 1); // Erhöhe den Schlüssel, um AnimatedMenu neu zu mounten
    }
    // Andernfalls funktioniert der Link wie gewohnt
  };

  return (
    <div className="app-container">
      <header className="top-bar">
        <Link
          to="/"
          className="logo"
          onClick={handleLogoClick}
          aria-label="Zurück zur Startseite"
        >
          <img src="/assets/Logo.png" width={50} height={50} alt="Logo" />
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
      </header>

      {/* Home-Button 1 */}
      <Link
        to="/"
        className="logoHome"
        onClick={handleLogoClick}
        aria-label="Zurück zur Startseite"
      >
        <img src="/assets/Logo.png" alt="Zurück zur Startseite" />
      </Link>
      <div className="qr">
        <a>
          <img src="/assets/LOGO_QR.png"></img>
        </a>
      </div>

      <div className="body-container">
        <main className="content">
          <GlutAnimation />
        </main>

        <div className="mainbox">
          <AnimatedMenu
            key={animationKey}
            options={currentOptions}
            onSelect={handleMenuSelect}
          />
        </div>
      </div>

      {/* Home-Button 2 */}
      <Link
        to="/"
        className="logoHome"
        onClick={handleLogoClick}
        aria-label="Zurück zur Startseite"
      >
        <img src="/assets/Logo2.png" alt="Zurück zur Startseite" />
      </Link>
    </div>
  );
}

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/grill" element={<GrillPage />} />
        <Route path="/burger" element={<BurgerPage />} />
        <Route path="/kebab" element={<KebabPage />} />
        <Route path="*" element={<MainMenu />} />
      </Routes>
    </Router>
  );
}
