import React from "react";
import { Link } from "react-router-dom";

export default function Rechtliches() {
  const handleLogoClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    // Add any specific logic for the logo click if needed
  };

  return (
    <div className="rechtliches">
      <Link
        to="/"
        className="logoHome"
        onClick={handleLogoClick}
        aria-label="Zurück zur Startseite"
      >
        <img src="/assets/Logo.png" alt="Zurück zur Startseite" />
      </Link>
      <h1>Impressum & Datenschutzerklärung</h1>
      <section>
        <h2>Impressum</h2>
        <p>
          Musterfirma GmbH
          <br />
          Musterstraße 1<br />
          12345 Musterstadt
          <br />
          Deutschland
          <br />
          Telefon: +49 (0) 123 456789
          <br />
          E-Mail: info@musterfirma.de
          <br />
        </p>
      </section>
      <section>
        <h2>Datenschutzerklärung</h2>
        <p>
          Hier können Sie Ihre Datenschutzerklärung einfügen. Stellen Sie
          sicher, dass alle relevanten Informationen enthalten sind, um den
          gesetzlichen Anforderungen zu entsprechen.
        </p>
      </section>
    </div>
  );
}
