import { Router } from "express";
import { authMiddleware } from "../../../Middlewares/authMiddleware.js";
import pool from "../../../Database/db.js";
const postWatchlistRouter = Router();
postWatchlistRouter.post("/watchlist", authMiddleware, async (req, res) => {
    const { movieId } = req.body;
    const userId = req.user?.userId;
    try {
        const result = await pool.query("INSERT INTO watchlist (user_id, movie_id) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING *", [userId, movieId]);
        if (result.rowCount === 0) {
            return res
                .status(400)
                .json({ message: "Movie is already in the watchlist" });
        }
        res.json({ message: "Movie added to watchlist!" });
    }
    catch (error) {
        console.error("Error adding to watchlist:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
export default postWatchlistRouter;
