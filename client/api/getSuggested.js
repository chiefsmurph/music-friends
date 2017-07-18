var rr = (what) => require('electron').remote.require(what);

var async = rr('async');

window.getRelatedYoutubeVidsFromReddit = (artist) => {
    return new Promise((resolve, reject) => {

      window.makeRequestWithCheerio('https://www.reddit.com/r/ifyoulikeblank/search?q=${artist}&restrict_sr=on&sort=relevance&t=all')
        .then($ => {

          var foundPosts = [];
          $('.search-title').each((i, a) => {
            foundPosts.push({
              title: $(a).text(),
              url: $(a).attr('href')
            });
          });

          if (!foundPosts.length) {
            return reject('none found on reddit');
          } else {

            async.forEachSeries(foundPosts, (post, cb) => {
              window.getAllYoutubeVideosOnPage(url)
                  .then(videos)
            });


          }


        });
    });
};


window.getSimilarArtistsToTracks = (tracks) => {


  return new Promise((resolve, reject) => {

    if (!tracks || !tracks.length) return resolve([]);
    var foundArtists = tracks
        .map(track => track.title)
        .map(trackTitle => trackTitle.substring(0, trackTitle.indexOf(' - ')))
        .filter(track => !!track);

    if (!foundArtists.length) {
      return console.log('couldnt find any artists');
    } else {
      console.log('artists', foundArtists);
    }

    var similarArtists = [];
    async.forEachSeries(foundArtists, (artist, cb) => {
      console.log('eaching ', artist, foundArtists);
      window.makeRequestWithCheerio(`https://www.last.fm/music/${artist}/+similar`)
        .then($ => {
          $('.big-artist-list-title a').each((i, el) => {
            similarArtists.push($(el).text());
          });
          console.log('similar to', artist);
          console.log(similarArtists);
          setTimeout(function() {
            cb();
          }, 1000);
        });

    }, function(end) {
      console.log('ending foreachseries')
      console.log(similarArtists);
      console.log(end);
      console.log(arguments);
      resolve(similarArtists);
    });





  });
};

Array.prototype.getRandom = function(num, cut) {
    var A = cut ? this : this.slice(0);
    A.sort(function() {
        return .5 - Math.random();
    });
    return A.splice(0, num);
};

window.getOnlyTracksFromArtist = (artist) => {
  console.log('searching for ', artist);
  return new Promise((resolve, reject) => {
    window.queryYoutube(artist, videos => {

        var vids = videos.splice(0);


        var vidsThatAreSongs = [];

        var i = 0;
        while (vids[i]) {
          var vid = vids[i];
          if (vid.title.indexOf(artist + ' - ') !== -1 && !vid.title.match(/album/i) && !vid.title.match(/live/i)) {
            // include " - " but not "album stream" or "full album" or "live"
            vidsThatAreSongs.push(vid);
          }
          i++;
        }
        setTimeout(function() {
          console.log('RESOLVING NOW')
          resolve(vidsThatAreSongs);
        }, 1000);

      });
  });
};

window.getSuggestedSongs = (tracks) => {
  console.log('getting suggested songs');
  console.log(JSON.stringify(tracks));
  //
  // makeRequestWithCheerio(`https://www.last.fm/search/albums?q=${query}`)

  return new Promise((resolve, reject) => {


  });
};
