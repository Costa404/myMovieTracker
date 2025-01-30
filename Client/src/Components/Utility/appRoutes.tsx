import React from "react";
import { createBrowserRouter } from "react-router-dom";

import CustomErrorPage from "../../Context/ThemeContext/errorContext/ErrorRoute.tsx";
import AppLayout from "../Pages/AppLayout.tsx";

// Lazy loading das páginas
const LazyHomepage = React.lazy(() => import("../Pages/Homepage/Homepage.tsx"));
const LazyMyArea = React.lazy(() => import("../Pages/MyArea/MyArea.tsx"));
const LazyReviews = React.lazy(() => import("../Pages/Reviews/Reviews.tsx"));
const LazyUserProfile = React.lazy(
  () => import("../Pages/Profile/UserProfile.tsx")
);
const LazyFeed = React.lazy(() => import("../Pages/Feed.tsx"));

export const useAppRoutes = () => {
  return createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />, // Usando AppLayout para envolver as rotas
      errorElement: <CustomErrorPage />,
      children: [
        {
          path: "/",
          element: <LazyHomepage />,
        },
        {
          path: "/myArea",
          element: <LazyMyArea />,
        },
        {
          path: "/reviews",
          element: <LazyReviews />,
        },
        {
          path: "/profile/:username",
          element: <LazyUserProfile />,
        },
        {
          path: "/feed",
          element: <LazyFeed />,
        },
      ],
    },
  ]);
};
