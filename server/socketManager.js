var queryYoutube = require('./actions/queryYoutube');
var Playlists = require('./models/playlists');

var socketManager = (socket) => {

  console.log('connectionnn');

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
      console.log('got playlist ' + JSON.stringify(pl[0]));
    });
  });

  socket.on('newPlaylist', ({ title }, cb) => {
    console.log('creating ' + title);
    Playlists.createPlaylist(title, (pl) => {
      console.log('created ' + pl);
      cb(pl);
    });
  });

  socket.on('setTracks', (playlistid, tracks, cb) => {
    console.log('setting tracks, playlistid' + playlistid, tracks);
    Playlists.updateTracks(playlistid, tracks, (response) => {
      console.log('now response ' + JSON.stringify(response));
      if (!response) return cb('error adding track');
      return cb(null, response);
    });
  });

}

module.exports = socketManager;
