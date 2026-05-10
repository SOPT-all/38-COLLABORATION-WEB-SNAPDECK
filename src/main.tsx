import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import("@/shared/mocks/browser.ts");

    await worker.start({
      onUnhandledRequest: "warn",
    });
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});