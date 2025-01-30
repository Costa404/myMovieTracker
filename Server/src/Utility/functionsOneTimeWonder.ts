// async function updateUserProfiles() {
//     try {
//       // Conectando ao banco de dados
//       await pool.connect();

//       // Pegando todos os usuários
//       const res = await pool.query(
//         "SELECT id FROM users WHERE profile_picture IS NULL"
//       );

//       const users = res.rows;

//       // Atualizando a imagem de perfil de cada usuário
//       for (const user of users) {
//         const fakeImage = faker.image.avatar(); // Gera uma URL fictícia de imagem

//         // Atualizando o campo profile_picture do usuário
//         await pool.query("UPDATE users SET profile_picture = $1 WHERE id = $2", [
//           fakeImage,
//           user.id,
//         ]);
//         console.log(`Perfil do usuário com ID ${user.id} atualizado!`);
//       }

//       console.log(
//         "Todos os usuários foram atualizados com uma imagem de perfil!"
//       );
//     } catch (error) {
//       console.error("Erro ao atualizar os perfis de usuário:", error);
//     } finally {
//       // Fechar a conexão com o banco
//       await pool.end();
//     }
//   }

//   updateUserProfiles();

// =====================================

// test

// =====================================
// import express from "express";
// import cors from "cors";
// import { SaveDataToPostGree } from "./src/Controller/MovieControllers";

// const app = express();

// app.use(
//   cors({
//     origin: "http://localhost:5173",
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
//   body: JSON.stringify({}),
// })
//   .then((response) => response.json())
//   .then((data) => console.log("Resposta do servidor:", data))
//   .catch((error) => console.error("Erro:", error));

// app.post("/movies", async (req, res) => {
//   try {
//     await SaveDataToPostGree();
//     console.log("crllllllllllllllllllllllll");

//     res
//       .status(201)
//       .send({ message: "Filmes e gêneros inseridos com sucesso!" });
//   } catch (error) {
//     console.error("Erro ao enviar filmes:", error);
//     res.status(500).send({ error: "Erro ao enviar filmes." });
//   }
// });

// app.use("/api", apiRouter);

// app.use(express.json());

// app.listen(3000, () => {
//   console.log("Server  port 3000 ");
// });

// =====================================

// test

// =====================================
