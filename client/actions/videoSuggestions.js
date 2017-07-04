// import getAudio from '../api/getAudio'

module.exports = {
  setVideoSuggestions: (state, actions, suggestions) => ({ suggestions }),
  suggestVids: (state, actions) => {
    clearTimeout(state.suggestRequest);
    return {
      suggestRequest: setTimeout(() => {
        const suggestText = document.getElementById("songname").value;
        console.log(suggestText);
        state.socket.emit('suggest', { suggestText }, suggestions => {
          console.log('received ' + JSON.stringify(suggestions));
          actions.setVideoSuggestions(suggestions);
        });
      }, 100)
    };
  },
  vidClick: (state, actions, vid) => {

    var updateServerTracks = (id, tracks, cb) => {
      console.log('updating server tracks', id, tracks, cb);
      state.socket.emit('setTracks', id, tracks, (err, updatedTracks) => {
        if (err) return actions.error(err);
        return cb(updatedTracks);
      });
    };

    actions.clearSearch();
    // for (var key in vid) {
    //   vid[key] = vid[key].replace(/'/, "''");
    // }

    var currentPlaylistId = state.currentPlaylist.playlistid;
    var generateNewTracks = (vid) => [vid].concat(state.currentPlaylist.tracks || []);
    console.log('currentTracks', state.currentPlaylist.tracks);
    var beforeDL = generateNewTracks(vid);
    console.log('beforedl', beforeDL, currentPlaylistId);

    actions.setTracks(beforeDL);

    updateServerTracks(
      currentPlaylistId,
      beforeDL,
      (res) => {

        if (!state.fileDirectory[vid.id]) {
          // to server
          state.socket.emit('requestDownload', vid, currentPlaylistId);
          // for electron
          actions.downloadAudio(vid);
        }

      });

  },
  addToActiveDls: (state, actions, vidId) => ({
    activeDownloads: state.activeDownloads.concat([vidId])
  }),
  removeFromActiveDls: (state, actions, vidId) => ({
    activeDownloads: state.activeDownloads.filter(dlId => dlId !== vidId)
  }),
  downloadAudio: (state, actions, vid) => {
    const { url, id } = vid;
    actions.addToActiveDls(vid.id);
    window.getAudio(vid.url)
      .then(file => {
        console.log('file', file);
        actions.removeFromActiveDls(vid.id);
        actions.handleLocalAudio({
          songid: vid.id,
          file
        });
      });
  }
};
