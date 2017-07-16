var Playlists = require('./models/playlists');
var Songs = require('./models/songs');
var Fetches = require('./models/fetches');
var async = require('async');

module.exports = {
  getLeaderboard: (mainCb) => {

    let topSongs, topPlaylists, topFetches;
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
        Fetches.getTopFetches(res => {
          topFetches = res;
          cb();
        })
      },
      function(cb) {
        mainCb({
          topSongs,
          topPlaylists,
          topFetches
        });
      }
    ]);

  }
}
