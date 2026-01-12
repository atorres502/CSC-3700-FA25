const http = require('http');
const todos = [];
const newId = Date.now();
const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/' && method === 'GET') {
        res.setHeader('Content-Type', 'text/html');
        res.write("<html><body><h1>My Todo List</h1>");
        res.write("<h2>Add a New Todo:</h2>");
        res.write("<form action='/add' method='POST'>Todo: <input type='text' name='todo'> ");
        res.write("<button type='submit'> Add Todo </button>");
        res.write("</form>");
        res.write("<hr>");
        res.write("<h2>My Todos:</h2>");

        if (todos.length < 1) {
            res.write("<p>No Todos yet! Add one above.</p>");
        } else {
            res.write('<ol id="todoList">');
            todos.forEach(todo => {
                res.write(`<li>${todo.text}</li>`);
            });
            res.write('</ol>');
        }

        res.write("</body></html>");
        return res.end();
    } else if (url === '/add' && method === "POST"){
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        })
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const todoText = parsedBody.split("=")[1];
            const decodedText = decodeURIComponent(todoText.replace(/\+/g, ' '));
            todos.push({
                id: newId,
                text: decodedText,
                done: false
            })
            res.statusCode = 302;
            res.setHeader('Location', '/');
            res.end();
        });
    } else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html");
        res.write("<html><body><h2>404 - Page Not Found</h2>");
        res.write(`<p>The requested URL ${url} was not found on this server.</p>`);
        res.write('<a href="http://localhost:3000/">Back to the Homepage</a>');
        res.write("</body></html>");
        res.end();
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})