import express from "express";
import pool from "../../Database/db.js";

const moviesRoutes = express.Router();

moviesRoutes.get("/movies", async (req, res) => {
  try {
    const query = `
      SELECT 
        m.movie_id, 
        m.title, 
        m.is_popular,
        m.poster_path,  
        array_agg(g.name) AS genre,
        m.fakeimdb AS "fakeImdb"
      FROM movies m
      JOIN movie_genres mg ON m.movie_id = mg.movie_id
      JOIN genre g ON mg.genre_id = g.id
      GROUP BY m.movie_id;
    `;

    const { rows } = await pool.query(query);

    res.json(rows);
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

export default moviesRoutes;
