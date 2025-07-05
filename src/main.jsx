import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ChatProvider } from "./context/ChatContext";
import "./index.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <ChatProvider>
    <App />
  </ChatProvider>
);
