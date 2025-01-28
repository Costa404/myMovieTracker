import pool from "../Database/db"; // Importando a conexão com o banco
import { reviews } from "../Utility/reviews"; // Suponho que as reviews estão definidas aqui
// Função para inserir as reviews no banco
const insertReviews = async () => {
    try {
        // Buscar todos os usuários e filmes do banco
        const usersResult = await pool.query("SELECT id FROM users");
        const moviesResult = await pool.query("SELECT id FROM movies");
        const userIds = usersResult.rows.map((user) => user.id);
        const movieIds = moviesResult.rows.map((movie) => movie.id);
        // Para cada usuário, vamos inserir entre 1 a 3 reviews
        for (const userId of userIds) {
            const numReviews = Math.floor(Math.random() * 3) + 1; // Número aleatório entre 1 e 3 reviews
            for (let i = 0; i < numReviews; i++) {
                // Escolher uma review aleatória
                const review = reviews[Math.floor(Math.random() * reviews.length)];
                // Escolher um filme aleatório
                const randomMovieId = movieIds[Math.floor(Math.random() * movieIds.length)];
                // Inserir a review no banco
                const query = `
          INSERT INTO reviews (user_id, movie_id, review_text)
          VALUES ($1, $2, $3)
        `;
                const values = [userId, randomMovieId, review.review];
                await pool.query(query, values);
            }
        }
    }
    catch (error) {
        console.error("Erro ao inserir as reviews:", error);
    }
};
// Executando a inserção das reviews
insertReviews();
