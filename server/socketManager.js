var queryYoutube = require('./actions/queryYoutube');
var getAudio = require('./actions/downloadYoutube').getAudio;
var Playlists = require('./models/playlists');
var updatedTracksWithDl = require('../client/utils/updatedTracksWithDl');

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
      cb(pl[0]);
      activePlaylist = pl[0];
      console.log('got playlist ' + JSON.stringify(pl[0]));
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

    var forPlaylist = activePlaylist;
    getAudio(song.url, song.title)
      .then(dlLink => {

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
          updatedTracksWithDl(forPlaylist.tracks, dlObj),
          (err, res) => {
            console.log('error: ' + err);
            console.log('downloaded' + dlLink + ' emitting to ' + playlistid);
            io.sockets.to(playlistid).emit('downloadLink', 'finished');
            var obj = {
              forPlaylist,
              activePlaylist
            };
            io.sockets.to(playlistid).emit('downloadLink', dlObj);

          });
      })
      .catch(err => {
        console.log(err);
      });
  });

  var setTracks = (playlistid, tracks, cb) => {
    activePlaylist.tracks = tracks;
    console.log('setting tracks, playlistid' + playlistid, tracks);
    Playlists.updateTracks(playlistid, tracks, (response) => {
      console.log('now response ' + JSON.stringify(response));
      io.to(playlistid).emit('tracksUpdate', playlistid, response);
      if (!response) return cb('error updating database');
      return cb(null, response);
    });
  };

  socket.on('setTracks', setTracks);

}

module.exports = socketManager;
