const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Cosntent-Type', 'text/html');
    res.write("<body><h2>Hello There!</h2></body>");
    res.end();
})

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})