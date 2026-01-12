const http = require('http');
const bodyParserForAwait = require("./bodyParserForAwait.js");

const server = http.createServer(async (req, res) => {
    const url = req.url;
    const method = req.method;
    if ( url === '/about'){
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.write( "<html> <body>");
      res.write(" <h1 style='color:red'> Hello Human </h1>")
        res.write( "</body> </html>");
      return res.end();
    } else if ( url == '/form'){
        res.setHeader('Content-Type', 'text/html');
        res.write("<html><body> <h2> My Input Form </h2>");
        res.write("<form action='/message' method='POST'> Name!: <input type='text' name='message'> ");
        res.write("<br/> <button type='submit'> Send Data </button>");
        res.write("</form>");
        res.write("</body></html>");
        return res.end();
    } else if ( url === '/message' && method === "POST"){
        console.log("We made it");
        const body = [];
        try {
            const parsedBody = await bodyParserForAwait(req);
            res.setHeader('Content-Type', 'text/html');
            res.write("<html><body>");
            res.write("<h2> Message </h2>");
            const justmsg = parsedBody.split("=")[1];
            res.write(justmsg);
            res.write("</body></html>");
            res.end();
        } catch(error){
            if(err){
                console.error(err);
                res.setHeader('Content-Type', 'text/html');
                res.write("<html> <body>");
                res.write( "<h1>That Sucks</h1></body>");
                res.end();
            }
        }
    } else {
        res.setHeader('Content-Type', 'text/html');
        res.write("<html><body> <h2> Unknown URL!! </h2>");
        res.write("</body></html>");
        res.end();
    }

});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})