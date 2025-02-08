import express from "express";
import pool from "../../Database/db.js";

const moviesDetails = express.Router();

moviesDetails.get("/movies/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const query = `
        SELECT 
          m.id AS "movieId", 
          m.title, 
          m.original_title,
          m.overview,
          m.poster_path, 
          m.backdrop_path,
          m.release_date,
        array_agg(g.name) AS genres
        FROM movies m
        LEFT JOIN movie_genres mg ON m.id = mg.movie_id
        LEFT JOIN genre g ON mg.genre_id = g.id
        WHERE m.id = $1
        GROUP BY m.id;
      `;

    const { rows } = await pool.query(query, [id]);

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
