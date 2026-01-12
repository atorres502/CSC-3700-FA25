// controllers/studentController.js
const Candy = require('../models/candyModel');

/* ---------- READ: list all candies ---------- */
exports.list = async (req, res, next) => {
    try {
        const candies = await Candy.findAll();
        res.render('candy', { title: 'Candy Inventory', candies });
    } catch (err) {
        next(err);
    }
};

/* ---------- READ: show one candy by ID ---------- */
exports.show = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0)
            return res.status(400).send('Invalid id');

        const candy = await Candy.findById(id);
        if (!candy)
            return res.status(404).send('Candy not found');

        res.render('candyDetails', { title: `Candy #${id}`, candy });
    } catch (err) {
        next(err);
    }
};

/* ---------- CREATE: show new candy form ---------- */
exports.newForm = (req, res) => {
    res.render('candyForm', {
        title: 'Add Candy',
        mode: 'create',
        candy: { item: '', count: '', cost: '', totalValue: '' },
        action: '/candy?_method=POST',
        submitLabel: 'Create'
    });
};

/* ---------- CREATE: insert new candy ---------- */
exports.create = async (req, res, next) => {
    try {
        const { item, count, cost, totalValue } = scrub(req.body);
        const id = await Candy.create({ item, count, cost, totalValue });
        res.redirect(`/candy/${id}`);
    } catch (err) {
        next(err);
    }
};

/* ---------- UPDATE: show edit form ---------- */
exports.editForm = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0)
            return res.status(400).send('Invalid id');

        const candy = await Candy.findById(id);
        if (!candy)
            return res.status(404).send('Candy not found');

        res.render('candyForm', {
            title: `Edit Candy #${id}`,
            mode: 'edit',
            candy,
            action: `/candy/${id}?_method=PUT`,
            submitLabel: 'Update'
        });
    } catch (err) {
        next(err);
    }
};
/* ---------- UPDATE: save updated record ---------- */
exports.update = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0)
            return res.status(400).send('Invalid id');

        const { item, count, cost, totalValue } = scrub(req.body);
        const updated = await Candy.updateById(id, { item, count, cost, totalValue });

        if (!updated)
            return res.status(404).send('Candy not found');

        res.redirect(`/candy/${id}`);   //default verb is: GET. this is a GET request
    } catch (err) {
        next(err);
    }
};
exports.destroy = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0)
            return res.status(400).send('Invalid id');

        const deleted = await Candy.deleteById(id);
        if (!deleted)
            return res.status(404).send('Candy not found');

        res.redirect('/');
    } catch (err) {
        next(err);
    }
};
function scrub({ item, count, cost, totalValue }) {
    return {
        item: String(item ?? '').trim(),    //?? is the nullish operator. a ?? b means: give me a if
        count: Number(count ?? 0),          //its not null or undefined, otherwise, use b
        cost: Number(cost ?? 0),            //almost like a shortened ternary operator
        totalValue: String(totalValue ?? '').trim() || null
    };
}