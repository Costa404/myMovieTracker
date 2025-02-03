import React from "react";
import { Navigate, RouteObject } from "react-router-dom";

const LazyMyArea = React.lazy(
  () => import("../../Components/Pages/MyArea/MyArea.tsx")
);

const LazyWatchlist = React.lazy(
  () => import("../../Components/Pages/MyArea/Watchlist/Watchlist.tsx")
);

const LazyMyReviews = React.lazy(
  () => import("../../Components/Pages/MyArea/MyReviews/MyReviews.tsx")
);

const LazyMoviesHistory = React.lazy(
  () => import("../../Components/Pages/MyArea/MoviesHistory/MoviesHistory.tsx")
);

export const myAreaRoutes: RouteObject = {
  path: "/myArea",
  element: <LazyMyArea />,
  children: [
    { index: true, element: <Navigate to="watchlist" replace /> },
    { path: "watchlist", element: <LazyWatchlist /> },
    { path: "myReviews", element: <LazyMyReviews /> },
    { path: "moviesHistory", element: <LazyMoviesHistory /> },
  ],
};
