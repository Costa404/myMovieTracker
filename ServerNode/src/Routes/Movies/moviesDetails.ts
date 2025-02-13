import express from "express";
import pool from "../../Database/db.js";

const moviesDetails = express.Router();

moviesDetails.get("/movies/:movie_id", async (req, res) => {
  const { movie_id } = req.params;

  try {
    const query = `
        SELECT 
          m.movie_id AS "movieId", 
          m.title, 
          m.original_title,
          m.overview,
          m.poster_path, 
          m.backdrop_path,
          m.release_date,
          array_agg(g.name) AS genres
        FROM movies m
        LEFT JOIN movie_genres mg ON m.movie_id = mg.movie_id
        LEFT JOIN genre g ON mg.genre_id = g.id
        WHERE m.movie_id = $1
        GROUP BY m.movie_id;
      `;

    const { rows } = await pool.query(query, [movie_id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Filme não encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Erro ao buscar detalhes do filme:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

export default moviesDetails;
