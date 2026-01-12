const pool = require('../db/pool');

exports.findAll = async () => {
    const [rows] = await pool.query(`
    SELECT
      id, item, \`count\`, cost, totalValue,
      (\`count\` * cost) AS computedTotal
    FROM candy
    ORDER BY id ASC
  `);
    return rows;
};

exports.findById = async (id) => {
    const sql = `
    SELECT
        id, item, \`count\`, cost, totalValue,
        (\`count\`* cost) AS computedTotal
    FROM candy
    WHERE id = ?
    ORDER BY id ASC
    `;
    const [rows] = await pool.query(sql, [id]);
    return rows[0];
}
