const express = require('express');
const app = express();
//middleware, something you run for every request that comes in/ for authentication
app.use((req,res,next)=>{
    console.log("Middle1");
    next();
})
app.use((req,res,next)=>{
    console.log("Middle2");
    next();
})
app.use((req,res,next)=>{
    console.log("Middle3");
    res.send("Made it this far");
})
app.use((req,res)=>{
    res.status(404).send(`Page Not Found`);
})
const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});