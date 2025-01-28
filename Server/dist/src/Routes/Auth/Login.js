import { generateToken } from "../../Utility/generateWebToken";
import bcrypt from "bcrypt";
import { Router } from "express";
import pool from "../../Database/db.js";
import dotenv from "dotenv";
dotenv.config();
const loginRouter = Router();
loginRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const client = await pool.connect();
        const result = await client.query("SELECT * FROM users WHERE email = $1", [
            email,
        ]);
        const user = result.rows[0];
        if (!user || !(await bcrypt.compare(password, user.password))) {
            console.warn("Invalid login attempt for email:", email);
            client.release();
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = generateToken(user.email, user.username, user.id);
        console.log("User logged in successfully:", user.email);
        client.release();
        res.json({ token });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
export default loginRouter;
