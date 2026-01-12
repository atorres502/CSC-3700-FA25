//dont need const require http with express
//actual package
const express = require('express');
//calls method to return express object, app is an express object
const app = express();

//no res.setHeader or res.end()
app.use('/hello', (req, res) =>{
    res.send("<body> ");
    res.send("<form action='/product' method='POST'>");
    res.send("<br/> <input type='text' name='book'>");
    res.send("<br/> <button type='button'>Submit</button></body>");
})
app.use('/product', (req, res) =>{
    res.send("<body> ");
    res.send("Hello");
})


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})