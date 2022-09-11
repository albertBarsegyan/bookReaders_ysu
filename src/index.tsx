import "./styles/index.css";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { ProvideAuth } from "./hooks/useAuth.hooks";
import { ModalProvider } from "./hooks/useModal.hooks";
import { PopupProvider } from "./hooks/usePopup.hooks";

ReactDOM.render(
  <React.StrictMode>
    <ProvideAuth>
      <BrowserRouter>
        <PopupProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </PopupProvider>
      </BrowserRouter>
    </ProvideAuth>
  </React.StrictMode>,
  document.getElementById("root")
);
