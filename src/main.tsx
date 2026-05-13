import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import App from "./app/App.tsx";

async function enableMocking() {
  if (import.meta.env.DEV && import.meta.env.VITE_ENABLE_MSW === "true") {
    try {
      const { worker } = await import("@/shared/mocks/browser.ts");

      await worker.start({
        onUnhandledRequest: "warn",
      });
    } catch (error) {
      // MSW는 개발 편의 기능이므로 실패해도 앱 실행은 계속합니다.
      void error;
    }
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
