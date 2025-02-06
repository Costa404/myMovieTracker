import pool from "../Database/db";
import { reviews } from "../Utility/reviews";
export const insertReviews = async (req, res) => {
    try {
        // Obtém a lista de usernames e IDs dos filmes
        const usersResult = await pool.query("SELECT username FROM users");
        const moviesResult = await pool.query("SELECT id FROM movies");
        const usernames = usersResult.rows.map((user) => user.username);
        const movieIds = moviesResult.rows.map((movie) => movie.id);
        console.log("Usernames:", usernames);
        console.log("Movie IDs:", movieIds);
        for (const username of usernames) {
            const numReviews = Math.floor(Math.random() * 3) + 1; // Entre 1 e 3 reviews por usuário
            for (let i = 0; i < numReviews; i++) {
                const review = reviews[Math.floor(Math.random() * reviews.length)];
                const randomMovieId = movieIds[Math.floor(Math.random() * movieIds.length)];
                const rating = Math.floor(Math.random() * 5) + 1; // Gera um número entre 1 e 5
                const query = `
          INSERT INTO reviews (username, movie_id, review, rating)
          VALUES ($1, $2, $3, $4)
        `;
                const values = [username, randomMovieId, review.review, rating];
                console.log("Inserting review:", values);
                await pool.query(query, values);
            }
        }
        res.status(200).json({ message: "Reviews inseridas com sucesso!" });
    }
    catch (error) {
        console.error("Erro ao inserir as reviews:", error);
        res.status(500).json({ message: "Erro ao inserir as reviews." });
    }
};
