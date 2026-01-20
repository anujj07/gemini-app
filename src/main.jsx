import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ContextProvider } from "./context/context.jsx";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found! Ensure your HTML file has a <div id='root'></div>.");
}

createRoot(rootElement).render(
  
    <ContextProvider>
      <App />
    </ContextProvider>
  
);
