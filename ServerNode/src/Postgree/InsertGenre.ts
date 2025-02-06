import pool from "../Database/db.js";

type Genre = {
  id: number;
  name: string;
};

export const insertGenre = async (genre: Genre) => {
  const checkQuery = "SELECT * FROM genre WHERE id = $1";
  const checkResult = await pool.query(checkQuery, [genre.id]);

  if (checkResult.rows.length === 0) {
    const insertQuery = `
      INSERT INTO genre (id, name)
      VALUES ($1, $2)
      ON CONFLICT (id) DO NOTHING
      `;

    const values = [genre.id, genre.name];

    await pool.query(insertQuery, values);
  }
};
