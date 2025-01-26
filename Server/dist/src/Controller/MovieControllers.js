import { insertMovie } from "../Postgree/InsertMovie.js";
import { insertMovieGenre } from "../Postgree/InsertGenreMovie.js";
import { fetchDataFromApi } from "../Service/apiService.js";
export const SaveDataToPostGree = async () => {
    try {
        const movieData = await fetchDataFromApi(); // Esta função já retorna os filmes populares
        console.log("movieData", movieData);
        if (!Array.isArray(movieData)) {
            throw new Error("A resposta da API não é um array de filmes.");
        }
        for (const movie of movieData) {
            // Todos os filmes que vêm dessa API são populares, então podemos definir is_popular como true
            const isPopular = true;
            // Inserir os dados do filme com o campo is_popular
            await insertMovie({ ...movie, is_popular: isPopular });
            for (const genreId of movie.genre_ids) {
                await insertMovieGenre(movie.id, genreId);
            }
        }
        console.log("Filmes e genre_id inseridos com sucesso!");
    }
    catch (error) {
        console.error("Erro ao inserir filme e genre_id:", error);
        throw new Error("Erro ao inserir filme e genre_id.");
    }
};
