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