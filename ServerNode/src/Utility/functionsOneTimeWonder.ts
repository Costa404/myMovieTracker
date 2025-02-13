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
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import apiRouter from "./src/Routes/routes.js";
// import pool from "./src/Database/db.js";

// dotenv.config();

// const app = express();

// const corsOrigin =
//   process.env.NODE_ENV === "production"
//     ? process.env.CORS_ORIGIN_PROD
//     : process.env.CORS_ORIGIN_DEV;

// app.use(
//   cors({
//     origin: corsOrigin,
//     methods: ["GET", "POST", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );

// console.log("CORS Origin:", corsOrigin);

// // Fetch reviews for a movie
// const fetchReviews = async (movieId) => {
//   try {
//     const response = await fetch(
//       `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=d351f155e840f50339b0982ce6baccc7`
//     );
//     if (!response.ok)
//       throw new Error(`Error fetching reviews for movie ${movieId}`);

//     const data = await response.json();
//     return { movieId, reviews: data.results };
//   } catch (error) {
//     console.error(`Error fetching reviews for movie ${movieId}:`, error);
//     return { movieId, reviews: [] };
//   }
// };

// // Get movies that have not had reviews fetched
// const getPendingMovies = async (limit = 10) => {
//   const res = await pool.query(
//     "SELECT id FROM movies WHERE is_review_fetched = FALSE LIMIT $1",
//     [limit]
//   );
//   return res.rows.map((row) => row.id);
// };

// // Mark a movie as processed
// const markMovieAsFetched = async (movieId) => {
//   await pool.query("UPDATE movies SET is_review_fetched = TRUE WHERE id = $1", [
//     movieId,
//   ]);
// };

// // Save reviews to the database
// const saveReviewsToDatabase = async (movieId, reviews) => {
//   for (const review of reviews) {
//     const { author_details, content, created_at } = review;
//     await pool.query(
//       `INSERT INTO reviews_from_TMDB (movie_id, author_details, content, created_at)
//        VALUES ($1, $2, $3, $4)`, // Corrigido o erro de vírgula extra
//       [movieId, JSON.stringify(author_details), content, created_at] // Aqui estão os parâmetros corretamente passados
//     );
//   }
// };

// // Process movies in batches
// const fetchReviewsForMovies = async (batchSize = 10, delay = 2000) => {
//   while (true) {
//     const movieIds = await getPendingMovies(batchSize);
//     if (movieIds.length === 0) {
//       console.log("All movies already have reviews fetched.");
//       break;
//     }

//     console.log(`Fetching reviews for: ${movieIds.join(", ")}`);
//     const batchReviews = await Promise.all(movieIds.map(fetchReviews));

//     for (const { movieId, reviews } of batchReviews) {
//       if (reviews.length > 0) {
//         // Save the reviews to the database
//         await saveReviewsToDatabase(movieId, reviews);
//       }
//       await markMovieAsFetched(movieId);
//     }

//     console.log(`Waiting ${delay}ms before the next batch...`);
//     await new Promise((resolve) => setTimeout(resolve, delay));
//   }
// };

// fetchReviewsForMovies();

// app.use(express.json());
// app.use("/api", apiRouter);

// app.use((req, res, next) => {
//   res.header("Content-Type", "application/json; charset=utf-8");
//   next();
// });

// app.listen(3000, () => {
//   console.log("Server port 3000");
// });
// =============================
// Test
// =============================

// // 🔹 Buscar `movie_id` da tabela
// const getMovieIds = async () => {
//   try {
//     const result = await pool.query("SELECT  movie_id FROM movies");
//     return result.rows.map((row) => row.movie_id);
//   } catch (error) {
//     console.error("Erro ao buscar movie_id da base de dados:", error);
//     return [];
//   }
// };

// // 🔹 Buscar dados do TMDB
// const fetchMovieData = async (movieId) => {
//   try {
//     console.log(`Buscando dados para o filme ID: ${movieId}`);
//     const response = await fetch(
//       `https://api.themoviedb.org/3/movie/${movieId}?api_key=d351f155e840f50339b0982ce6baccc7`
//     );
//     const data = await response.json();

//     if (!data || data.status_code) {
//       console.error(
//         `Erro na API TMDB para o filme ${movieId}:`,
//         data.status_message
//       );
//       return;
//     }

//     const { popularity, vote_average, vote_count, id } = data;
//     await saveMovieData(id, popularity, vote_average, vote_count);
//   } catch (error) {
//     console.error(`Erro ao buscar dados do filme ${movieId}:`, error);
//   }
// };

// // 🔹 Salvar dados no banco
// // 🔹 Salvar dados no banco (agora em movie_history)
// // 🔹 Salvar dados no banco (agora em movie_history com movie_id)
// const saveMovieData = async (movie_id, popularity, voteAverage, voteCount) => {
//   try {
//     const query = `
//       INSERT INTO movie_history (movie_id, popularity, vote_average, vote_count, date)
//       VALUES ($1, $2, $3, $4, CURRENT_DATE)
//       ON CONFLICT (movie_id, date) DO NOTHING
//     `;

//     await pool.query(query, [movie_id, popularity, voteAverage, voteCount]);
//     console.log(`✅ Filme ${movie_id} salvo no histórico com sucesso.`);
//   } catch (err) {
//     console.error("Erro ao salvar no banco de dados:", err);
//   }
// };

// // 🔹 Atualizar os filmes
// const updateMoviesData = async () => {
//   console.log("🔄 Iniciando atualização de filmes...");
//   const movieIds = await getMovieIds();

//   if (movieIds.length === 0) {
//     console.log("⚠️ Nenhum filme encontrado no banco.");
//     return;
//   }

//   for (const movieId of movieIds) {
//     await fetchMovieData(movieId);
//     await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay para evitar limites da API
//   }

//   console.log("✅ Atualização concluída!");
// };

// // 🚀 Iniciar o servidor
// app.listen(3000, async () => {
//   console.log("🚀 Servidor rodando na porta 3000");

//   // Chamar atualização após o servidor iniciar
//   await updateMoviesData();
// });
