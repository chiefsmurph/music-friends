import { h, app, Router } from "hyperapp"
import actions from './actions/'
import view from './views'

// plugins
import ChangingIcon from './plugins/changingIcon'
import CachePages from './plugins/cachePages'
import ModalManager from './plugins/modalManager'

app({
  state: {
    currentPlaylist: {},    // active playlist
    playlists: [],          // left side bar
    suggestRequest: null,
    suggestions: [],
    debugCP: localStorage.getItem('debugCP') === 'true'
  },
  view,
  actions,
  events: {
    loaded: (state, actions) => {
      actions.init();
    },
    route: (state, actions, data) => {
      console.log('route', state, actions, data);
      if (data.params && data.params.id) {
        // console.log('found params', data.params.id);
        actions.getPlaylist(data.params.id);
      }
    }
  },
  plugins: [
    Router,
    ChangingIcon,
    CachePages,
    ModalManager
  ]
});

console.log('here');
