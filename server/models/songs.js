var TableInterface = require('../johnsutils/TableInterface');
var shortid = require('shortid');

var Songs = new TableInterface('songs', {
  tableid: ['serial', 'primary key'],
  songid: ['varchar(20)', 'not null'],
  title: ['varchar(170)', 'not null'],
  url: ['varchar(170)', 'not null'],
  thumbnail: ['varchar(370)', 'not null'],
  downloadLink: ['varchar(200)']
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
  this.addSong = ({ id, url, title, thumbnail, downloadLink }, cb) => {
    console.log('adding')
    console.log(id, url, title, thumbnail, downloadLink);
    return this.insert({
      songid: id,
      url,
      title,
      thumbnail,
      downloadLink
    }, (playlist) => {
      console.log('created ', playlist);
      cb(playlist);
    });
  };
  this.addDownloadLink = (id, dlLink, cb) => {
    return this.update({
      data: {
        downloadLink: dlLink
      },
      where: {
        songid: id
      }
    }, (response) => {
      console.log(response[0].tracks);
      cb(response[0].tracks)
    });
  };
});

module.exports = Songs;
