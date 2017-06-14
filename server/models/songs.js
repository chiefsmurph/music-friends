var TableInterface = require('../johnsutils/TableInterface');
var shortid = require('shortid');

var Songs = new TableInterface('songs', {
  tableid: ['serial', 'primary key'],
  songid: ['varchar(20)', 'not null'],
  title: ['varchar(70)', 'not null'],
  thumbnail: ['varchar(70)', 'not null'],
  downloadLink: ['varchar(70)']
}, function() {
  this.getSong = (id, cb) => {
    return this.select({
      where: {
        songid: id,
      }
    }, (res) => {
      console.log('found', res);
      cb(res);
    });
  };
  this.createSong = ({ songid, title, thumbnail }, cb) => {
    return this.insert({
      songid,
      title,
      thumbnail
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
