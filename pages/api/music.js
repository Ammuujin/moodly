// pages/api/song.js
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
            let query = 'SELECT * FROM musics';
            if (mood) {
                query = `SELECT * FROM musics WHERE mood = '${mood}'`;
            }

            const result = await pool.query(query);
            const songs = result.rows;

            if (songs.length > 0) {
                const randomIndex = Math.floor(Math.random() * songs.length);
                const randomSong = songs[randomIndex];
                res.status(200).json(randomSong);
            } else {
                res.status(404).json({ message: 'No songs found for this mood.' });
            }
        } catch (error) {
            console.error('Error fetching song:', error);
            res.status(500).json({ message: 'Error fetching song data.' });
        }
    } else {
        res.status(405).end();
    }
}
