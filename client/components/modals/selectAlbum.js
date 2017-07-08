import { h } from 'hyperapp';

const SelectAlbumModal = ({ state, actions }, children) => {
  const selectAlbum = (album) => {
    actions.setAlbumOfInterest(album);
    window.getAlbumTracks(album)
      .then(tracks => {
        console.log('received', tracks);
        actions.setFoundTracks(tracks);
        actions.showModal('confirmalbumfetch');
      });
  };
  return (
    <div class="modal" id="selectalbum">
      <a class="x" onclick={actions.hideModals}>x</a>
      <header>
        Select an album by {state.foundAlbums.artist}
      </header>
      <div id='albumchooser'>
        {state.foundAlbums.results.map(album => (
          <div onclick={() => selectAlbum(album)}>
            <img src={album.thumbnail}/>
            {album.title}<br/>
            {album.auxtext}
          </div>
        ))}
      </div>
      <footer>
        <button onclick={actions.hideModals}>Cancel</button>
      </footer>
    </div>
  )
};

module.exports = SelectAlbumModal;
