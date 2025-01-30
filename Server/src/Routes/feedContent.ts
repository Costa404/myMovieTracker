import express from "express";
import pool from "../Database/db";
import { authMiddleware } from "../Middlewares/authMiddleware";

const feedContent = express.Router();

feedContent.get("/feedContent", authMiddleware, async (req, res) => {
  try {
    const username = req.user?.username;
    const usernameArray = String(username);

    console.log("usernameArray", usernameArray);

    if (!usernameArray) {
      return res.status(400).json({ error: "usernameArray is required" });
    }

    const query = `
      SELECT 
  r.id AS review_id, 
  r.username AS review_username, 
  u.username AS user_username,
        u.profile_picture,  
  r.movie_id, 
  m.poster_path,
  m.title AS movieName, 
  r.review, 
  r.rating, 
  r.created_at
FROM reviews r
JOIN users u 
  ON r.username = u.username
JOIN movies m 
  ON r.movie_id = m.id
WHERE r.username IN (
  SELECT 
    CASE 
      WHEN f.user_id = $1 THEN f.friend_id 
      ELSE f.user_id 
    END
  FROM friends f
  WHERE f.user_id = $1 OR f.friend_id = $1
)
ORDER BY r.created_at DESC;

    `;

    const result = await pool.query(query, [usernameArray]);

    const feed = result.rows;
    console.log("FEes", feed);
    res.json(feed);
  } catch (error) {
    console.error("Error fetching feed:", error);
    res.status(500).json({ error: "Error fetching feed" });
  }
});

export default feedContent;
