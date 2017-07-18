const Settings = () => ({
  state: {
    settings: JSON.parse(localStorage.getItem('settings')) || {
      previewVideosOnHover: true
    },
  },
  actions: {
    toggleSetting: (state, actions, setting) => {
      const mergeObj = {};
      mergeObj[setting] = !state.settings[setting];
      const newSettings = Object.assign({}, state.settings, mergeObj);


      if (newSettings.showSuggestedSongs && !state.settings.showSuggestedSongs) {
        // show suggested songs checkbox just turned to true
        actions.refreshSuggestedSongs();
      }


      localStorage.setItem('settings', JSON.stringify(newSettings));
      console.log('new settings', newSettings);
      return { settings: newSettings };
    }
  }
});

module.exports = Settings;
