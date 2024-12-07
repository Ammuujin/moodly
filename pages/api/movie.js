// pages/api/movie.js
import { Pool } from 'pg';

const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "nomio3226",
    database: "Moodly",
  });
export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { mood } = req.query; // Get the mood from the query parameters

        try {
            let query = 'SELECT * FROM movies';
            if (mood) {
                query = `SELECT * FROM movies WHERE mood = '${mood}'`;
            }

            const result = await pool.query(query);
            const movies = result.rows;

            if (movies.length > 0) {
                const randomIndex = Math.floor(Math.random() * movies.length);
                const randomMovie = movies[randomIndex];
                res.status(200).json(randomMovie);
            } else {
                res.status(404).json({ message: 'No movies found for this mood.' });
            }
        } catch (error) {
            console.error('Error fetching movie:', error);
            res.status(500).json({ message: 'Error fetching movie data.' });
        }
    } else {
        res.status(405).end();
    }
}
