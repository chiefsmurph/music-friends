import init from './init'
import playlists from './playlists'
import currentPlaylist from './currentPlaylist'
import UI from './UI'
import videoSuggestions from './videoSuggestions'
import streaming from './streaming'
import fetchingAlbums from './fetchingAlbums'

module.exports = Object.assign(
  {},
  init,
  playlists,
  currentPlaylist,
  UI,
  videoSuggestions,
  streaming,
  fetchingAlbums,
  {
    setLeaderboard: (state, actions, leaderboard) => ({ leaderboard }),
    setRouteMatch: (state, actions, match) => ({ routeMatch: match }),

    handleLocalAudio: (state, actions, data) => {
      console.log('new file handle local', data);
      actions.newFileDownloaded(data);
    },



    playlistRoute: (state, actions, id) => {
      // console.log('found params', data.params.id);
      actions.connectToPlaylistRooms([id]);
      actions.getPlaylist(id);

    },

    goToRoute: (state, actions, route) => {
      console.log('going to ' + route);
      actions.router.go('/' + route);
      return {
        currentPlaylist: {}
      };
    },

    error: (state, actions, error) => {
      console.error(error);
    }
  }
);
