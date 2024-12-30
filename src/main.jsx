import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { CryptoProvider } from "./context/CryptoContext.jsx";
import "react-alice-carousel/lib/alice-carousel.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CryptoProvider>
        <App />
      </CryptoProvider>
    </BrowserRouter>
  </StrictMode>
);
