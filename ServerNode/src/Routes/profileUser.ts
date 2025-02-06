import express from "express";
import pool from "../Database/db";

const profileUser = express.Router();

profileUser.get("/profile/:username", async (req, res) => {
  const { username } = req.params;

  const query = `
  SELECT r.*, m.title AS movieTitle, u.profile_picture
  FROM reviews r
  JOIN movies m ON r.movie_id = m.id
  JOIN users u ON r.username = u.username
  WHERE r.username = $1;
  `;

  try {
    const result = await pool.query(query, [username]);

    res.json(result.rows);
  } catch (error) {
    console.error("Erro ao buscar reviews:", error);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

export default profileUser;
