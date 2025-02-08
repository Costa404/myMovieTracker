import express from "express";
import pool from "../Database/db";

const movieReviews = express.Router();

movieReviews.get("/MovieReviews/:movieId", async (req, res) => {
  const { movieId } = req.params;

  try {
    // Executando a consulta SQL para buscar as reviews
    const result = await pool.query(
      "SELECT * FROM reviews_from_TMDB WHERE movie_id = $1",
      [movieId]
    );

    // Retorna as reviews como resposta JSON
    res.json(result.rows);
  } catch (error) {
    console.error(`Erro ao buscar reviews para o filme ${movieId}:`, error);
    res.status(500).json({ error: "Erro ao buscar reviews." });
  }
});

export default movieReviews;
