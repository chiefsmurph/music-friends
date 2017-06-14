var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET users listing. */
router.get('/song/:song_file', function(req, res, next) {
  path = 'assets/' + req.params.song_file;
  fs.exists(path, function(exists) {
      if (exists) {
        res.download(path);
      } else {
        res.send("That file doesn't exist.  Stop yanking our chain.<br><a href='/'>Go Back</a>");
      }
  });
});

module.exports = router;
