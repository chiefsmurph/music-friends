var Playlists = require('./models/playlists');
var Songs = require('./models/songs');
var Fetches = require('./models/fetches');
var async = require('async');


var getLeaderboard = (mainCb) => {

  let topSongs, topPlaylists, topFetches;
  async.waterfall([
    function(cb) {
      Songs.getTopSongs(res => {
        topSongs = res;
        console.log('top songs', topSongs);
        cb();
      });
    },
    function(cb) {
      Playlists.getTopPlaylists(res => {
        topPlaylists = res;
        console.log('top pls', topPlaylists);
        cb();
      });
    },
    function(cb) {
      Fetches.getTopFetches(res => {
        topFetches = res;
        console.log('top fetches', topFetches);
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

};


module.exports = {
  broadcast: (emit) => {
    getLeaderboard(leaderboard => {
      console.log('broadcasting leaderboard');
      emit('leaderboard', leaderboard);
    });
  },
  getLeaderboard: getLeaderboard
};
