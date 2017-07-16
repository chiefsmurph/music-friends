//https://www.last.fm/search/albums?q=mac+demarco+another+one

var makeRequestWithCheerio = window.makeRequestWithCheerio;

var getFirstAlbumUrl = (query) => {

  return new Promise((resolve, reject) => {
      console.log('reqing ', `https://www.last.fm/search/albums?q=${query}`);
      makeRequestWithCheerio(`https://www.last.fm/search/albums?q=${query}`)
        .then($ => {
          var firstLink = $('.js-link-block-cover-link')[0];
          console.log('firstlink', firstLink, $(firstLink).attr('href'), $('.js-link-block-cover-link').length);
          resolve('https://www.last.fm' + $(firstLink).attr('href'));
        });

  });

}

var getAllTracksFromLastFmAlbum = (url) => {

  return new Promise((resolve, reject) => {
      console.log('reqing ', url);
      makeRequestWithCheerio(url)
        .then($ => {
          var trackNames = [];
          $('.chartlist-name .chartlist-ellipsis-wrap a').each((i, el) => {
            console.log(el);
            trackNames.push($(el).text());
          });
          console.log(trackNames);
          resolve(trackNames);
        });

  });

}




function getAlbumTracks(album) {
  return getAllTracksFromLastFmAlbum(album.url);
}

window.getAlbumTracks = getAlbumTracks;


window.getAlbumsByArtist = function(artist) {

    return new Promise((resolve, reject) => {
        console.log('reqing ', `https://www.last.fm/music/${artist.trim()}/+albums`);
        makeRequestWithCheerio(`https://www.last.fm/music/${artist.trim()}/+albums`)
          .then($ => {
            const results = [];
            $('.album-grid-item').each((i, el) => {
              const $el = $(el);
              results.push({
                title: $el.find('h3').text().trim(),
                url: 'https://www.last.fm' + $el.find('h3 a').attr('href'),
                thumbnail: $el.find('img').attr('src'),
                auxtext: $el.find('.album-grid-item-aux-text').text().trim().replace(/\W/g, ' ')
              });
            });
            resolve({
              albums: results,
              artist: $('.header-title a').text()
            });
          });

    });

};



window.getSimilarArtists = function(artist) {

      return new Promise((resolve, reject) => {
          console.log('reqing ', `https://www.last.fm/music/${artist.trim()}/+albums`);
          makeRequestWithCheerio(`https://www.last.fm/music/${artist.trim()}/+albums`)
            .then($ => {
              const results = [];
              $('.album-grid-item').each((i, el) => {
                const $el = $(el);
                results.push({
                  title: $el.find('h3').text().trim(),
                  url: 'https://www.last.fm' + $el.find('h3 a').attr('href'),
                  thumbnail: $el.find('img').attr('src'),
                  auxtext: $el.find('.album-grid-item-aux-text').text().trim().replace(/\W/g, ' ')
                });
              });
              resolve({
                albums: results,
                artist: $('.header-title a').text()
              });
            });

      });
};
