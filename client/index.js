import { h, app, Router } from "hyperapp"
import actions from './actions'
import view from './views'

app({
  state: {
    currentPlaylist: {},
    playlists: [
      {
        playlistid: '34j2dj2',
        title: 'Billy Joel - Sebastian'
      }
    ],
    suggestRequest: null,
    suggestions: []
  },
  view,
  actions,
  events: {
    loaded: (state, actions) => {
      console.log('hello');
      actions.init();
    },
    route: (state, actions, data) => {
      console.log('route', state, actions, data);
      if (data.params && data.params.id && state.currentPlaylist.playlistid !== data.params.id) {
        console.log('found params', data.params.id);
        actions.getPlaylist(data.params.id);
      }
    }
  },
  plugins: [Router]
});

console.log('here');
