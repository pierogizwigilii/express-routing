const express = require('express');
const morgan = require('morgan');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(express.json()); //when server receives requests with json formatted data, this middleware function (has access to req and res and next middleware fdunction if applicable) will parse the json data into javascript properties of the request object 
//.all routing method, a catch all method - goes to this first, then goes to specific request eg app.get if it's a get request, app.post if its post request
app.all('/campsites', (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
});
//handling get request
app.get('/campsites', (req, res) => {
    res.end('Will send all the campsites to you'); //callback function
});
//handling post request
app.post('/campsites', (req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
});

app.put('/campsites', (req, res) => {
    res.statusCode = 403; //operation not supported code
    res.end('PUT operation not supported on /campsites');
});

app.delete('/campsites', (req, res) => {
    res.end('Deleting all campsites');
});

app.get('/campsites/:campsiteId', (req, res) => { //different routing path for campsiteId - get request for this path
    res.end(`Will send details of the campsite: ${req.params.campsiteId} to you`);
});

app.post('/campsites/:campsiteId', (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
});

app.put('/campsites/:campsiteId', (req, res) => {
    res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
    res.end(`Will update the campsite: ${req.body.name}
        with description: ${req.body.description}`);
});

app.delete('/campsites/:campsiteId', (req, res) => {
    res.end(`Deleting campsite: ${req.params.campsiteId}`);
});

app.use(express.static(__dirname + '/public')); //dirname is a special variable in node, refers to absolute path of current directory of the file it is in - server is now able to access the index.html static file in the public folder and it will show this on the localhost 3000 link 
//use callback function in app.use which Express calls a middleware function - this access to 3 parameters - req (request object), res (response object) and next (a function but not used here)
app.use((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});