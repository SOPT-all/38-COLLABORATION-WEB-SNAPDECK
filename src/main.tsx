import { StrictMode } from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRoot } from "react-dom/client";

import App from "./app/App.tsx";
import { queryClient } from "./shared/api/queryClient.ts";

async function enableMocking() {
  if (import.meta.env.DEV && import.meta.env.VITE_ENABLE_MSW === "true") {
    try {
      const { worker } = await import("@/shared/mocks/browser.ts");

      await worker.start({
        onUnhandledRequest: "warn",
      });
    } catch (error) {
      void error;
    }
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StrictMode>,
  );
});
