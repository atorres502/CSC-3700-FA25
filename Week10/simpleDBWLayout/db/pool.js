const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '45.55.136.114',       //  DB host
    user: 'csc3610',       // DB User
    password: 'csc3610',   // DB Password
    database: 'csc3610',         //  DB name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
