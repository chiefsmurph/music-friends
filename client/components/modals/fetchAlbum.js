import { h } from 'hyperapp';

const FetchAlbumModal = ({ state, actions }, children) => {
  const fetchAlbum = (e) => {
    window.getAlbumTracks(document.getElementById('albumquery').value);
    e.preventDefault();
  };
  return (
    <div class="modal" id="gotoplaylist">
      <a class="x" onclick={actions.hideModals}>x</a>
      <header>
        Fetch an album
      </header>
      <form onsubmit={goToPlaylist} class='body'>
        <h3>Enter the artist and album name you want to fetch.</h3>
        <input
          type="text"
          autofocus="true"
          id="albumquery"
          />
      </form>
      <footer>
        <button onclick={actions.hideModals}>Cancel</button>
        <button class='confirm' onclick={fetchAlbum}>Fetch album</button>
      </footer>
    </div>
  )
};

module.exports = FetchAlbumModal;
