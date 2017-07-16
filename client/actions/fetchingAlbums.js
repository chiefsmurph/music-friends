module.exports = {
  setFoundAlbums: (state, actions, data) => ({
    foundAlbums: data
  }),
  setAlbumOfInterest: (state, actions, album) => ({
    albumOfInterest: Object.assign({}, album, {
      artist: state.foundAlbums.artist
    })
  }),
  setFoundTracks: (state, actions, tracks) => ({
    albumOfInterest: Object.assign({}, state.albumOfInterest, { tracks })
  }),

  // fetching happening
  initActiveFetch: (state, actions) => ({
    activeFetch: state.albumOfInterest,
    activeFetchTrackNum: -1
  }),
  beginFetch: (state, actions) => {

    state.socket.emit('newFetch', {
      artist: state.albumOfInterest.artist,
      release: state.albumOfInterest.title
    }, res => {

      actions.addPlaylist({
        fetchid: res.fetchid,
        title: res.artist + " - " + res.release
      });

      console.log('fetch good to go.');
      console.log(res);
      res.isFetch = true;
      actions.newFetch(res);

      actions.initActiveFetch();
      actions.hideModals();
      actions.startTyping();
    });
  },

  incrementFetchTrack: (state, actions) => ({
    activeFetchTrackNum: state.activeFetchTrackNum + 1
  }),
  nextTrackOfFetch: (state, actions, num) => {
    if (state.activeFetchTrackNum < state.activeFetch.tracks.length - 1) {
      actions.incrementFetchTrack();
      actions.typeInNext();
    } else {
      actions.fetchComplete();
    }
  },
  typeInNext: (state, actions) => {
    document.getElementById('songname').value = state.activeFetch.artist + ' ' + state.activeFetch.tracks[state.activeFetchTrackNum];
    actions.suggestVids();
  },
  startTyping: (state, actions) => {
    actions.nextTrackOfFetch();
  },
  fetchComplete: (state, actions) => ({
    activeFetch: null,
    foundAlbums: null,
    albumOfInterest: null,
    activeFetchTrackNum: null,
  }),
};
