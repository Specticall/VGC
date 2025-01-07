import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "react-loading-skeleton/dist/skeleton.css";
import "swiper/swiper-bundle.css";
import { MIDTRANS_CLIENT_KEY } from "./lib/config.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
//
(() => {
  const script = document.createElement("script");
  script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
  script.setAttribute("data-client-key", MIDTRANS_CLIENT_KEY);
  document.body.appendChild(script);
})();
