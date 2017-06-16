import { h } from 'hyperapp';

const SubmitKeysModal = ({ state, actions }, children) => {
  const submitKey = () => {
    var keyVal = document.getElementById('submittingKey').value;
    var key = {
      playlistid: state.currentPlaylist.playlistid,
      key: keyVal
    };
    actions.authorizeSingleKey(key)
      .then(valid => {
        console.log('isvalid', valid);
        if (valid) {
          actions.addKey(key)
        }
        actions.hideModals();
      })
  };
  return (
    <div class="modal" id="deleteplaylist">
      <a class="x" onclick={actions.hideModals}>x</a>
      <header>
        Submit the key for admin access
      </header>
      <h3 class='body'>
        Type in the key for this playlist and gain admin privileges<br/><br/>
        <input
          type="text"
          autofocus="true"
          id="submittingKey"
          />
      </h3>
      <footer>
        <button onclick={actions.hideModals}>Cancel</button>
        <button class='confirm' onclick={submitKey}>Submit key</button>
      </footer>
    </div>
  )
};

module.exports = SubmitKeysModal;
