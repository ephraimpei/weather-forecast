const express = require('express');
const http = require('http');

const app = express();

app.use(express.static(__dirname + '/static'));

require('./config/routes.js')(app);

// connect to MongoDB - test
require('./db/local_mongodb_connection.js');

// set up server
const server = http.createServer(app);
const port = process.env.PORT || 3000;

server.listen(port);

console.log("listening on port " + port);
