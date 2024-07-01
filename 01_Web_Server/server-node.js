const http = require('http')

const hostName = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.statusCode = 200
        res.setHeader('Content-type', 'text/plain')
        res.end("Hello mazza")
    }
    else if (req.url === "/mazza") {
        res.statusCode = 200
        res.setHeader('Content-type', 'text/plain')
        res.end("Thanks for ordering mazza")
    }
    else {
        res.statusCode = 404
        res.setHeader('Content-type', 'text/plain')
        res.end("404 Not Found")
    }
})

server.listen(port, hostName, () => {
    console.log(`server is listening at http://${hostName}:${port}`);
})