var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');

var socketManager = require('./socketManager');

var Playlists = require('./models/playlists');

Playlists.getAll((pls) => {
  console.log(pls);
});

server.listen(8320);

var staticPath = path.join(__dirname + '/../client/dist/');
console.log(staticPath);
app.use(express.static(staticPath));

app.get(['/', '/playlist/:id'], function(req, res) {
    res.header('Cache-Control', "max-age=60, must-revalidate, private");
    res.sendFile( staticPath + 'index.html' );
});

io.on('connection', socketManager);