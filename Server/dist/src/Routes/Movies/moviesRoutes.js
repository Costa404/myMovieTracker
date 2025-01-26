import express from "express";
import pool from "../../Database/db.js";
const moviesRoutes = express.Router();
moviesRoutes.get("/movies", async (req, res) => {
    try {
        const query = `
      SELECT 
        m.id, 
        m.title, 
        m.is_popular,
        m.poster_path,  
        array_agg(g.name) AS genre
      FROM movies m
      JOIN movie_genres mg ON m.id = mg.movie_id
      JOIN genre g ON mg.genre_id = g.id
      GROUP BY m.id;
    `;
        const { rows } = await pool.query(query);
        res.json(rows);
    }
    catch (error) {
        console.error("Erro ao buscar filmes:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});
export default moviesRoutes;
