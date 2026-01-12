const pool = require('../db/pool');   // use require instead of import

async function findAll() {
    const [rows] = await pool.query(
        'SELECT id, item, `count`, cost, totalValue, (`count` * cost) AS computedTotal FROM candy ORDER BY id ASC'
    );
    return rows;
}

async function findById(id) {
    const [rows] = await pool.query(
        'SELECT id, item, `count`, cost, totalValue, (`count` * cost) AS computedTotal FROM candy WHERE id = ?',
        [id]
    );
    return rows[0];
}

async function create({ item, count, cost, totalValue }) {
    const sql =
        'INSERT INTO candy (item, `count`, cost, totalValue) VALUES (?, ?, ?, ?)';
    const [result] = await pool.query(sql, [item, count, cost, totalValue]);
    return await findById(result.insertId);
}

async function update(id, { item, count, cost, totalValue }) {
    const sql =
        'UPDATE candy SET item = ?, `count` = ?, cost = ?, totalValue = ? WHERE id = ?';
    await pool.query(sql, [item, count, cost, totalValue, id]);
    return await findById(id);
}

async function remove(id) {
    const [result] = await pool.query('DELETE FROM candy WHERE id = ?', [id]);
    return result.affectedRows > 0;
}

// export all functions (CommonJS style)
module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
};
