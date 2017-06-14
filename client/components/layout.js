import { h } from 'hyperapp';
import PlaylistButton from './PlaylistButton';
import NewPlaylistModal from './newPlaylistModal';

const Layout = ({ state, actions }, children) => {
  const { currentPlaylist, playlists, currentIcon, changeBalance, showingModal } = state;
  const { openNewPlModal, selectPlaylist, hideModals } = actions;
  const onSelectPlaylist = (playlist) => {
    selectPlaylist(playlist);
  };
  return (
    <div class='container'>
      {true && JSON.stringify(currentPlaylist)}
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


    </div>
  );
}

module.exports = Layout;
