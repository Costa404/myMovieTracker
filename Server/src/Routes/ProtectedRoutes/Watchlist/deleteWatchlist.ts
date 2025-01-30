import { Router, Request, Response } from "express";
import { authMiddleware } from "../../../Middlewares/authMiddleware.js";
import pool from "../../../Database/db.js";

const deleteWatchlistRouter = Router();

deleteWatchlistRouter.delete(
  "/deleteFromWatchlist/:movieId",
  authMiddleware,
  async (req: Request & { user?: { userId: number } }, res: Response) => {
    const { movieId } = req.params;
    const userId = req.user?.userId;

    try {
      await pool.query(
        "DELETE FROM watchlist WHERE user_id = $1 AND movie_id = $2",
        [userId, movieId]
      );
      res.json({ message: "movie deleted from watchlist!" });
    } catch (error) {
      console.error("Erro ao remover da watchlist:", error);
      res.status(500).json({ message: "server error" });
    }
  }
);

export default deleteWatchlistRouter;
