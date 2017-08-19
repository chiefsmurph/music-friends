import async from 'async';

const SuggestedSongs = () => ({
  state: {
    suggestedSongs: JSON.parse(localStorage.getItem('suggestedSongs')) || {},
    suggestSongActiveCount: 0
  },
  actions: {
    incrementSuggestSongActiveCount: (state, actions) => ({
      suggestSongActiveCount: state.suggestSongActiveCount + 1
    }),
    decrementSuggestSongActiveCount: (state, actions) => ({
      suggestSongActiveCount: state.suggestSongActiveCount - 1
    }),
    refreshSuggestedSongs: (state, actions, data) => {
      actions.incrementSuggestSongActiveCount();
      window.getSimilarArtistsToTracks(state.currentPlaylist.tracks)
          .then(similarArtists => {

            console.log('random randomFive');
            var randomFive = similarArtists.getRandom(5, true);
            var returnVideos = [];
            async.forEachSeries(randomFive, (artist, cb) => {

              window.getOnlyTracksFromArtist(artist)
                  .then(trackVideos => {
                    // console.log('random 5');
                    // var randomFive = trackVideos.getRandom(5, true);
                    console.log(trackVideos);
                    console.log('that was trackvideos')
                    returnVideos = returnVideos.concat(trackVideos);
                    cb();
                  });

            }, function() {
              console.log('all');
              console.log(returnVideos);

              var vidsToReturn = returnVideos.getRandom(10, true);
              console.log('vidsToReturn', vidsToReturn);

              // resolve(returnVideos);
              actions.setSuggestedSongs(vidsToReturn);
              actions.decrementSuggestSongActiveCount();
            });

          });
    },
    setSuggestedSongs: (state, actions, videos) => {
      actions.setSuggestedForPlaylist({
        playlistid: state.currentPlaylist.playlistid,
        videos
      });
    },
    setSuggestedForPlaylist: (state, actions, data) => {
      const { playlistid, videos } = data;
      const newSuggested = Object.assign({}, state.suggestedSongs, {
        [playlistid]: videos
      });
      localStorage.setItem('suggestedSongs', JSON.stringify(newSuggested));
      console.log('suggestedSongs', newSuggested);
      return { suggestedSongs: newSuggested };
    }
  }
});

module.exports = SuggestedSongs;
