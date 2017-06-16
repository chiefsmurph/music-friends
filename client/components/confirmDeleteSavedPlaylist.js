import { h } from 'hyperapp';

const ConfirmDeleteSavedPlaylist = ({ state, actions }, children) => {
  return (
    <div class="modal" id="deleteplaylist">
      <a class="x" onclick={actions.hideModals}>x</a>
      <header>
        Unsaving playlist
      </header>
      <h3 class='body'>
        Are you sure you want to remove this playlist from your saved playlists?<br/><br/>
        {JSON.stringify(state.playlistToDelete)}
      </h3>
      <footer>
        <button onclick={actions.hideModals}>Cancel</button>
        <button class='confirm' onclick={actions.confirmDelete}>Confirm delete from saved playlists</button>
      </footer>
    </div>
  )
};

module.exports = ConfirmDeleteSavedPlaylist;
