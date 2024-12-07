import { Pool } from 'pg';

const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "nomio3226",
    database: "Moodly",
});

export default async function handler(req, res) {
  try {
      const result = await pool.query(`
          SELECT DISTINCT mood FROM books
          UNION
          SELECT DISTINCT mood FROM movies
          UNION
          SELECT DISTINCT mood FROM musics
      `);
      const moods = result.rows.map((row) => row.mood);
      res.status(200).json(moods);
  } catch (error) {
      console.error('Error fetching moods:', error);
      res.status(500).json({ message: 'Error fetching moods data.' });
  }
}
