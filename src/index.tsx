import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Layout from "./components/layout/Layout";
import { AppProvider } from "./store/context";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <AppProvider>
    <React.StrictMode>
      <Layout />
    </React.StrictMode>
  </AppProvider>
);

reportWebVitals();

