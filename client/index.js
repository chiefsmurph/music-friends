import { h, app, Router } from "hyperapp"
import actions from './actions/'
import view from './views'

// plugins
import ChangingIcon from './plugins/changingIcon'
import CachePages from './plugins/cachePages'
import ModalManager from './plugins/modalManager'
import KeyManager from './plugins/keyManager'

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
        actions.playlistRoute(data.params.id);
      }
    }
  },
  plugins: [
    Router,
    ChangingIcon,
    CachePages,
    ModalManager,
    KeyManager
  ]
});

console.log('here');
