import express from "express";
import pool from "../Database/db";

const reviewsMovies = express.Router();

reviewsMovies.get("/reviewsMovies", async (req, res) => {
  try {
    const query = `
        SELECT 
          r.id AS review_id, 
          r.username, 
          r.movie_id, 
          m.title AS movie_title, 
          m.poster_path AS movie_image, 
          r.review, 
          r.rating
        
        FROM reviews r
        JOIN movies m ON r.movie_id = m.id;
      `;

    const result = await pool.query(query);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Erro fetching reviews:", error);
    res.status(500).json({ error: "Erro in the server" });
  }
});

export default reviewsMovies;
