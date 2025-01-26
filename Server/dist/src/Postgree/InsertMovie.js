import pool from "../Database/db.js";
export const insertMovie = async (movie) => {
    const query = `
    INSERT INTO movies 
      (id, title, overview, release_date, vote_average, poster_path, genre_ids, backdrop_path, original_language, original_title, popularity, vote_count, adult, video, is_popular)
    VALUES 
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
    ON CONFLICT (id) DO NOTHING
  `;
    const values = [
        movie.id,
        movie.title,
        movie.overview,
        movie.release_date,
        movie.vote_average,
        movie.poster_path,
        movie.genre_ids,
        movie.backdrop_path,
        movie.original_language,
        movie.original_title,
        movie.popularity,
        movie.vote_count,
        movie.adult,
        movie.video,
        movie.is_popular, // Passando o valor de is_popular
    ];
    await pool.query(query, values);
};
