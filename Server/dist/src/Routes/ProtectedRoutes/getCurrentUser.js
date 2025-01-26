import express from "express";
import { authMiddleware } from "../../Middlewares/authMiddleware";
const getCurrentUserRouter = express.Router();
getCurrentUserRouter.get("/currentUser", authMiddleware, async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
    }
    res.json(req.user); // Retornando id e username
});
export default getCurrentUserRouter;
