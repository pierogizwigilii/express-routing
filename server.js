const express = require('express');
const morgan = require('morgan');
const campsiteRouter = require('./routes/campsiteRouter');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(express.json()); //when server receives requests with json formatted data, this middleware function (has access to req and res and next middleware fdunction if applicable) will parse the json data into javascript properties of the request object 

app.use('/campsites', campsiteRouter); //uses the routing in campsiteRouter module/file

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