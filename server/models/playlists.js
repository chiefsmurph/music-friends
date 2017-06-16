var TableInterface = require('../johnsutils/TableInterface');
var EscapeTicksInArrOfObjs = require('../johnsutils/EscapeTicksInArrOfObjs');
var shortid = require('shortid');
var uniqid = require('uniqid');

var Playlists = new TableInterface('playlists', {
  tableid: ['serial', 'primary key'],
  playlistid: ['varchar(20)', 'not null'],
  title: ['varchar(70)', 'not null'],
  key: ['varchar(20)', 'not null'],
  tracks: ['json']
}, function() {
  this.getAll = (cb) => {
    return this.select({}, (res) => {
      cb(res);
    });
  };
  this.getPlaylist = (id, cb) => {
    return this.select({
      where: {
        playlistid: id,
      }
    }, (res) => {
      res = res[0];
      console.log('found', res);
      if (res && res.tracks) {
        res.tracks = EscapeTicksInArrOfObjs.decode(res.tracks);
      }
      return cb(res || {});
    });
  };
  this.createPlaylist = (title, cb) => {
    var key = uniqid();
    return this.insert({
      title,
      playlistid: shortid.generate(),
      key
    }, (playlist) => {
      console.log('created ', playlist);
      cb(playlist);
    });
  };
  this.authKey = (playlistid, key, cb) => {
    return this.select({
      where: {
        playlistid,
        key
      }
    }, res => {
      var authed = res && res.length;
      return cb(authed);
    })
  };
  this.updateTracks = (playlistid, tracks, cb) => {

    console.log(JSON.stringify(tracks));
    tracks = EscapeTicksInArrOfObjs.encode(tracks);

    console.log('updating tracks for ' + playlistid);
    console.log('tracks' + JSON.stringify(tracks));
    console.log('');
    return this.update({
      data: {
        tracks: '\'' + JSON.stringify(tracks) + '\''
      },
      where: {
        playlistid
      }
    }, (response) => {
      console.log(response[0].tracks);
      cb(response[0].tracks)
    });
  };
});

module.exports = Playlists;
