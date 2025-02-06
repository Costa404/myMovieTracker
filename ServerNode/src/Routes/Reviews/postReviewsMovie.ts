import { Router, Request, Response } from "express";
import { authMiddleware } from "../../Middlewares/authMiddleware.js";
import pool from "../../Database/db.js";

const postReviewsMovie = Router();

postReviewsMovie.post(
  "/postReviewsMovies",
  authMiddleware,
  async (req: Request & { user?: { username: string } }, res: Response) => {
    const { movie_id, review, rating } = req.body;
    const username = req.user?.username;
    console.log("req", req.body);

    if (!username) {
      return res.status(400).json({ message: "User is not authenticated." });
    }

    try {
      const result = await pool.query(
        "INSERT INTO reviews (username, movie_id, review, rating) VALUES ($1, $2, $3, $4) RETURNING *",
        [username, movie_id, review, rating]
      );

      res.json({
        message: "Review added to reviewDb!",
        review: result.rows[0],
      });
    } catch (error) {
      console.error("Error adding review:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default postReviewsMovie;
