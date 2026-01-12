const Candy = require('../models/candyModel');
async function list(req, res, next) {
    try {
        const candies = await Candy.findAll();
        res.json({ data: candies });
    } catch (err) {
        next(err);
    }
}
async function show(req, res, next) {
    try {
        const candy = await Candy.findById(req.params.id);
        if (!candy) return res.status(404).json({ error: 'Candy not found' });
        res.json({ data: candy });
    } catch (err) {
        next(err);
    }
}
async function create(req, res, next) {
    try {
        const { item, count, cost, totalValue } = req.body;
        if (!item || !count) {
            return res.status(400).json({ error: 'Item and count are required' });
        }
        const newCandy = await Candy.create({ item, count, cost, totalValue });
        res.status(201).json({ data: newCandy });
    } catch (err) {
        next(err);
    }
}
async function update(req, res, next) {
    try {
        const { item, count, cost, totalValue } = req.body;
        const existing = await Candy.findById(req.params.id);
        if (!existing) return res.status(404).json({ error: 'Candy not found' });

        const updated = await Candy.update(req.params.id, {
            item,
            count,
            cost,
            totalValue,
        });
        res.json({ data: updated });
    } catch (err) {
        next(err);
    }
}
async function remove(req, res, next) {
    try {
        const ok = await Candy.remove(req.params.id);
        if (!ok) return res.status(404).json({ error: 'Candy not found' });
        res.status(204).send(); // No content
    } catch (err) {
        next(err);
    }
}

// export all controller functions (CommonJS)
module.exports = {
    list,
    show,
    create,
    update,
    remove,
};
