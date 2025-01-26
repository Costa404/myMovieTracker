/* eslint-disable react-refresh/only-export-components */

import React from "react";
import { createBrowserRouter } from "react-router-dom";
import CustomErrorPage from "../../Context/ThemeContext/errorContext/ErrorRoute.tsx";

const LazyHomepage = React.lazy(() => import("../Pages/Homepage/Homepage.tsx"));
const LazyMyArea = React.lazy(() => import("../Pages/MyArea/MyArea.tsx"));

export const useAppRoutes = () => {
  return createBrowserRouter([
    {
      path: "/",
      element: <LazyHomepage />,
      errorElement: <CustomErrorPage />,
    },
    {
      path: "/myArea",
      element: <LazyMyArea />,
      errorElement: <CustomErrorPage />,
    },
  ]);
};
