import { h } from 'hyperapp';

const FetchAlbumModal = ({ state, actions }, children) => {
  const fetchAlbum = (e) => {
    const artist = document.getElementById('artistquery').value;
    window.getAlbumsByArtist(artist)
      .then(results => {
        const { albums, artist } = results;
        console.log('results', results);
        actions.setFoundAlbums({
          artist,
          albums
        });
        console.log(state.foundAlbums);
        actions.showModal('selectalbum');
      });
    e.preventDefault();
  };
  return (
    <div class="modal" id="fetchalbum">
      <a class="x" onclick={actions.hideModals}>x</a>
      <header>
        Fetch an album
      </header>
      <form onsubmit={fetchAlbum} class='body'>
        <h3>Enter the artist whose album you want to fetch.</h3>
        <input
          type="text"
          autofocus="true"
          id="artistquery"
          />
      </form>
      <footer>
        <button onclick={actions.hideModals}>Cancel</button>
        <button class='confirm' onclick={fetchAlbum}>Find albums by this artist</button>
      </footer>
    </div>
  )
};

module.exports = FetchAlbumModal;
