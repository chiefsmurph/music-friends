var Playlists = require('./models/playlists');
var Songs = require('./models/songs');
var async = require('async');

module.exports = {
  getLeaderboard: (mainCb) => {

    let topSongs, topPlaylists;
    async.waterfall([
      function(cb) {
        Songs.getTopSongs(res => {
          topSongs = res;
          cb();
        });
      },
      function(cb) {
        Playlists.getTopPlaylists(res => {
          topPlaylists = res;
          cb();
        });
      },
      function(cb) {
        mainCb({
          topSongs,
          topPlaylists
        });
      }
    ]);

  }
}
