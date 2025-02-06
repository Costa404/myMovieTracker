import express from "express";
import pool from "../../../Database/db";
import { authMiddleware } from "../../../Middlewares/authMiddleware";

const moviesHistory = express.Router();

moviesHistory.get("/moviesHistory", authMiddleware, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { userId } = req.user as { userId: number };

  try {
    const result = await pool.query(
      `SELECT 
            h.user_id, 
            h.movie_id AS id, 
            m.title AS MovieTitle,
            m.genre_ids AS MovieGenre,
            m.poster_path AS MovieImg,
            DATE(h.watched_at) AS watched_at
        FROM history h
        JOIN movies m ON h.movie_id = m.id
        WHERE h.user_id = $1
        ORDER BY h.watched_at DESC`,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching movie history:", error);
    res.status(500).json({ error: "Error in the server" });
  }
});
export default moviesHistory;
