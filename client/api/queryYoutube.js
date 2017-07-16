var makeRequestWithCheerio = window.makeRequestWithCheerio;

window.queryYoutube = (query, cb) => {
  //
  // return new Promise((resolve, reject) => {
      console.log('reqing ', `https://www.youtube.com/results?search_query=${query}`);

      var parseURL = (url) => (url.indexOf('ytimg') === -1) ? 'http://youtube.com' + url : url;
      var getThumbnail = ($el) => ($el.attr('src').indexOf('ytimg') === -1) ? $el.attr('data-thumb') : $el.attr('src');

      makeRequestWithCheerio(`https://www.youtube.com/results?search_query=${query}`)
        .then($ => {

          var allVids = [];

          $('.yt-uix-tile').each((i, el) => {
            var $el = $(el);
            var thumbnail = getThumbnail($el.find('.yt-lockup-thumbnail img'));
            var url = parseURL($el.find('.yt-uix-tile-link').attr('href'));
            if (thumbnail && url && url.indexOf('&list=') === -1 && thumbnail.indexOf('hqdefault') !== -1) {
              var resultObj = {
                thumbnail,
                title: $el.find('.yt-uix-tile-link').text(),
                url,
                id: url.split('http://youtube.com/watch?v=')[1]
              };
              allVids.push(resultObj);
            }
          });

          setTimeout(function() {
            cb(allVids)
          }, 1000);
        });

  // });

};
