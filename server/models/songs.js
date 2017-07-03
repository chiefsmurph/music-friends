var TableInterface = require('../johnsutils/TableInterface');
var shortid = require('shortid');

var Songs = new TableInterface('songs', {
  tableid: ['serial', 'primary key'],
  songid: ['varchar(20)', 'not null'],
  title: ['varchar(170)', 'not null'],
  url: ['varchar(170)', 'not null'],
  thumbnail: ['varchar(370)', 'not null'],
  filename: ['varchar(200)'],
  downloadcode: ['varchar(200)'],
  downloadcount: ['integer', 'DEFAULT 0'],
  addcount: ['integer', 'DEFAULT 1']
}, function() {
  this.getSong = (id, cb) => {
    console.log('getting id', id);
    return this.select({
      where: {
        songid: id,
      }
    }, (res) => {
      console.log('get song found ', res);
      console.log('found', res[0] || null);
      cb(res[0] || null);
    });
  };
  this.addSong = ({ id, url, title, thumbnail, filename }, cb) => {
    console.log('adding')
    console.log(id, url, title, thumbnail, filename);
    return this.insert({
      songid: id,
      url,
      title,
      thumbnail,
      filename,
      downloadcode: shortid.generate()
    }, (playlist) => {
      console.log('created ', playlist);
      cb(playlist);
    });
  };
  this.getFilenameFromDownloadcode = (downloadCode, cb) => {
    return this.select({
      where: {
        downloadcode: downloadCode
      }
    }, (res) => {
      var foundSong = res[0] || null;
      return cb( (foundSong) ? res[0].filename : null )
    });
  };
  this.incrementDownloadCount = (where, cb) => {
    return this.update({
      data: {
        downloadcount: 'downloadcount + 1'
      },
      where
    }, res => {
      console.log('res', JSON.stringify(res))
      return cb(!!res);
    });
  };
  this.incrementAddCount = (where, cb) => {
    return this.update({
      data: {
        addcount: 'addcount + 1'
      },
      where
    }, res => {
      console.log('res', JSON.stringify(res))
      return cb(!!res);
    });
  };
  this.getTopSongs = (cb) => this.executeQuery('SELECT * FROM songs ORDER BY addcount desc LIMIT 3', cb);
});

module.exports = Songs;
