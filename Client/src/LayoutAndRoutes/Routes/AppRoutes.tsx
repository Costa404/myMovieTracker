import React from "react";
import { createBrowserRouter } from "react-router-dom";

import CustomErrorPage from "../../Context/ThemeContext/errorContext/ErrorRoute.tsx";
import { myAreaRoutes } from "./MyAreaRoutes.tsx";
import AppLayout from "../Layout/AppLayout.tsx";

const LazyHomepage = React.lazy(
  () => import("../../Components/Pages/Homepage/Homepage.tsx")
);

const LazyReviews = React.lazy(
  () => import("../../Components/Pages/Reviews/Reviews.tsx")
);
const LazyUserProfile = React.lazy(
  () => import("../../Components/Pages/Profile/UserProfile.tsx")
);
const LazyFeed = React.lazy(() => import("../../Components/Pages/Feed.tsx"));
const LazyTvShows = React.lazy(
  () => import("../../Components/Pages/TvShows/TvShows.tsx")
);
const LazyMyAreaLayout = React.lazy(() => import("../Layout/MyAreaLayout.tsx"));
const LazySearchResult = React.lazy(
  () => import("../../Components/Pages/SearchResult/SearchResult.tsx")
);

export const useAppRoutes = () => {
  return createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <CustomErrorPage />,
      children: [
        { path: "/", element: <LazyHomepage /> },
        { path: "/reviews", element: <LazyReviews /> },
        { path: "/profile/:username", element: <LazyUserProfile /> },
        { path: "/tvShows", element: <LazyTvShows /> },
        { path: "/feed", element: <LazyFeed /> },
        { path: "/search", element: <LazySearchResult /> },
        {
          path: "/myArea",
          element: <LazyMyAreaLayout />,
          children: myAreaRoutes.children,
        },
      ],
    },
  ]);
};
