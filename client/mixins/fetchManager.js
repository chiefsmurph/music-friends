
const FetchManager = () => ({
  state: {
    fetches: JSON.parse(localStorage.getItem('fetches')) || {},
  },
  actions: {
    newFetch: (state, actions, fetch) => {
      const newFetches = state.fetches;
      newFetches[fetchid] = fetch;
      localStorage.setItem('fetches', JSON.stringify(newFetches));
      return {
        fetches: newFetches
      };
    },
  }
});

module.exports = FetchManager;
