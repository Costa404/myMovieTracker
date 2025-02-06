import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import apiRouter from "./src/Routes/routes.js";

dotenv.config();

const app = express();

const corsOrigin =
  process.env.NODE_ENV === "production"
    ? process.env.CORS_ORIGIN_PROD
    : process.env.CORS_ORIGIN_DEV;

app.use(
  cors({
    origin: corsOrigin,
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

console.log("CORS Origin:", corsOrigin);

app.use(express.json());
app.use("/api", apiRouter);

app.use((req, res, next) => {
  res.header("Content-Type", "application/json; charset=utf-8");
  next();
});

app.listen(3000, () => {
  console.log("Server port 3000 ");
});
