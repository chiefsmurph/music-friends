const localKeys = JSON.parse(localStorage.getItem('keys'));

const KeyManager = () => ({
  state: {
    authedKeys: localKeys ? Object.keys(localKeys) : [],
    keys: {}
  },
  actions: {
    addKey: (state, actions, data) => {
      const { key, playlistid } = data;
      var keys = state.keys;
      keys[playlistid] = key;
      localStorage.setItem('keys', JSON.stringify(keys));
      actions.keyAuthorized(playlistid);
      return { keys };
    },

    keyAuthorized: (state, actions, id) => {
      if (state.authedKeys.indexOf(id) === -1) {
        return { authedKeys: state.authedKeys.concat([id]) };
      }
    },

    keyNotValid: (state, actions, id) => {
      var keys = state.keys;
      delete keys[id];
      localStorage.setItem('keys', JSON.stringify(keys));
      return {
        keys,
        authedKeys: state.authedKeys.filter(playlistid => playlistid !== id)
      };
    },

    authorizeSingleKey: (state, actions, data) => {
      const { playlistid , key } = data;
      console.log('author', playlistid, key)
      return new Promise((resolve, reject) => {
        state.socket.emit('authorizeKey', playlistid, key, (valid) => {
          console.log('valid? ', valid);
          resolve(valid);
        });
      });
    },

    authorizeKeys: (state, actions) => {
      var keys = JSON.parse(localStorage.getItem('keys'));
      console.log('authorizing ', keys);
      if (!keys) return;
      Object.keys(keys).forEach(playlistid => {
        console.log('hello', playlistid, 'hi');
        actions.authorizeSingleKey({
          playlistid,
          key: keys[playlistid]
        })
            .then(valid => {
                if (valid) {
                  actions.keyAuthorized(playlistid);
                } else {
                  actions.keyNotValid(playlistid);
                }
            })
      });

      return { keys };
    }

  },
  events: {
    loaded: (state, actions, data) => {
      actions.authorizeKeys();
    },
    action: (state, actions, data) => {

    }
  }
});

module.exports = KeyManager;
