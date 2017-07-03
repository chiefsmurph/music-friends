import { h } from 'hyperapp';
import PlaylistButton from './PlaylistButton';

// modals
import NewPlaylistModal from './modals/newPlaylist';
import ConfirmDeleteSavedPlaylistModal from './modals/confirmDeleteSavedPlaylist';
import SubmitKeysModal from './modals/submitKeys';
import GoToPlaylistModal from './modals/GoToPlaylist';

const Layout = ({ state, actions }, children) => {
  const { currentPlaylist, playlists, currentIcon, changeBalance, showingModal, debugCP, lastRequested, nowPlaying } = state;
  const { openNewPlModal, selectPlaylist, hideModals, toggleDebug, deleteSavedPlaylist, confirmDeletePl, goHome } = actions;
  const onSelectPlaylist = (playlist) => {
    selectPlaylist(playlist);
  };
  const openGoToModal = () => {
    actions.showModal('gotoplaylist');
  };
  return (
    <div class='container'>
        {debugCP && (
          <code>
          {JSON.stringify(currentPlaylist)}
          {JSON.stringify(state.authedKeys)}
          {location.pathname}
          </code>
        )}
        <h1><span><img src={state.currentIcon} /></span>music hacker</h1>
        <div style={{
          float: 'right',
          position: 'absolute',
          right: '77px',
          top: '122px'
        }}>
            <a href='javascript:void(0)' onclick={goHome}>home</a>
        </div>
        <div id='left'>
          <button onclick={openNewPlModal}>+ new playlist</button><br/>
          <h2>saved playlists</h2>
          <ul>
            {playlists.map(pl => (
              <PlaylistButton
                selected={pl.playlistid === currentPlaylist.playlistid}
                onSelect={onSelectPlaylist} pl={pl}
                confirmDeletePl={confirmDeletePl} />
            ))}
            {(!playlists || !playlists.length) && (
              <b>You have no playlists</b>
            )}
          </ul>
          <a onclick={openGoToModal} class="goto">go to playlist</a>
        </div>

        <div id='right'>
          {children}
        </div>
        <div class="clear"></div>

        {false && (
          <div id="debugArea">
            <label>
                debug CurrentPlaylist
                <input
                    type="checkbox"
                    onchange={toggleDebug}
                    checked={debugCP}
                    />
            </label>
          </div>
        )}

        <div id="gradient"></div>
        <div id="bluecircle"></div>

        {(showingModal === 'newplaylist') && (
          <NewPlaylistModal
            state={state}
            actions={actions} />
        )}

        {(showingModal === 'confirmdelete') && (
          <ConfirmDeleteSavedPlaylistModal
            state={state}
            actions={actions} />
        )}

        {(showingModal === 'submitkeys') && (
          <SubmitKeysModal
            state={state}
            actions={actions} />
        )}

        {(showingModal === 'gotoplaylist') && (
          <GoToPlaylistModal
            state={state}
            actions={actions} />
        )}

        <div
          id="modalShade"
          onclick={hideModals}
          style={{
            display: !!showingModal ? "block" : "none"
          }} />

    </div>
  );
}

module.exports = Layout;
