//
const http = require('http');

//default port is 8000

//creates server so you can listen on a port
//this runs when there's a request for the server. e.g. looking up localhost:3000 in the browser
const server = http.createServer((req, res) => {
    //console.log("Server started");
    //grabs the url from the request (everything after 'localhost:3000'
    const url = req.url;
    const method = req.method;
    //conditional you use when you wanna do something depending on what the url is
    if(url === '/about'){
        //sets the header (http header) so that the browser expects HTML
        res.setHeader('Content-Type', 'text/html');
        //lets you write html
        res.write("<h1 style='color: red;'>About Me!</h1>");
        return res.end();
    } else if (url === '/form'){
        res.setHeader('Content-Type', 'text/html');
        res.write("<html><body> <h2> My Input Form </h2>");
        res.write("<form action='/message' method='POST'> Name!: <input type='text' name='message'> ");
        res.write("<br/> <button type='submit'> Send Data </button>");
        res.write("</form>");
        res.write("</body></html>");
        return res.end();
    } else if (url === '/message' && method === "POST"){
        console.log("we made it");
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        })
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            //console.log("PARSE->", parsedBody);
            res.setHeader('Content-Type', 'text/html');
            res.write("<html><body>");
                res.write("<h2>Message</h2>");
                //splits the string returned as parsedBody and splits it at the '=' character.
                //and grabs the second element from the array that's created
                const justMsg = parsedBody.split("=")[1];
                res.write(justMsg);
            res.write("</body></html>");
        });
    } else {
        res.setHeader("Content-Type", "text/html");
        res.write("<html><body><h2>Unknown URL</h2>");
        res.write("</body></html>");
        res.end();
    }
});

const PORT = 3000;
//takes the process, hangs it on the network port 3000 and waits for a request
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})