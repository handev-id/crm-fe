import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app.tsx";
import { registerSW } from "virtual:pwa-register";
import MainProvider from "./components/providers/MainProvider.tsx";

registerSW({
  immediate: true,
});

createRoot(document.getElementById("root")!).render(
  <MainProvider>
    <App />
  </MainProvider>
);
