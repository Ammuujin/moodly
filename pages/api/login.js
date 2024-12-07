// pages/api/login.js
import { Pool } from 'pg';

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "nomio3226",
  database: "Moodly",
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        try {
            const result = await pool.query(
                'SELECT * FROM users WHERE email = $1',
                [email]
            );

            const user = result.rows[0];

            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            if (email === 'admin' && password === 'admin') {
                res.setHeader('Set-Cookie', 'admin=true; Path=/; HttpOnly');
                return res.status(200).json({ message: 'Admin login successful' });
            }

            if (user.password !== password) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            res.setHeader('Set-Cookie', `user=${user.id}; Path=/; HttpOnly`);
            return res.status(200).json({ message: 'Login successful' });
        }
        catch (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    else {
        res.status(405).end();
    }
}
