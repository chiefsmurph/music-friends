import { h } from 'hyperapp';
import PlaylistButton from './PlaylistButton';
import NewPlaylistModal from './newPlaylistModal';

const Layout = ({ state, actions }, children) => {
  const { currentPlaylist, playlists, currentIcon, changeBalance, showingModal, debugCP } = state;
  const { openNewPlModal, selectPlaylist, hideModals, toggleDebug } = actions;
  const onSelectPlaylist = (playlist) => {
    selectPlaylist(playlist);
  };
  return (
    <div class='container'>
        {debugCP && (
          <code>{JSON.stringify(currentPlaylist)}</code>
        )}
        <h1><span>{currentIcon}</span>music hacker</h1>
        <div id='left'>
          <button onclick={openNewPlModal}>+ new playlist</button><br/>
          <h2>Saved playlists</h2>
          <ul>
            {playlists.map(pl => (
              <PlaylistButton
                selected={pl.playlistid === currentPlaylist.playlistid}
                onSelect={onSelectPlaylist} pl={pl} />
            ))}
            {(!playlists || !playlists.length) && (
              <b>You have no playlists</b>
            )}
          </ul>
        </div>
        <div id='right'>
          {children}
        </div>
        <div class="clear"></div>

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

        <div id="gradient"></div>
        <div id="bluecircle"></div>

        {(showingModal === 'newplaylist') && (
          <NewPlaylistModal
            state={state}
            actions={actions} />
        )}

        <div
          id="modalShade"
          onclick={hideModals}
          style={{
            display: !!showingModal ? "block" : "none"
          }} />

        <audio id="player" controls>
          <source src="" type="audio/mpeg">
              Your browser does not support the audio element.
          </source>
        </audio>

    </div>
  );
}

module.exports = Layout;
