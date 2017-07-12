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

// module
var leaderboard = require('./leaderboard');

var socketManager = (io) => (socket) => {

  var playlistsAuthed = [];

  var activePlaylist = null;
  console.log('connectionnn');

  setTimeout(() => {
    leaderboard.getLeaderboard(leaderboard => {
      socket.emit('leaderboard', leaderboard);
    });
  }, 4000);



  socket.on('initRooms', (roomArr, cb) => {
    console.log('joining ', roomArr);
    roomArr.forEach((playlistid) => {
      console.log('joining ', playlistid);
      socket.join(playlistid);
    });
  });

  socket.on('suggest', (data, cb) => {

    var query = data.suggestText;
    console.log('suggest words ' + query);

    if (query.length < 4) return;

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
      console.log('hellloooo');
      console.log(pl, 'pl');
      if (pl) {
        console.log('got playlist ' + JSON.stringify(pl));
        delete pl.key;
        activePlaylist = pl;
        // activePlaylist.
        console.log('here');
        console.log(pl);
        Playlists.incrementRequestCount(pl.playlistid, function() {
          console.log('... and incremented request count');
          cb(activePlaylist);
        });
      } else {
        cb({});
      }
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

  socket.on('downloadRequest', (song, playlistid) => {

    console.log('getting song')
    console.log(JSON.stringify(song));
    console.log();

    var forPlaylist = activePlaylist;

    Songs.getSong(song.id, (foundSong) => {
      if (foundSong) {
        console.log('already found ', foundSong);
        // increase addcount
        Songs.incrementAddCount({
          songid: foundSong.songid
        }, function() {
          // updateAndEmit(foundSong.downloadcode);
          console.log('updated database with new song')
        });

      } else {

        Songs.addSong(song, res => {
          console.log('updated song db now emit');
          console.log('added song:');
          console.log(JSON.stringify(res));
          // updateAndEmit(res.downloadcode);
          console.log('updated database with new song')
        });

      }
    });


  });

  socket.on('setTracks', (playlistid, tracks, cb) => {
    if (playlistsAuthed.indexOf(playlistid) === -1) {
      return cb('You\'ve been denied') && console.log('NON AUTHORIZED REQUEST TO CHANGE ' + playlistid);
    }
    if (activePlaylist && activePlaylist.playlistid === playlistid) {
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
  });


  // streaming
  socket.on('client-stream-request', function (downloadCode) {
    var stream = ss.createStream();
    Songs.getFilenameFromDownloadcode(downloadCode, mp3File => {
      if (!mp3File) {
        return console.log('HACKER someone trying to stream a song that doesnt exist.  downloadcode: ' + downloadCode);
      }
      var assetFolder = path.join(__dirname + '/../assets/');
      var filename = assetFolder + mp3File;
      ss(socket).emit('audio-stream', stream, { name: filename });
      if (fs.existsSync(filename)) {
        fs.createReadStream(filename).pipe(stream);
      } else {
        console.log('does not exist');
      }
    });
  });

  // keys
  socket.on('authorizeKey', (playlistid, key, cb) => {
    Playlists.authKey(playlistid, key, isValid => {
      if (isValid) {
        playlistsAuthed.push(playlistid);
      }
      cb(isValid);
    });
  });
}

module.exports = socketManager;
