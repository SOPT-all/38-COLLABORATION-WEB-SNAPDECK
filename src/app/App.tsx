import { RouterProvider } from "react-router";

import { router } from "@/app/router/routes";
import "@/shared/styles/global.css";
import "@/shared/styles/theme.css";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
