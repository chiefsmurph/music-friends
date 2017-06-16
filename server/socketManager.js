// actions
var queryYoutube = require('./actions/queryYoutube');
var getAudio = require('./actions/downloadYoutube').getAudio;

// helper
var updatedTracksWithDl = require('../client/utils/updatedTracksWithDl');

// npm
var path = require('path');
var ss = require('socket.io-stream');
var fs = require('fs');

// db
var Playlists = require('./models/playlists');
var Songs = require('./models/songs');

var socketManager = (io) => (socket) => {

  var activePlaylist = null;
  console.log('connectionnn');

  setTimeout(() => {
    socket.emit('download Link', 'party time');
    var py = 'r12cxSCGZ';
    io.sockets.to(py).emit('downloadLink', 'psecond arty time');
  }, 4000);



  socket.on('initRooms', (roomArr, cb) => {
    console.log('joining ', roomArr);
    roomArr.forEach((playlistid) => {
      console.log('joining ', playlistid);
      socket.join(playlistid);
    });

    setTimeout(() => {
      io.sockets.to('r12cxSCGZ').emit('downloadLink', 'cats');
    }, 1000);
  });

  socket.on('suggest', (data, cb) => {

    var query = data.suggestText;
    console.log('suggest words ' + query);

    if (query.length < 5) return;

    queryYoutube(query)
      .then(allVideos => {
        cb(allVideos);
      })
      .catch(err => {
        cb(err);
      });

  });

  socket.on('getPlaylist', (data, cb) => {
    console.log('getting ' + data.id);
    Playlists.getPlaylist(data.id, (pl) => {
      activePlaylist = pl;
      // activePlaylist.
      cb(activePlaylist);
      console.log('got playlist ' + JSON.stringify(pl));
    });
  });

  socket.on('newPlaylist', ({ title }, cb) => {
    console.log('creating ' + title);
    Playlists.createPlaylist(title, (pl) => {
      console.log('created ', pl, pl.playlistid);
      socket.join(pl.playlistid);
      cb(pl);
    });
  });

  socket.on('requestDownload', (song, playlistid) => {

    console.log('getting song')
    console.log(JSON.stringify(song));
    console.log();

    var forPlaylist = activePlaylist;
    var updateAndEmit = (dlLink) => {

      console.log('now updating database with download url');
      console.log(JSON.stringify(forPlaylist));

      var dlObj = {
        playlistid,
        song,
        dl: dlLink
      };
      console.log(dlObj);
      setTracks(
        forPlaylist.playlistid,
        updatedTracksWithDl(forPlaylist.tracks, dlObj, (val) => val.replace(/'/g, "''")),
        (err, res) => {
          console.log('error: ' + err);
          console.log('downloaded' + dlLink + ' emitting to ' + playlistid);
          io.sockets.to(playlistid).emit('downloadLink', 'finished');
          var obj = {
            forPlaylist,
            activePlaylist
          };
          io.sockets.to(playlistid).emit('downloadLink', dlObj);
        }
      );
    };

    Songs.getSong(song.id, (foundSong) => {
      if (foundSong) {
        console.log('already found ', foundSong, foundSong.downloadlink);
        updateAndEmit(foundSong.downloadlink);
      } else {

        getAudio(song.url, song.title)
          .then(dlLink => {

              console.log('after getting song now updating db')
              song.downloadLink = dlLink;
              Songs.addSong(song, res => {
                console.log('updated song db now emit');
                updateAndEmit(dlLink);
              });

          })
          .catch(err => {
            console.log(err);
            io.sockets.to(playlistid).emit('downloadError', {
              song,
              err
            });
          });
      }
    });


  });

  var setTracks = (playlistid, tracks, cb) => {
    if (activePlaylist.playlistid === playlistid) {
      activePlaylist.tracks = tracks;
    }
    console.log('setting tracks, playlistid' + playlistid, tracks);
    Playlists.updateTracks(playlistid, tracks, (response) => {
      console.log('now response ' + JSON.stringify(response));
      io.to(playlistid).emit('tracksUpdate', playlistid, response);
      console.log('here')
      if (!response) return cb('error updating database');
      return cb(null, response);
    });
  };

  socket.on('setTracks', setTracks);


  socket.on('client-stream-request', function (mp3File) {
    var stream = ss.createStream();
    var assetFolder = path.join(__dirname + '/../assets/');
    var filename = assetFolder + mp3File;
    console.log('stremaing ' + filename)
    ss(socket).emit('audio-stream', stream, { name: filename });
    if (fs.existsSync(filename)) {
      fs.createReadStream(filename).pipe(stream);
    } else {
      console.log('does not exist');
    }
  });

}

module.exports = socketManager;
