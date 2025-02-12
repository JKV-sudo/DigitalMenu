import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CartProvider } from "./context/cartContext"; // Import CartProvider

ReactDOM.render(
  <React.StrictMode>
    <CartProvider> {/* Wrap App with CartProvider */}
      <App />
    </CartProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
