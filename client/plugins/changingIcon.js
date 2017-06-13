const ChangingIcon = () => ({
  state: {
    icon: ['🎧', '🎹', '📻', '🎵', '𝄢'],
    numActions: 0,
    currentIcon: '',
    throttleTO: null,
    changeBalance: 0
  },
  actions: {
    throttleIconChange: (state, actions) => {
      console.log('woahhhh there')
      if (state.throttleTO) clearInterval(state.throttleTO);
      console.log(state.changeBalance + 1 + ' is the new');
      return {
        throttleTO: setTimeout(() => {
          actions.changeIcon();
        }, 200),
        changeBalance: state.changeBalance + 1
      };
    },
    changeBalance: (state, actions, inc) => {
      console.log('hi')
      console.log(state, actions, arguments);
      console.log('changing ' + state.changeBalance + ' by ' + inc);
      return {
        changeBalance: state.changeBalance + inc
      };
    },
    changeIcon: (state, actions, data) => {
      console.log('currently' + state.currentIcon);
      console.log('changing icon to ' + state.icon[state.numActions % state.icon.length]);
      // actions.changeBalance(-1);
      return {
        currentIcon: state.icon[state.numActions % state.icon.length],
        numActions: state.numActions + 1,
        changeBalance: state.changeBalance - 1,
        throttleTO: null
      };
    }
  },
  events: {
    action: (state, actions, data) => {
        if (state.throttleTO) {
          clearInterval(state.throttleTO);
        }
        console.log(state, actions, data, arguments)
        if (['throttleIconChange', 'changeIcon'].indexOf(data.name) === -1) {

          console.log('throttling TO' + state.changeBalance);
          debugger;
          actions.throttleIconChange();
        } else {
          console.log('hit it')
        }
    }
  }
});

module.exports = ChangingIcon;
