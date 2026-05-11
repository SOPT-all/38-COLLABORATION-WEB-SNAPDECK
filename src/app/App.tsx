import "@/styles/theme.css";
import "@/styles/global.css";

import { RouterProvider } from "react-router";

import { router } from "@/app/router/routes";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
