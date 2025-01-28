import { generateToken } from "../../Utility/generateWebToken";
import bcrypt from "bcrypt";
import { Router } from "express";
import pool from "../../Database/db.js";
import { isValidEmail } from "../../Utility/emailValidation";

const signupRouter = Router();

signupRouter.post("/signup", async (req, res) => {
  const { email, password, username } = req.body;

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    const client = await pool.connect();

    const userCheck = await client.query(
      "SELECT * FROM users WHERE email = $1 OR username = $2",
      [email, username]
    );

    if (userCheck.rows.length > 0) {
      client.release();
      return res
        .status(400)
        .json({ error: "E-mail or Username already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 4);

    await client.query(
      "INSERT INTO users (email, password, username) VALUES ($1, $2, $3)",
      [email, hashedPassword, username]
    );

    const newUserResult = await client.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    const newUser = newUserResult.rows[0];

    const token = generateToken(newUser.email, newUser.username, newUser.id);

    client.release();

    res.json({ message: "User created successfully", token });
  } catch (error) {
    console.error("Error in the signup", error);
    res.status(500).json({ error: "Error in the server" });
  }
});

export default signupRouter;
