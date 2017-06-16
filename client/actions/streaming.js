module.exports = {
    updateNowPlaying: (state, actions) => {
      return {
        nowPlaying: state.lastRequested
      }
    },

    requestStream: (state, actions, song) => {
      console.log('request stream')
      actions.stopStreaming();
      if (state.nowPlaying !== song.id) {
        console.log('client-stream-request', song);
        state.socket.emit('client-stream-request', song.dl);
        return {
          lastRequested: song.id
        };
      }
    },
    streamEnded: (state, actions, parts) => {
      var audio = document.getElementById('player');
      if (state.lastRequested && state.nowPlaying !== state.lastRequested) {
        audio.src = (window.URL || window.webkitURL).createObjectURL(new Blob(parts));
        audio.style.display = 'block';
        audio.onended = () => {
          console.log('on end')
          actions.stopStreaming();
        };
        actions.updateNowPlaying();
        audio.play();
      }
    },
    stopStreaming: (state, actions) => {
      console.log('stopping stream')
      var audio = document.getElementById('player');
      if (audio) {
        audio.style.display = 'none';
        audio.pause();
        audio.src = null;
      }
      return {
        lastRequested: null,
        nowPlaying: null
      };
    }
};
