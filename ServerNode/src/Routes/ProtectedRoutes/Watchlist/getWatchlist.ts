import { Router, Request, Response } from "express";
import { authMiddleware } from "../../../Middlewares/authMiddleware.js";
import pool from "../../../Database/db.js";

const getWatchlistRouter = Router();

getWatchlistRouter.get(
  "/watchlist",
  authMiddleware,
  async (req: Request & { user?: { userId: number } }, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const userId = req.user.userId;

    try {
      const result = await pool.query(
        "SELECT * FROM movies WHERE movie_id IN (SELECT movie_id FROM watchlist WHERE user_id = $1)",
        [userId]
      );
      res.json(result.rows);
    } catch (error: unknown) {
      console.error(
        `Error fetching watchlist for userId ${userId}:`,
        (error as Error).message
      );
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default getWatchlistRouter;
