function bodyParser(req, callback) {
    const body = [];
    req.on('data', (chunk) => {
        body.push( chunk );
    });
    req.on('end', () => {
        const parsedBody = Buffer.concat(body).toString();
        callback(null, parsedBody);
    });
    req.on('error', (err) => {
        const parsedBody = Buffer.concat(body).toString();
        callback(err, null);
    });
}
module.exports = bodyParser;