import { Router, Request, Response } from "express";
import { authMiddleware } from "../../../Middlewares/authMiddleware.js";
import pool from "../../../Database/db.js";

const postMoviesHistory = Router();

postMoviesHistory.post(
  "/postMoviesHistory",
  authMiddleware,
  async (req: Request & { user?: { userId: number } }, res: Response) => {
    const { movieId } = req.body;
    const userId = req.user?.userId;

    try {
      const result = await pool.query(
        "INSERT INTO history (user_id, movie_id) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING *",
        [userId, movieId]
      );

      if (result.rowCount === 0) {
        return res
          .status(400)
          .json({ message: "Movie is already in the moviesHistory" });
      }

      res.json({ message: "Movie added to moviesHistory!" });
    } catch (error) {
      console.error("Error adding to moviesHistory:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default postMoviesHistory;
