import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./store/index.js";
import { Provider } from "react-redux";

const MOUNT_NODE = document.getElementById("root");
const appRoot = createRoot(MOUNT_NODE);
const appElm = (
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);
appRoot.render(appElm);
