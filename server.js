const http = require('http');
const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;

const app = express();

const index = path.join(__dirname + '/static/views/index.html');

app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res){
  res.sendFile(index);
});

const server = http.createServer(app);

server.listen(port);

console.log("listening on port " + port);
