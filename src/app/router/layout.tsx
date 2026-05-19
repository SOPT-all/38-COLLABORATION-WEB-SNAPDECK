import { Outlet } from "react-router";

export const RouterHydrateFallback = () => {
  return null;
};

const RootLayout = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};

export default RootLayout;
