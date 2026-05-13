import { createBrowserRouter } from "react-router";

import HomePage from "@/pages/HomePage";

import RootLayout, { RouterHydrateFallback } from "./layout";
import { lazyContentPage, lazyNotFoundPage } from "./lazy";
import { PATHS } from "./paths";

export const router = createBrowserRouter([
  {
    path: PATHS.home,
    Component: RootLayout,
    HydrateFallback: RouterHydrateFallback,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: PATHS.content,
        lazy: lazyContentPage,
      },
      {
        path: PATHS.notFound,
        lazy: lazyNotFoundPage,
      },
    ],
  },
]);
