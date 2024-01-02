const express = require('express');

const hostname = 'localhost';
const port = 3000;

const app = express();
//use callback function in app.use which Express calls a middleware function - this access to 3 parameters - req (request object), res (response object) and next (a function but not used here)
app.use((req, res) => {
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

app.listen(port, hostname, () => {
    
});