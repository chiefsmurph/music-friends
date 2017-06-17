import { h } from 'hyperapp';

const GoToPlaylist = ({ state, actions }, children) => {
  const goToPlaylist = (e) => {
    actions.router.go('/playlist/' + document.getElementById('gotoplaylistid').value);
    actions.hideModals();
    e.preventDefault();
  };
  return (
    <div class="modal" id="gotoplaylist">
      <a class="x" onclick={actions.hideModals}>x</a>
      <header>
        Go to playlist
      </header>
      <form onsubmit={goToPlaylist} class='body'>
        <h3>Enter the playlistid of the playlist you want to go to:</h3>
        <input
          type="text"
          autofocus="true"
          id="gotoplaylistid"
          />
      </form>
      <footer>
        <button onclick={actions.hideModals}>Cancel</button>
        <button class='confirm' onclick={goToPlaylist}>Go to playlist</button>
      </footer>
    </div>
  )
};

module.exports = GoToPlaylist;
