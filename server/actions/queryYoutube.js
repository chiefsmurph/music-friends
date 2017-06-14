var request = require('request');
request = request.defaults({jar: true});

var cheerio = require('cheerio');

function queryYoutube (query) {

  return new Promise((resolve, reject) => {

      var parseURL = (url) => (url.indexOf('ytimg') === -1) ? 'http://youtube.com' + url : url;
      var getThumbnail = ($el) => ($el.attr('src').indexOf('ytimg') === -1) ? $el.attr('data-thumb') : $el.attr('src');

      var allVids = [];

      var options = {
          url: `https://www.youtube.com/results?search_query=${query}`,
          headers: {
              'User-Agent': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.6; rv:1.9.2.16) Gecko/20110319 Firefox/3.6.16'
          }
      };

      request(options, function (err, res, body) {

          if (err) return reject(err);

          var $ = cheerio.load(body);

          $('.yt-uix-tile').each((i, el) => {
            var $el = $(el);
            var thumbnail = getThumbnail($el.find('.yt-lockup-thumbnail img'));
            var url = parseURL($el.find('.yt-uix-tile-link').attr('href'));
            if (thumbnail && url) {
              allVids.push({
                thumbnail,
                title: $el.find('.yt-uix-tile-link').text(),
                url,
                id: url.split('http://youtube.com/watch?v=')[1]
              });
            }
          });

          resolve(allVids);

      });

  });


}

module.exports = queryYoutube;
