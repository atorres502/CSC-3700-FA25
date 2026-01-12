const express = require("express");
const app = express();
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const path = require("path");
app.use(express.static(path.join(__dirname, 'public')));  // add middleware
app.use(express.urlencoded({extended: false}));  // modern middleWare for bodyParser

app.use( shopRoutes );  // look to shopRoutes
app.use( adminRoutes.routes );  //adminRoutes exports two things, so you have to specify what youre getting
app.use( (req, res, next) => {
     res.status(404).send("<h2> Request is not Found</h2>" );
})
let port = 3001;
app.listen(port, () => {
     console.log(`Listening on http://localhost:${port}`);
});
