import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import { BrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <StrictMode>
            <App />
            <Toaster />
        </StrictMode>
    </BrowserRouter>
);

