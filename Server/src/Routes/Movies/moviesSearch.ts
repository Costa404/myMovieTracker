import express from "express";
import pool from "../../Database/db.js";

const moviesSearch = express.Router();

moviesSearch.get("/movies/search", async (req, res) => {
  // Pegue o valor de 'query' da query string da requisição
  const query = req.query.query;

  console.log("Valor de query no backend:", query);

  // Se a query não for uma string válida, retorne erro
  if (!query || typeof query !== "string") {
    return res
      .status(400)
      .json({ error: "O parâmetro 'query' deve ser uma string válida." });
  }

  try {
    // Usando LIKE para procurar filmes pelo nome
    const result = await pool.query(
      "SELECT * FROM movies WHERE moviename ILIKE $1",
      [`%${query}%`]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

export default moviesSearch;
