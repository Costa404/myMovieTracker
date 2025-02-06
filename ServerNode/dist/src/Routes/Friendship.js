import express from "express";
import pool from "../Database/db";
const friendship = express.Router();
friendship.post("/friendship", async (req, res) => {
    try {
        const { user_id, friend_id } = req.body;
        // Verifica se já existe amizade
        const existingFriendship = await pool.query("SELECT * FROM friends WHERE (user_id = $1 AND friend_id = $2) OR (user_id = $2 AND friend_id = $1)", [user_id, friend_id]);
        if (existingFriendship.rows.length > 0) {
            return res.status(400).json({ message: "Amizade já existe!" });
        }
        // Insere a amizade
        await pool.query("INSERT INTO friends (user_id, friend_id) VALUES ($1, $2)", [user_id, friend_id]);
        res.json({ message: "Amigo adicionado com sucesso!" });
    }
    catch (error) {
        console.error("Erro ao adicionar amigo:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
});
export default friendship;
