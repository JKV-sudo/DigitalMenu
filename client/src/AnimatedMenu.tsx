import React, { useState, useEffect } from "react";
import {
  useTransition,
  useSpring,
  useChain,
  config,
  animated,
  useSpringRef,
} from "@react-spring/web";

import styles from "./AnimatedMenu.module.css";

interface MenuOption {
  label: string;
  value: string;
  className: string;
  img: string;
}

interface AnimatedMenuProps {
  options: MenuOption[];
  onSelect: (value: string) => void;
}

export default function AnimatedMenu({ options, onSelect }: AnimatedMenuProps) {
  const [showText, setShowText] = useState(true); // Kontrolliert den Willkommens-Text
  const [open, setOpen] = useState(false); // Kontrolliert, ob das Menü geöffnet ist

  // **Spring für die Hauptbox (Hintergrundgröße und -animation)**
  const springApi = useSpringRef();
  const { size, ...rest } = useSpring({
    ref: springApi,
    config: { tension: 170, friction: 20 }, // 🔹 Sanftere Animation statt `config.stiff`
    from: { size: "20%" },
    to: { size: open ? "80%" : "20%" },
  });

  // **Transition für die Menü-Items**
  const transApi = useSpringRef();
  const transition = useTransition(open ? options : [], {
    keys: (item) => item.value,
    ref: transApi,
    trail: 400 / (options.length || 1),
    from: { opacity: 0, transform: "scale(0.8)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0.8)", display: "none" }, // 🔹 `display: "none"` verhindert unsichtbare Boxen
    config: config.stiff,
  });

  // **Synchronisation der Animationen**
  useChain(open ? [springApi, transApi] : [transApi, springApi], [
    0,
    open ? 0.1 : 0.6,
  ]);

  // **🔹 useEffect zur stabileren Anzeige des Willkommenstextes**
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setShowText(true); // Nur nach 300ms zurückbringen, um Animationen nicht zu stören
      }, 300);
    }
  }, [open]);

  // **🔹 Fix: Verzögerter Klick-Handler zur Vermeidung von Glitches**
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 🔹 Verhindert ungewollte Klicks auf andere Elemente

    if (showText) {
      setShowText(false); // Erst den Willkommens-Text ausblenden
    }

    setTimeout(() => {
      setOpen((prev) => !prev); // Menü erst nach einer kurzen Verzögerung umschalten
    }, 100); // 🔹 Verzögerung stabilisiert die Animation
  };

  return (
    <div className={styles.wrapper}>
      {/* Hauptbox mit animierter Größe */}
      <animated.div
        style={{ ...rest, width: size, height: size }}
        className={styles.container}
        onClick={handleClick}
      >
        {/* 🔹 Willkommens-Text mit `showText`-State für bessere Animationen */}
        {showText && !open && (
          <div className={styles.firstBoxText}>
            <p>
              Willkommen bei <br /> Masterkebab
            </p>
          </div>
        )}

        {/* Transition für Menü-Items */}
        {transition((style, item) => (
          <animated.div
            key={item.value}
            className={`${styles.item} ${styles[item.className]}`}
            style={{ ...style }}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(item.value);
            }}
          >
            {item.label}
          </animated.div>
        ))}
      </animated.div>
    </div>
  );
}
