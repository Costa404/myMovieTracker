// import express from "express";
// import cors from "cors";
// import { SaveDataToPostGree } from "./src/Controller/MovieControllers";
// const app = express();
// // Middleware para permitir CORS
// app.use(
//   cors({
//     origin: "http://localhost:5173", // Permitir apenas o frontend no localhost:5173
//     methods: ["GET", "POST", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );
// console.log("foda.sseeee");
// fetch("http://localhost:3000/movies", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     /* Dados que você quer enviar */
//   }),
// })
//   .then((response) => response.json())
//   .then((data) => console.log("Resposta do servidor:", data))
//   .catch((error) => console.error("Erro:", error));
// app.post("/movies", async (req, res) => {
//   try {
//     // Chama a função para salvar os dados no banco
//     await SaveDataToPostGree();
//     console.log("crllllllllllllllllllllllll");
//     // Envia a resposta de sucesso
//     res
//       .status(201)
//       .send({ message: "Filmes e gêneros inseridos com sucesso!" });
//   } catch (error) {
//     console.error("Erro ao enviar filmes:", error);
//     res.status(500).send({ error: "Erro ao enviar filmes." });
//   }
// });
// app.use(express.json()); // Middleware para interpretar JSON
// app.listen(3000, () => {
//   console.log("Servidor rodando na porta 3000 🚀");
// });
// =====================================
// test
// =====================================
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import apiRouter from "./src/Routes/routes.js";
dotenv.config();
const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));
app.use(express.json());
app.use("/api", apiRouter);
app.use((req, res, next) => {
    res.header("Content-Type", "application/json; charset=utf-8");
    next();
});
app.listen(3000, () => {
    console.log("Server port 3000 🚀");
});
