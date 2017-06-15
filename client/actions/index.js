import init from './init'
import playlists from './playlists'
import currentPlaylist from './currentPlaylist'
import UI from './UI'
import videoSuggestions from './videoSuggestions'

module.exports = Object.assign(
  {},
  init,
  playlists,
  currentPlaylist,
  UI,
  videoSuggestions,
  {
    handleDlLink: (state, actions, data) => {
      if (state.currentPlaylist.playlistid === data.playlistid) {
        // update currentplaylist tracks
        actions.updateCurrentPlaylistWithDl(data);
      }
      actions.updateCacheWithDL(data);
    },

    updateNowPlaying: (state, actions) => {
      return {
        nowPlaying: state.lastRequested
      }
    },

    requestStream: (state, actions, song) => {
      console.log('client-stream-request', song);
      actions.stopStreaming();
      if (state.nowPlaying !== song.id) {
        state.socket.emit('client-stream-request', song.dl);
        return {
          lastRequested: song.id
        };
      }
    },
    stopStreaming: (state, actions) => {
      var audio = document.getElementById('player');
      audio.style.display = 'none';
      audio.src = null;
      return {
        lastRequested: null,
        nowPlaying: null
      }
    },

    startStream: (state, actions) => {
      console.log('starting stream');
    },

    error: (state, actions, error) => {
      console.error(error);
    }
  }
);
