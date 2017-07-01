var express = require('express');
var router = express.Router();
var fs = require('fs');
var Songs = require('../models/songs');

/* GET users listing. */
router.get('/song/:download_code', function(req, res, next) {
  var downloadCode = req.params.download_code;
  Songs.getFilenameFromDownloadcode(downloadCode, filename => {
    if (!filename) {
      return res.send("There is no song with that download code.");
    }
    console.log('found filename: ' + filename);
    path = 'assets/' + filename;
    fs.exists(path, function(exists) {
        if (!exists) {
          return res.send("That file doesn't exist.  Stop yanking our chain.<br><a href='/'>Go Back</a>");
        }
        res.download(path);
        Songs.incrementDownloadCount({
          downloadcode: downloadCode
        }, res => {
          if (res) {
            console.log('successfully incremented donwload count');
          } else {
            console.log('error incrementing donwload cont')
          }
        })
    });
  });

});

module.exports = router;
