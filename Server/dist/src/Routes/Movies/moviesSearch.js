import express from "express";
import pool from "../../Database/db.js";
const moviesSearch = express.Router();
moviesSearch.get("/movies/search", async (req, res) => {
    const { query } = req.query;
    console.log("Valor de query no backend:", query);
    if (!query) {
        return res
            .status(400)
            .json({ error: "O parâmetro 'query' é obrigatório." });
    }
    try {
        const result = await pool.query("SELECT * FROM movies ");
        res.json(result.rows);
    }
    catch (error) {
        console.error("Erro ao buscar filmes:", error);
        res.status(500).json({ error: "Erro no servidor" });
    }
});
export default moviesSearch;
