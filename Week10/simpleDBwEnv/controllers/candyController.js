const Candy = require('../models/candyModel');

exports.list = async (req, res, next) => {
    try {
        const candies = await Candy.findAll();
        res.render('candy', { title: 'Candy Inventory', candies });
    } catch (err) {
        next(err);
    }
};

exports.show = async (req, res, next) => {
    try {
        const id = req.params.id;
        const candies = await Candy.findById(id);
        res.render('candyDetails',
            { title: 'Candy Inventory', 'candy' : candies });
    } catch (err) {
        next(err);
    }
};