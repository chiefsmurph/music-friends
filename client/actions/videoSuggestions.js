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
      }, 300)
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

        state.socket.emit('requestDownload', vid, currentPlaylistId);

      });

  }
};
