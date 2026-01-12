// pool.js (CommonJS)
require('dotenv').config();            // <-- make sure .env is loaded
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',   // safer default on Windows
    port: Number(process.env.DB_PORT || 3306),  // be explicit about port
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 10),
    queueLimit: Number(process.env.DB_QUEUE_LIMIT || 0),
});

// Optional: quick health check at startup so failures are obvious
(async () => {
    try {
        const [r] = await pool.query('SELECT 1 AS ok');
        console.log('DB OK:', r[0]);
    } catch (e) {
        console.error('DB FAIL:', e.code, e.message);
        // Helpful hints for common cases:
        if (e.code === 'ECONNREFUSED') {
            console.error('Tip: Is MySQL running? Is host/port correct? Try DB_HOST=127.0.0.1');
        } else if (e.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('Tip: Check DB_USER / DB_PASS credentials.');
        } else if (e.code === 'ER_BAD_DB_ERROR') {
            console.error('Tip: Check DB_NAME exists.');
        }
    }
})();

module.exports = pool;

