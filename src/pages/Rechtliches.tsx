import React from "react";
import { Link } from "react-router-dom";
import "../Rechtliches.css"; // Importiere die CSS-Datei

export default function Rechtliches() {
  return (
    <div className="rechtliches">
      <Link to="/" className="logoHome" aria-label="Zurück zur Startseite">
        <img src="/assets/Logo.png" alt="Zurück zur Startseite" className="logo" />
      </Link>
      
      <h1>Impressum & Datenschutzerklärung</h1>

      <section>
        <h2>📌 Impressum</h2>
        <p>
          Master Döner GbR <br />
          Inhaber: Halishasan Celik & Erdal Celik <br />
          USt-ID: DE442429488 <br />
          Steuernummer: 113/168/00086 <br /><br />

          Adresse:<br />
          Simon-Breu-Straße 57 <br />
          84359 Simbach am Inn <br />
          Deutschland <br /><br />

          📞 Telefon: +49 151 44256835 <br />
          ✉️ E-Mail: <a href="mailto:masterdoner20@gmail.com">Masterdoner20@gmail.com</a>
        </p>
        <br />
      </section>

      <section>
        <h2>📌 Split Vision</h2>
        <p>
          Jacob Starrermayr <br />
          📞 +49 151 220297 692 <br />
          Gefertigt im Auftrag von Master Döner GbR.
        </p>
        <br />
      </section>

      <section>
        <h2>📌 Datenschutzerklärung</h2>

        <h3>1. Datenerfassung & Speicherung</h3>
        <p>
          Wir speichern keine persönlichen Benutzerkonten. Bestellungen werden jedoch durch 
          **Fingerprint-IDs** zugeordnet, die lokal auf dem Gerät gespeichert und über 
          **Firebase** verarbeitet werden.
        </p>

        <h3>2. Verwendung von Firebase (Google LLC)</h3>
        <p>
          Unsere Website nutzt **Google Firebase** zur Authentifizierung und Bestellverwaltung.
          Firebase kann Daten wie **IP-Adresse, Geräteinformationen und Bestellinformationen** erfassen.
          Weitere Informationen findest du in der  
          <a href="https://firebase.google.com/support/privacy?hl=de" target="_blank" rel="noopener noreferrer">
            Datenschutzerklärung von Firebase
          </a>.
        </p>

        <h3>3. Automatisierte E-Mails über EmailJS</h3>
        <p>
          Für Bestellbestätigungen nutzen wir **EmailJS**. Dabei wird nur die **E-Mail-Adresse** verarbeitet.
          Weitere Infos findest du in der  
          <a href="https://www.emailjs.com/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">
            Datenschutzerklärung von EmailJS
          </a>.
        </p>

        <h3>4. Cookies & Fingerprint-Tracking</h3>
        <p>
          Um Bestellungen zuzuweisen, verwenden wir **Fingerprint-IDs**. Falls du das Tracking deaktivieren 
          möchtest, kannst du die **Cookies in deinem Browser löschen oder den Inkognito-Modus nutzen**.
        </p>
      </section>

      <section>
        <h2>📌 Haftungsausschluss (Disclaimer)</h2>

        <h3>1. Haftung für Inhalte</h3>
        <p>
          Wir übernehmen keine Gewähr für die Richtigkeit, Vollständigkeit und Aktualität 
          der bereitgestellten Inhalte.
        </p>

        <h3>2. Haftung für Links</h3>
        <p>
          Unsere Website enthält Links zu externen Seiten, auf deren Inhalte wir keinen Einfluss haben.
          Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter verantwortlich.
        </p>

        <h3>3. Urheberrecht</h3>
        <p>
          Alle Inhalte dieser Website unterliegen dem deutschen Urheberrecht.
          Die Vervielfältigung oder Bearbeitung bedarf der schriftlichen Zustimmung.
        </p>
      </section>
    </div>
  );
}
