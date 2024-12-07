// pages/api/signup.js
import { Pool } from 'pg';
import bcrypt from 'bcrypt';

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "nomio3226",
  database: "Moodly",
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, email, password } = req.body;

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            
            const result = await pool.query(
                'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id',
                [username, email, hashedPassword]
            );

            const newUserId = result.rows[0].id;
            
            res.status(201).json({ message: 'User created successfully', userId: newUserId });
        } catch (error) {
            console.error('Error creating user:', error); // Log the full error object
            
            if (error.code === '23505') {
                res.status(400).json({ message: 'Username or email already exists' });
            } else if (error.code === '22P02') {
                res.status(400).json({ message: "Invalid input data type"});
            }
            else if(error.message.includes("users_username_key")){
                res.status(400).json({ message: "Username already exist"});
            }
            else if(error.message.includes("users_email_key")){
                res.status(400).json({ message: "Email already exist"});
            }
            else {
                res.status(500).json({ message: 'Internal server error: ' + error.message}); // More specific error message
            }
        }
    }
    else {
        res.status(405).end();
    }
}
