// import getAudio from '../api/getAudio'

import async from 'async';

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
  vidClickForPlaylists: (state, actions, vid) => {

      var updateServerTracks = (id, tracks, cb) => {
        console.log('updating server tracks', id, tracks, cb);
        state.socket.emit('setTracks', id, tracks, (err, updatedTracks) => {
          if (err) return actions.error(err);
          return cb(updatedTracks);
        });
      };

      var currentPlaylistId = state.currentPlaylist.playlistid;
      var generateNewTracks = (vid) => (state.currentPlaylist.tracks || []).concat([vid]);
      console.log('currentTracks', state.currentPlaylist.tracks);
      var beforeDL = generateNewTracks(vid);
      console.log('beforedl', beforeDL, currentPlaylistId);

      actions.setTracks(beforeDL);

      updateServerTracks(
        currentPlaylistId,
        beforeDL,
        (res) => {

          actions.afterVidClickAll(vid);

        });

  },
  afterVidClickAll: (state, actions, vid) => {
      if (!state.fileDirectory[vid.id] && state.settings.enableMP3s) {
        // to server
        state.socket.emit('requestDownload', vid, currentPlaylistId);
        // for electron
        actions.downloadAudio(vid);
      }

      if (state.activeFetch) {
        actions.nextTrackOfFetch();
      }
  },
  vidClick: (state, actions, vid) => {

    actions.clearSearch();

    if (state.currentPlaylist.type === 'fetch') {
      actions.afterVidClickAll(vid);
    } else {
      actions.vidClickForPlaylists(vid);
    }

  },
  addToActiveDls: (state, actions, vidId) => ({
    activeDownloads: state.activeDownloads.concat([vidId])
  }),
  removeFromActiveDls: (state, actions, vidId) => ({
    activeDownloads: state.activeDownloads.filter(dlId => dlId !== vidId)
  }),
  downloadAudio: async (state, actions, vid) => {
    const { url, id } = vid;
    actions.addToActiveDls(vid.id);
    const file = await window.getAudio(vid.url);
    actions.removeFromActiveDls(vid.id);
    actions.handleLocalAudio({
      songid: vid.id,
      file
    });
  },
  downloadAll: (state, actions) => {
    var needsToDownload = state.currentPlaylist.tracks.filter(track => !state.fileDirectory[track.id]);
    console.log(needsToDownload);
    async.forEachSeries(needsToDownload, (track, cb) => {
      actions.downloadAudio(track)
        .then(() => {
          console.log('done');
          cb();
        });
    }, () => {
      actions.endDownloadAll();
    });
  }
};
