import { createBrowserRouter } from "react-router";
import RootLayout, { RouterHydrateFallback } from "./layout";
import { lazyContentPage, lazyHomePage, lazyNotFoundPage } from "./lazy";
import { PATHS } from "./paths";

export const router = createBrowserRouter([
  {
    path: PATHS.home,
    Component: RootLayout,
    HydrateFallback: RouterHydrateFallback,
    children: [
      {
        index: true,
        lazy: lazyHomePage,
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
