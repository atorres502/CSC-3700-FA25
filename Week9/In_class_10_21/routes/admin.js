const path = require("path");
const express = require('express');
const router = express.Router();
let products = [ 'Mouse Pad'];
//get request
router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(__dirname, "../views/add-product.html"));
});
//Post request
router.post( '/add-product', (req, res,next ) => {
    console.log("Got Post");
    console.log( req.body );  // body added by express
    products.push(req.body.title);
    res.redirect("/shop");
});
// module.exports = router;
exports.products = products;
exports.routes = router;
//exports.blah = "Thats blah"