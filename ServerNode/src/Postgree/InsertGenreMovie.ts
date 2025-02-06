import pool from "../Database/db.js";

export const insertMovieGenre = async (
  movie_id: number,
  genre_id: number
): Promise<void> => {
  const query = `
      INSERT INTO movie_genres (movie_id, genre_id)
      VALUES ($1, $2)
      ON CONFLICT (movie_id, genre_id) DO NOTHING
    `;

  const values = [movie_id, genre_id];

  await pool.query(query, values);
};
