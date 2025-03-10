import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import { BrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./store/store";

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <BrowserRouter>
            <StrictMode>
                <App />
                <Toaster />
            </StrictMode>
        </BrowserRouter>
    </Provider>
);

