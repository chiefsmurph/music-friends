module.exports = {
  selectPlaylist: (state, actions, pl) => {
    console.log('/playlist/' + pl.playlistid);
    actions.router.go('/playlist/' + pl.playlistid);
    actions.clearSearch();
  },
  openNewPlModal: (state, actions) => {
    actions.showModal('newplaylist');
    document.getElementById('newPlaylistName').focus();
  },
  clearSearch: (state, actions) => {
    document.getElementById("songname").value = '';
    return { suggestions: [] };
  },
  toggleDebug: (state, actions) => {
    localStorage.setItem('debugCP', !state.debugCP);
    return {
      debugCP: !state.debugCP
    };
  }
};
