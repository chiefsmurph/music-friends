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
    playMP3: (state, actions, data) => {
      const { file, id } = data;
      console.log('PLAYINGMP3', data);
      var audio = document.getElementById('player');
      audio.src = window.assetsFolder + '/' + file;
      audio.style.display = 'block';
      audio.onended = () => {
        console.log('on end')
        actions.songDone();
      };
      audio.play();
      return { nowPlaying: id };
    },

    songDone: (state, actions) => {
      console.log('stopping done');
      // stop for local mp3
      actions.stopStreaming();

      // stop for youtube
      var player = document.getElementById('ytPlayer');
      if (state.youtubePlayer) state.youtubePlayer.stopVideo();
      player.style.display = 'none';

      return {
        lastRequested: null,
        nowPlaying: null
      };
    },

    playYoutube: (state, actions, data) => {
      const { file, id } = data;
      var player = document.getElementById('ytPlayer');
      // if (player && player.src) player.src = null;

      // player.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
      player.style.display = 'block';
      console.log('playing ', id);

      const returnObj = {};

      if (!state.youtubePlayer) {
        returnObj.youtubePlayer = new YT.Player('ytPlayer', {
          width: '220',
          height: '167',
          videoId: id,
          playerVars: {
             'autoplay': 0,
             'controls': 1,
             'rel' : 0
          },
          events: {
            onReady: (event) => {
              event.target.playVideo();
            },
            onStateChange: (event) => {
              if(event.data === 0) {
                  actions.songDone();
              }
            }
          }
        });
      } else {
        console.log('loading by id');
        state.youtubePlayer.loadVideoById(id);
      }

      returnObj.nowPlaying = id;

      return returnObj;
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
        // audio.src = null;
      }
    }
};
