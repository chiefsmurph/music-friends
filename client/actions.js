import { Router } from "hyperapp"
import socketclient from "socket.io-client"

const actions = {
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
      }, 1000)
    };
  },
  initSocket: (state, actions) => {
    console.log("initting socket connection")
    var socket = socketclient('http://localhost:8320');
    socket.on('connect', function(){
      console.log("connected")
    });
    socket.on('event', function(data){});
    socket.on('disconnect', function(){});
    return { socket };
  },

  init: (state, actions) => {
    actions.initSocket();
    actions.getLocalPlaylists();
  },

  getLocalPlaylists: (state, actions) => {
    var localPlaylists = localStorage.getItem('playlists');
    if (localPlaylists) {
      return {
        playlists: JSON.parse(localPlaylists)
      };
    }
  },

  selectPlaylist: (state, actions, pl) => {
    console.log('/playlist/' + pl.playlistid);
    actions.router.go('/playlist/' + pl.playlistid);
    return { currentPlaylist: pl };
  },

  updateLocalstorage: (state, actions, prop, val) => {
    localStorage.setItem(prop, val);
  },

  addPlaylist: (state, actions, pl) => {
    console.log('adding' + JSON.stringify(pl));
    var newPlaylists = [pl].concat(state.playlists);
    console.log('saving ' + JSON.stringify(newPlaylists));
    localStorage.setItem('playlists', JSON.stringify(newPlaylists));
    return {
      playlists: newPlaylists
    }
  },
  onNewPlaylist: (state, actions) => {
    console.log('apples');
    var title = prompt("Please enter a name for your playlist", "playlist");
    state.socket.emit('newPlaylist', { title }, (res) => {
      console.log('response' + JSON.stringify(res));
      actions.addPlaylist({
        playlistid: res.playlistid,
        title: res.title
      });
      actions.router.go('/playlist/' + res.playlistid);
    });
  },


  setCurrentPlaylist: (state, actions, playlist) => ({
    currentPlaylist: playlist
  }),

  getPlaylist: (state, actions, id) => {
    state.socket.emit('getPlaylist', { id }, (data) => {
      actions.setCurrentPlaylist(data);
    });
  },

  setTracks: (state, actions, tracks) => {
    return {
      currentPlaylist: Object.assign({}, state.currentPlaylist, {
        tracks
      })
    };
  },

  error: (state, actions, error) => {
    console.error(error);
  },

  clearSearch: (state, actions) => {
    document.getElementById("songname").value = '';
    return {
      suggestions: []
    };
  },

  vidClick: (state, actions, vid) => {
    actions.clearSearch();
    for (var key in vid) {
      vid[key] = vid[key].replace(/\'/g, '"');
    }
    console.log('currentTracks', state.currentPlaylist.tracks);
    var newTracks = [vid].concat(state.currentPlaylist.tracks || []);
    console.log('newTracks', newTracks);
    state.socket.emit('setTracks', state.currentPlaylist.playlistid, newTracks, (err, updatedTracks) => {
      console.log(err, updatedTracks);
      if (err) return actions.error(err);
      return actions.setTracks(updatedTracks);
    });
  }
};

module.exports = actions;
