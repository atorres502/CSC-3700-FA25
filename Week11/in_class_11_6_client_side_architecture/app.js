require('dotenv').config();
const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes/api-v1');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', apiRouter);  //base route, what every url needs to have in front

app.get('/api/v1/health', (req, res) => {
    res.json({ ok: true, version: 'v1' });
});

app.use((req, res) => res.status(404).json({ error: 'Not found' }));

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Server error', message: err.message });
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`API running at http://localhost:${PORT}/api/v1`);
});
