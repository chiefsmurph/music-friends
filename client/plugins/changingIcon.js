const ChangingIcon = () => ({
  state: {
    icon: ['🎧', '🎹', '📻', '🎵', '𝄢'],
    numActions: 0,
    currentIcon: '🎧',
    changeTO: null
  },
  actions: {
    clearChangeTO: (state, actions) => ({ changeTO: null }),
    changeIconWithAcceleration: (state, actions, newAcceleration) => {
      if (!newAcceleration) {
        newAcceleration = state.acceleration * 1.22;
        if (newAcceleration > 700) newAcceleration = newAcceleration + 100;
        if (newAcceleration > 1350) {
          newAcceleration = null;
        }
      }
      if (state.changeTO) clearTimeout(state.changeTO);
      return {
        acceleration: newAcceleration,
        changeTO: setTimeout(() => {
          actions.changeIcon();
          if (newAcceleration) {
            actions.changeIconWithAcceleration();
            actions.clearChangeTO();
          }
        }, newAcceleration)
      };
    },
    addAcceleration: (state, actions) => {
      var newAcceleration = (state.acceleration) ? Math.max(state.acceleration * 0.4, 40) : 500;
      actions.changeIconWithAcceleration(newAcceleration);
      return {
        acceleration: newAcceleration
      };
    },
    changeIcon: (state, actions, data) => {
      // console.log('currently' + state.currentIcon);
      // console.log('changing icon to ' + state.icon[state.numActions % state.icon.length]);
      // actions.changeBalance(-1);
      return {
        currentIcon: state.icon[state.numActions % state.icon.length],
        numActions: state.numActions + 1,
        throttleTO: null
      };
    },

  },
  events: {
    action: (state, actions, data) => {
        if (state.throttleTO) {
          clearInterval(state.throttleTO);
        }
        if (['changeIcon', 'addAcceleration', 'changeIconWithAcceleration', 'clearChangeTO'].indexOf(data.name) === -1) {
          actions.addAcceleration();
        }
    }
  }
});

module.exports = ChangingIcon;
