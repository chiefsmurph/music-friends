var TableInterface = require('../johnsutils/TableInterface');
var EscapeTicksInArrOfObjs = require('../johnsutils/EscapeTicksInArrOfObjs');
var shortid = require('shortid');
var uniqid = require('uniqid');

var Playlists = new TableInterface('playlists', {
  tableid: ['serial', 'primary key'],
  playlistid: ['varchar(20)', 'not null'],
  title: ['varchar(70)', 'not null'],
  key: ['varchar(20)', 'not null'],
  tracks: ['json'],
  requestcount: ['integer', 'DEFAULT 0']
}, function() {
  this.getAll = (cb) => {
    return this.select({}, cb);
  };
  this.getPlaylist = (id, cb) => {
    return this.select({
      where: {
        playlistid: id,
      }
    }, (res) => {
      if (!res) return cb(null);
      res = res[0];
      console.log('found', res);
      if (res && res.tracks) {
        res.tracks = res.tracks.map(EscapeTicksInArrOfObjs.decodeObj);
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
    tracks = tracks.map(EscapeTicksInArrOfObjs.encodeObj);

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
  this.incrementRequestCount = (playlistid, cb) => {
    console.log('incrementing ' + playlistid);
    return this.update({
      data: {
        requestcount: 'requestcount + 1'
      },
      where: {
        playlistid
      }
    }, res => {
      console.log('res', JSON.stringify(res))
      return cb(!!res);
    });
  };
  this.getTopPlaylists = (cb) => {
    return this.executeQuery('SELECT * FROM playlists ORDER BY requestcount,  desc LIMIT 3', res => {
      return cb(!res.length ? [] : res.map(pl => {
        delete pl.key;
        delete pl.tableid;
        pl.trackcount = (pl.tracks && pl.tracks.length) ? pl.tracks.length : 0;
        delete pl.tracks;
        return pl;
      }));
    });
  }
});

module.exports = Playlists;
