import { Router } from "express";
import loginRouter from "./Auth/Login.js";
import signupRouter from "./Auth/Signup.js";

import moviesRoutes from "./Movies/moviesRoutes.js";
import moviesDetails from "./Movies/moviesDetails.js";
import moviesSearch from "./Movies/moviesSearch.js";

import getCurrentUserRouter from "./ProtectedRoutes/getCurrentUser.js";
import postWatchlistRouter from "./ProtectedRoutes/Watchlist/postWatchlist.js";
import deleteWatchlistRouter from "./ProtectedRoutes/Watchlist/deleteWatchlist.js";
import getWatchlistRouter from "./ProtectedRoutes/Watchlist/getWatchlist.js";

import reviewsMovies from "./reviewsMovies.js";

const apiRouter = Router();

// auth
apiRouter.use("/", loginRouter);
apiRouter.use("/", signupRouter);

// Watchlist
apiRouter.use("/", postWatchlistRouter);
apiRouter.use("/", deleteWatchlistRouter);
apiRouter.use("/", getWatchlistRouter);

// movies
apiRouter.use("/", moviesRoutes);
apiRouter.use("/", moviesDetails);
apiRouter.use("/", moviesSearch);
apiRouter.use("/", reviewsMovies);

apiRouter.use("/", getCurrentUserRouter);

export default apiRouter;
