
var fs = require('fs');
var ytdl = require('youtube-dl');
var spawn = require('child_process').spawn
var path = require('path');

var logspawn = function(spawn) {

  // Let's echo the output of the child to see what's going on
  spawn.stdout.on('data', function(data) {
    console.log(data.toString());
  });

  // Incase something bad happens, we should write that out too.
  spawn.stderr.on('data', function(data) {
    console.error(data.toString());
  });
}

var assetFolder = path.join(__dirname + '/../assets');

if (!fs.existsSync(assetFolder)){
  fs.mkdirSync(assetFolder);
}

var getAudio = function(url, title) {

  return new Promise((resolve, reject) => {

      youtube_dl = spawn('youtube-dl', [
        '--output',
        'assets/%(title)s.%(ext)s',
        '--extract-audio',
        '--audio-format',
        'mp3',
        '--audio-quality=320k',
        url
      ]);

      logspawn(youtube_dl);

      // Let's echo the output of the child to see what's going on
      // youtube_dl.stdout.on('data', function(data) {
      //   console.log(data.toString());
        // outputServer.broadcast(data.toString());
      // });

      // Incase something bad happens, we should write that out too.
      // youtube_dl.stderr.on('data', function(data) {
      //   console.error(data.toString());
        // outputServer.broadcast(data.toString());
      // });

      youtube_dl.on('exit', () => {
        resolve('/dl/song/' + title + '.mp3');
      });

  });

};

module.exports = {
  getAudio
};
