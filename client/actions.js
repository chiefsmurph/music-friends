import { Router } from "hyperapp";
import socketclient from "socket.io-client";
import updatedTracksWithDl from './utils/updatedTracksWithDl';

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
      }, 300)
    };
  },
  initSocket: (state, actions) => {
    console.log("initting socket connection")
    var socket = socketclient(window.location.origin);
    socket.on('connect', function(){
      console.log("connected")
    });

    socket.on('downloadLink', (data) => {
      actions.handleDlLink(data);
      console.log('download link', data);
    });

    socket.on('tracksUpdate', (playlistid, tracks) => {
      console.log('updating tracks for ' + playlistid, tracks);
      actions.updateCacheTracksForPlaylist(playlistid, tracks);
      actions.updateCurrentPlaylistIfNecessary({ playlistid, tracks });
    });

    socket.on('event', function(data){});
    socket.on('disconnect', function(){});
    return { socket };
  },

  init: (state, actions) => {
    actions.initSocket();
    actions.getLocalPlaylists();
  },

  updateCurrentPlaylistIfNecessary: (state, actions, change) => {
    var { playlistid, tracks } = change;
    if (state.currentPlaylist.playlistid === playlistid) {
      console.log('ref', playlistid, tracks);
      console.log('setting tracks for active playlist', tracks);
      actions.setTracks(tracks);
    } else {
      console.log('not current')
    }
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
  },

  updateCurrentPlaylistWithDl: (state, actions, data) => {
    var newTracks = updatedTracksWithDl(state.currentPlaylist.tracks, data);
    actions.setTracks(newTracks);
  },

  handleDlLink: (state, actions, data) => {
    if (state.currentPlaylist.playlistid === data.playlistid) {
      // update currentplaylist tracks
      actions.updateCurrentPlaylistWithDl(data);
    }
    actions.updateCacheWithDL(data);
  },

  selectPlaylist: (state, actions, pl) => {
    console.log('/playlist/' + pl.playlistid);
    actions.router.go('/playlist/' + pl.playlistid);
    actions.clearSearch();
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
  openNewPlModal: (state, actions) => {
    actions.showModal('newplaylist');
    document.getElementById('newPlaylistName').focus();
  },
  onNewPlaylist: (state, actions, title) => {
    console.log('apples');
    state.socket.emit('newPlaylist', { title }, (res) => {
      console.log('response' + JSON.stringify(res));
      actions.addPlaylist({
        playlistid: res.playlistid,
        title: res.title
      });
      actions.router.go('/playlist/' + res.playlistid);
      actions.hideModals();
    });
  },


  setCurrentPlaylist: (state, actions, playlist, dontUpdateCache) => {

    dontUpdateCache = (typeof dontUpdateCache === "boolean" && dontUpdateCache);
    if (!dontUpdateCache) {
      console.log('updating cache');
      actions.updateCache(playlist);
    } else {
      console.log('dont update cache because ', dontUpdateCache);
    }
    console.log('setting playlist', playlist);
    return {
      currentPlaylist: playlist
    };
  },

  possiblyUpdateCurrent: (state, actions, data) => {
    if (JSON.stringify(state.currentPlaylist) !== JSON.stringify(data)) {
      console.log('needs updated');
      actions.setCurrentPlaylist(data);
    } else {
      console.log('no need for update');
      console.log('because currentpl' + JSON.stringify(state.currentPlaylist));
      console.log('and data' + JSON.stringify(data));
    }
  },

  fetchPlaylist: (state, actions, id) => {
    console.log('fetching');
    state.socket.emit('getPlaylist', { id }, data => {
      actions.possiblyUpdateCurrent(data);
    });
  },

  getPlaylist: (state, actions, id) => {
    // load quick result from cache if Cachepages plugin
    if (state.playlistCache[id]) {
      console.log('found in cache ', state.playlistCache[id])
      actions.setCurrentPlaylist(state.playlistCache[id], true);  // dont resave to cache
    } else {
      console.log('nope not found', state.playlistCache);
    }
    actions.fetchPlaylist(id);
  },

  setTracks: (state, actions, tracks) => {
    console.log('setting tracks', tracks);
    actions.setCurrentPlaylist(
      Object.assign({}, state.currentPlaylist, { tracks })
    );
  },

  error: (state, actions, error) => {
    console.error(error);
  },

  clearSearch: (state, actions) => {
    document.getElementById("songname").value = '';
    return { suggestions: [] };
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

module.exports = actions;
