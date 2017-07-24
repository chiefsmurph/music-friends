import socketclient from "socket.io-client";
import ss from "socket.io-stream";

module.exports = {
  init: (state, actions) => {
    console.log('initting')
    actions.initSocket();
    actions.getLocalPlaylists();
  },

  initSocket: (state, actions) => {
    console.log("initting socket connection")
    var socket = socketclient('https://serene-castle-99055.herokuapp.com/');
    // var socket = socketclient('http://localhost:2222');
    socket.on('connect', function(){
      console.log("connected")
      socket.emit('getLeaderboard', actions.updateLeaderboard);
    });

    socket.on('tracksUpdate', (playlistid, tracks) => {
      console.log('updating tracks for ' + playlistid, tracks);
      actions.updateCacheTracksForPlaylist({ playlistid, tracks });
      actions.updateCurrentPlaylistIfNecessary({ playlistid, tracks });
    });

    socket.on('leaderboard', (leaderboard) => {
      console.log('leaderboard', leaderboard);
      actions.setLeaderboard(leaderboard);
    });

    socket.on('downloadError', (data) => {
      console.info(data);
    });

    ss(socket).on('audio-stream', function(stream, data) {
        var parts = [];
        stream.on('data', function(chunk){
            parts.push(chunk);
        });
        stream.on('end', function () {
            actions.streamEnded(parts);
        });
    });

    socket.on('event', function(data){});
    socket.on('disconnect', function(){});
    console.log('sestting socket');
    return { socket };
  },

  connectToPlaylistRooms: (state, actions, playlistIds) => {
    console.log('playlist ids ', playlistIds);
    state.socket.emit('initRooms', playlistIds);
  },

  getLocalPlaylists: (state, actions) => {
    var localPlaylists = localStorage.getItem('playlists');
    localPlaylists = JSON.parse(localPlaylists);
    if (localPlaylists) {
      var playlistIds = localPlaylists.map(pl => pl.playlistid);
      actions.connectToPlaylistRooms(playlistIds);
      return {
        playlists: localPlaylists
      };
    }
  }


};
