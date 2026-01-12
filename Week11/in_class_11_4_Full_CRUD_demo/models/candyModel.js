// models/candyModel.js
const pool = require('../db/pool');

// READ: all
async function findAll() {
    const [rows] = await pool.query(`
    SELECT id, item, \`count\`, cost, totalValue, (\`count\` * cost) AS computedTotal
    FROM candy
    ORDER BY id ASC
  `);
    return rows;
}

// READ: one
async function findById(id) {
    const [rows] = await pool.query(
        `SELECT id, item, \`count\`, cost, totalValue, (\`count\` * cost) AS computedTotal
     FROM candy
     WHERE id = ?`,
        [id]
    );
    return rows[0];
}

// CREATE
async function create({ item, count, cost, totalValue }) {
    const [result] = await pool.query(
        `INSERT INTO candy (item, \`count\`, cost, totalValue) VALUES (?, ?, ?, ?)`,
        [item, count, cost, totalValue]
    );
    return result.insertId;
}

// UPDATE
async function updateById(id, { item, count, cost, totalValue }) {
    const [result] = await pool.query(
        `UPDATE candy SET item = ?, \`count\` = ?, cost = ?, totalValue = ? WHERE id = ?`,
        [item, count, cost, totalValue, id]
    );
    return result.affectedRows; // 1 if updated
}

// DELETE
async function deleteById(id) {
    const [result] = await pool.query(`DELETE FROM candy WHERE id = ?`, [id]);
    return result.affectedRows; // 1 if deleted
}

module.exports = {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
};
