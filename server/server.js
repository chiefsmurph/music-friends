var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');

var dl = require('./routes/dl');

var socketManager = require('./socketManager');

var Playlists = require('./models/playlists');
var Songs = require('./models/songs');

var port = process.env.PORT || 2222;
console.log(process.env.DATABASE_URL);

Playlists.getAll((pls) => {
  console.log(pls);
});

server.listen(port);

var staticPath = path.join(__dirname + '/../client/dist/');
console.log(staticPath);
app.use(express.static(staticPath));

app.get(['/', '/playlist/:id'], function(req, res) {
    res.header('Cache-Control', "max-age=60, must-revalidate, private");
    res.sendFile( staticPath + 'index.html' );
});

app.use('/dl/', dl);

io.on('connection', socketManager(io));
