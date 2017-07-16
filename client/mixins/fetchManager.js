
const FetchManager = () => ({
  state: {
    fetches: JSON.parse(localStorage.getItem('fetches')) || {},
  },
  actions: {
    newFetch: (state, actions, fetch) => {
      const newFetches = state.fetches;
      newFetches[fetch.fetchid] = fetch;
      localStorage.setItem('fetches', JSON.stringify(newFetches));
      actions.router.go('/fetch/' + fetch.fetchid);
      return {
        fetches: newFetches
      };
    },
    updateTracks: (state, actions, data) => {
      const { fetchid, tracks } = data;
      const newFetches = state.fetches;
      if (!newFetches[fetchid]) {
        console.log(newFetches);
        return console.error('that fetchid doesnt exist');
      }
      newFetches[fetchid] = Object.assign({}, newFetches[fetchid], {
        tracks
      });
      localStorage.setItem('fetches', JSON.stringify(newFetches));
      return {
        fetches: newFetches
      };
    }
  }
});

module.exports = FetchManager;
