import { h, app, Router } from "hyperapp"
import actions from './actions/'
import view from './views'

// mixins
import ChangingIcon from './mixins/changingIcon'
import CachePages from './mixins/cachePages'
import ModalManager from './mixins/modalManager'
import KeyManager from './mixins/keyManager'
import FileManager from './mixins/fileManager'
import SettingsManager from './mixins/settingsManager'

app({
  state: {
    currentPlaylist: {},    // active playlist
    playlists: [],          // left side bar
    suggestRequest: null,
    suggestions: [],
    activeDownloads: [],
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
      const isRoute = route => data.match.indexOf(route) !== -1 && data.params && data.params.id;
      if (isRoute('playlist')) {
        actions.playlistRoute(data.params.id);
      } else if (isRoute('fetch')) {
        actions.setCurrentPlaylist(state.fetches[data.params.id], true);  // dont update cache bro
      }
      actions.setRouteMatch(data.match);
    }
  },
  mixins: [
    Router,
    ChangingIcon,
    CachePages,
    ModalManager,
    KeyManager,
    FileManager,
    SettingsManager
  ]
});

console.log('here');
