import express, { Request, Response } from "express";
import { authMiddleware } from "../../Middlewares/authMiddleware";

const getCurrentUserRouter = express.Router();

getCurrentUserRouter.get(
  "/currentUser",
  authMiddleware,
  async (
    req: Request & { user?: { userId: number; username: string } },
    res: Response
  ) => {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    res.json(req.user);
  }
);

export default getCurrentUserRouter;
