// const { pool } = require("pg");
// const dotenv = require("dotenv");
// dotenv.config()
 
// const connectDb = async () => {
//     try {
//         const pool = new pool({
//             user: process.env.PGUSER,
//             host: process.env.PGHOST,
//             database: process.env.PGDATABASE,
//             password: process.env.PGPASSWORD,
//             port: process.env.PGPORT
//         })
 
//         await pool.connect()
//         const res = await pool.query('SELECT * FROM pool')
//         console.log(res)
//         await pool.end()
//     } catch (error) {
//         console.log(error)
//     }
// }
 
// connectDb();


const express = require('express');
const { Client } = require('pg');

const app = express();

app.use(express.json());

const client = new Client();
await client.connect();

app.post('/signup', async (req, res) => {
  const { username, first_name, last_name, password, email } = req.body;
  const query = 'INSERT INTO users (username, first_name, last_name, password, email) VALUES ($1, $2, $3, hash_password($4), $5)';
  const values = [username, first_name, last_name, password, email];

  await client.query(query, values);
  res.json({ message: 'User created successfully' });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});