// app.js
const express = require('express');
const mysql = require('mysql2/promise');
const app = express();

// ---------- EDIT THESE SETTINGS ----------
const pool = mysql.createPool({
    host: '45.55.136.114',   //  DB host
    user: 'csc3610',   // 👈 DB username
    password: 'csc3610', // 👈  DB password
    database: 'csc3610',     // DB Name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
// -----------------------------------------

app.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM BestSellingBooks');

        // Simple HTML output
        let html = `
      <h1>Best Selling Books</h1>
      <table border="1" cellpadding="5">
        <thead>
          <tr>
            <th>ID</th><th>Title</th><th>Author</th><th>Language</th><th>Year</th><th>Sale</th><th>Genre</th>
          </tr>
        </thead>
        <tbody>
    `;
        for (const book of rows) {
            html += `
        <tr>
          <td>${book.id}</td>
          <td>${book.Title}</td>
          <td>${book.Author}</td>
          <td>${book.Language}</td>
          <td>${book.Year}</td>
          <td>${book.Sale}</td>
          <td>${book.Genre}</td>
        </tr>
      `;
        }
        html += `</tbody></table>`;
        res.send(html);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send('Error connecting to the database.');
    }
});

const PORT = 3333;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
