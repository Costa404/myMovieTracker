import React from "react";
import { createBrowserRouter } from "react-router-dom";

import CustomErrorPage from "../../Context/ThemeContext/errorContext/ErrorRoute.tsx";
import { myAreaRoutes } from "./MyAreaRoutes.tsx";
import AppLayout from "../Layout/AppLayout.tsx";

import MovieDetails from "../../Components/Pages/MovieDetails/MovieDetails.tsx";

const LazyHomepage = React.lazy(
  () => import("../../Components/Pages/Homepage/Homepage.tsx")
);

const LazyReviews = React.lazy(
  () => import("../../Components/Pages/Reviews/Reviews.tsx")
);
const LazyTop100 = React.lazy(
  () => import("../../Components/Pages/Top100/Top100.tsx")
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
        { path: "/movie/:movieName", element: <MovieDetails /> },
        { path: "/tvShows", element: <LazyTvShows /> },
        { path: "/feed", element: <LazyFeed /> },
        { path: "/top100", element: <LazyTop100 /> },
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
