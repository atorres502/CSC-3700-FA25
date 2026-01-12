const path = require("path");
const express = require("express");
const router = express.Router();
const {products} = require("./admin");

router.get('/', (req, res, next) => {
    console.log("dirname=", __dirname);
    // Make sure you're using sendFile, NOT render
    res.sendFile(path.join(__dirname, "../views/home.html"));
});
router.get('/shop', (req, res, next) => {
    console.log("dirname=", __dirname);
    console.log(products);

    // Make sure you're using sendFile, NOT render
    res.sendFile(path.join(__dirname, "../views/shop.html"));
});

module.exports = router;