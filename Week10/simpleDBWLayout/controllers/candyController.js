const Candy = require('../models/candyModel');

exports.list = async (req, res, next) => {
    try {
        const candies = await Candy.findAll();
        res.render('candy', { title: 'Candy Inventory', candies });
    } catch (err) {
        next(err);
    }
};
