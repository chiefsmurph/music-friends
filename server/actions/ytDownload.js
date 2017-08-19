var path = require('path');
var fs   = require('fs');
var ytdl = require('youtube-dl');

module.exports = function(url, title) {

    return new Promise((resolve, reject) => {

      var video = ytdl(url,
        // Optional arguments passed to youtube-dl.
        ['-f', '22']);


      var size = 0;
      var filename;
      video.on('info', function(info) {
        size = info.size;
        console.log('Got video info' + JSON.stringify(info));
        filename = info._filename.replace(/[^\w\s]/gi, '');
        var output = path.join(__dirname, '../assets/' + filename);
        console.log('saving to ' + output);
        video.pipe(fs.createWriteStream(output));
      });

      var pos = 0;
      video.on('data', function(data) {
        pos += data.length;
        // `size` should not be 0 here.
        if (size) {
          var percent = (pos / size * 100).toFixed(2);
          process.stdout.cursorTo(0);
          process.stdout.clearLine(1);
          process.stdout.write(percent + '%');
        }
      });

      video.on('end', function() {
        console.log('end');
        resolve(filename);
      });

    });


};
