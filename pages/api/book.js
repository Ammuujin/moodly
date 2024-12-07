// pages/api/book.js
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
            let query = 'SELECT * FROM books';
            if(mood){
                query = `SELECT * FROM books WHERE mood = '${mood}'`;
            }

            const result = await pool.query(query);
            const books = result.rows;

            if (books.length > 0) {
                const randomIndex = Math.floor(Math.random() * books.length);
                const randomBook = books[randomIndex];
                console.log("Selected book title:", randomBook.title); // Print the book title
                res.status(200).json(randomBook);
            } else {
                res.status(404).json({ message: 'No books found for this mood.' });
            }
        } catch (error) {
            console.error('Error fetching book:', error);
            res.status(500).json({ message: 'Error fetching book data.' });
        }
    } else {
        res.status(405).end();
    }
}
