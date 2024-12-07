// pages/api/user.js
import { Pool } from 'pg';


const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "nomio3226",
    database: "Moodly",
});


export default async function handler(req, res) {
    if (req.method === "GET"){
        try {
            const result = await pool.query("SELECT username, email FROM users WHERE id = 1");
            const user = result.rows[0]
            res.status(200).json(user);

        } catch(error) {
            console.error("Error fetching data:", error)
            res.status(500).json({message: "Error fetching user data"})
        }
    } else{
        res.status(405).end();
    }
}
