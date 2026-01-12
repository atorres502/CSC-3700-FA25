//
const http = require('http');

//default port is 8000

//creates server so you can listen on a port
//this runs when there's a request for the server. e.g. looking up localhost:3000 in the browser
const server = http.createServer((req, res) => {
    //console.log("Server started");
    //grabs the url from the request (everything after 'localhost:3000'
    const url = req.url;
    //returns the method being used
    const method = req.method;
    // console.log("url=", url);
    // console.log("method=", method);

    //conditional you use when you wanna do something depending on what the url is
    if(url === '/about'){
        //sets the header (http header) so that the browser expects HTML
        res.setHeader('Content-Type', 'text/html');
        //lets you write html
        res.write("<h1 style='color: red;'>About Me!</h1>");
        return res.end();
    }
});

const PORT = 3000;
//takes the process, hangs it on the network port 3000 and waits for a request
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})