

var fs = require('fs');
// var ytdl = require('youtube-dl');
var spawn = require('child_process').spawn

var path = require('path');

// const {app} = require('electron')


var getAudio = function(url, folder) {

  var assetFolder = window.assetsFolder;
  console.log('here now ', assetFolder);
  if (!fs.existsSync(assetFolder)){
    fs.mkdirSync(assetFolder);
  }

  if (folder && !fs.existsSync(assetFolder + '/' + folder)) {
    fs.mkdirSync(assetFolder + '/' + folder);
  }

  console.log('getting audio', url);

  var songFileName = null;
  var error = [];
  var logspawn = function(spawn) {

    // Let's echo the output of the child to see what's going on
    spawn.stdout.on('data', function(data) {
      var message = data.toString();
      console.log(message);
      if (message.indexOf('[ffmpeg] Destination:') !== -1) {
        songFileName = message.trim().substring(29);
        songFileName = songFileName.split('/');
        songFileName = songFileName[songFileName.length - 1];
        console.log('got song title', songFileName, message)
      }
    });

    // Incase something bad happens, we should write that out too.
    spawn.stderr.on('data', function(data) {
      console.error(data.toString());
      error.push(data.toString());
    });
  }

  return new Promise((resolve, reject) => {

      if (url.indexOf('&list=') !== -1) {
        return reject('no playlists allowed');
      }

      // not in use
      var pathToYtdl = path.join(window.appPath, '../app.asar.unpacked/node_modules/youtube-dl/bin/youtube-dl');
      var pathToFFmpegDir = path.join(window.appPath, '../node_modules/ffmpeg-binaries/bin');
      console.log('ytdl: ' + pathToYtdl, __dirname);
      console.log('ffmpeg: ', pathToFFmpegDir);

      youtube_dl = spawn(pathToYtdl, [
        '--output',
        assetFolder + (folder ? '/' + folder : '') + '/%(title)s.%(ext)s',
        '--extract-audio',
        '--audio-format',
        'mp3',
        '--audio-quality=320k',
        '--ffmpeg-location',
        pathToFFmpegDir,
        url
      ]);
      // logspawn(spawn("pwd"));
      // logspawn(spawn("ls"));
      // console.log('dirname', __dirname);
      // console.log(window.appPath);

      // var nodeModulesPath = path.join(window.appPath, '../app.asar.unpacked/node_modules/youtube-dl');
      // console.log(nodeModulesPath, 'nodeModulesPath');
      // logspawn(spawn("ls", [nodeModulesPath]));
      logspawn(youtube_dl);


      youtube_dl.on('exit', () => {
        console.log('exit dl', songFileName);
        if (songFileName) {
          resolve((folder ? folder + '/' : '') + songFileName);
        } else {
          reject(error.join(', '));
        }
      });

  });

};

console.log('get audio set')
window.getAudio = getAudio;
