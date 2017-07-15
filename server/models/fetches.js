var TableInterface = require('../johnsutils/TableInterface');
var EscapeTicksInArrOfObjs = require('../johnsutils/EscapeTicksInArrOfObjs');
var shortid = require('shortid');
var uniqid = require('uniqid');

var Fetches = new TableInterface('fetches', {
  tableid: ['serial', 'primary key'],
  fetchid: ['varchar(20)', 'not null'],
  artist: ['varchar(70)', 'not null'],
  release: ['varchar(70)', 'not null'],
  fetchcount: ['integer', 'DEFAULT 1']
}, function() {
  this.getAll = (cb) => {
    return this.select({}, cb);
  };
  this.checkIfExists = (artist, release, cb) => {
    return this.select({
      where: {
        artist,
        release
      }
    }, (res) => {
      if (!res) return cb(null);
      res = res[0];
      return cb(res || {});
    });
  };
  this.createFetch = (artist, release, cb) => {
    return this.insert({
      artist,
      release,
      fetchid: shortid.generate()
    }, (fetch) => {
      console.log('created ', fetch);
      cb(fetch);
    });
  };
  this.incrementFetchCount = (fetchid, cb) => {
    console.log('incrementing ' + playlistid);
    return this.update({
      data: {
        fetchcount: 'fetchcount + 1'
      },
      where: {
        fetchid
      }
    }, res => {
      console.log('res', JSON.stringify(res))
      return cb && cb(!!res);
    });
  };
  this.getTopFetches = (cb) => {
    return this.executeQuery('SELECT * FROM fetches ORDER BY fetchcount desc LIMIT 3', res => {
      return cb(res.map(fetch => {
        delete fetch.tableid;
        return fetch;
      }));
    });
  }
});

module.exports = Playlists;
