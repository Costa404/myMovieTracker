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

import reviewsMovies from "./Reviews/getReviewsMovies.js";
import profileUser from "./profileUser.js";
import friendship from "./friendship.js";
import feedContent from "./feedContent.js";
import postReviewsMovie from "./Reviews/postReviewsMovie.js";
import moviesHistory from "./ProtectedRoutes/MoviesHistory/getMoviesHistory.js";
import postMoviesHistory from "./ProtectedRoutes/MoviesHistory/postMoviesHistory.js";
import movieReviews from "./getMovieReview.js";

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

// review
apiRouter.use("/", reviewsMovies);
apiRouter.use("/", postReviewsMovie);

// profile
apiRouter.use("/", getCurrentUserRouter);
apiRouter.use("/", profileUser);

apiRouter.use("/", friendship);
apiRouter.use("/", feedContent);

// moviesHistory
apiRouter.use("/", moviesHistory);
apiRouter.use("/", postMoviesHistory);
apiRouter.use("/", movieReviews);

export default apiRouter;
