const express = require('express');
//lets you access the directory
const path = require("node:path");
const app = express();
//built in method that allows you to parse the body
app.use(express.urlencoded({extended: true}));
//grabs a static file from the public directory within the current directory
app.use(express.static(path.join(__dirname, 'public')));
app.get( '/hello', ( req, res) => {
    res.sendFile(path.join(__dirname, 'public/myform.html'));
    // let msg = "<body> "
    // msg += "<form action='/product' method='post'>";
    // msg += "<br/> <input type='text' name='book'>";
    // msg += "<br/> <input type='text' name='author'>";
    // msg += "<br/> <button type='submit'>Submit</button></form>";
    // res.send( msg );
});
//easy way to grab  things from forms
app.post( '/product', ( req, res) => {
    console.log(req.body);
    let msg = `Title: ${req.body.book}`;
    msg += ` Author: ${req.body.author}`;
    res.send("<body><h1>" + msg + "</h1></body>");
})
app.use((req,res)=>{
    res.status(404).send(`Page Not Found`);
})
const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});