function bodyParserForAwait(req) {
    //instead of using callback as param, you use await/Promise
    return new Promise((resolve, reject) => {
        const body = [];
        req.on('data', (chunk) => {
            body.push( chunk );
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            resolve(parsedBody);
        });
        req.on('error', (err) => {
            const parsedBody = Buffer.concat(body).toString();
            reject(err);
        });
    });
}
module.exports = bodyParserForAwait;