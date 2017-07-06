//https://www.last.fm/search/albums?q=mac+demarco+another+one


var request = require('request');
request = request.defaults({jar: true});

var cheerio = require('cheerio');

var makeRequestWithCheerio = (url, cb) => {

    return new Promise((resolve, reject) => {

        var options = {
            url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.6; rv:1.9.2.16) Gecko/20110319 Firefox/3.6.16'
            }
        };

        request(options, function (err, res, body) {
            if (err) return reject(err);
            var $ = cheerio.load(body);
            resolve($);
        });

    });

};

function getFirstAlbumUrl (query) {

  return new Promise((resolve, reject) => {

      makeRequestWithCheerio(`https://www.last.fm/search/albums?q=${query}`)
        .then($ => {
          var firstLink = $('.js-link-block-cover-link')[0].href;
          console.log('firstlink', firstLink);
          resolve(firstLink);
        });

  });

}


function getAlbumTracks(query) {
  getFirstAlbumUrl.then(url => {
    console.log('first album url', url);
  });
}

window.getAlbumTracks = getAlbumTracks;
