import { h } from 'hyperapp';
import PlaylistButton from './PlaylistButton';

// modals
import NewPlaylistModal from './modals/newPlaylist';
import ConfirmDeleteSavedPlaylistModal from './modals/confirmDeleteSavedPlaylist';
import SubmitKeysModal from './modals/submitKeys';
import GoToPlaylistModal from './modals/goToPlaylist';

// fetch album modals
import FetchAlbumModal from './modals/fetchAlbum';
import SelectAlbumModal from './modals/selectAlbum';
import ConfirmAlbumFetch from './modals/confirmAlbumFetch';

const Layout = ({ state, actions }, children) => {
  const { currentPlaylist, playlists, currentIcon, changeBalance, showingModal, debugCP, nowPlaying, routeMatch, settings } = state;
  const { openNewPlModal, selectPlaylist, hideModals, toggleDebug, deleteSavedPlaylist, confirmDeletePl, goToRoute } = actions;
  const onSelectPlaylist = (playlist) => {
    selectPlaylist(playlist);
  };
  const openGoToModal = () => {
    actions.showModal('gotoplaylist');
  };
  const isRoute = route => (routeMatch && routeMatch.indexOf(route) !== -1) || (routeMatch === '/dist/index.html' && route === 'home');
  const pages = ['home', 'leaderboard', 'settings'];
  // {JSON.stringify(state.authedKeys)}
  // {location.pathname}
  return (
    <div class={'container ' + (settings.enableMP3s ? 'mp3enabled' : '')}>
        {debugCP && (
          <code>
          {JSON.stringify(currentPlaylist)}
          </code>
        )}
        <h1><span><img src={'/dist/icons/' + state.currentIcon} /></span>music glossary</h1>
        <div id="nav-menu">
            {pages.map(page => (
              <a
                href='javascript:void(0)'
                onclick={() => goToRoute(page)}
                class={(isRoute(page)) ? 'currentRoute' : ''}>
                  {page}
              </a>
            ))}
        </div>
        <div id='left'>
          <button onclick={openNewPlModal}>+ new playlist</button>
          {
            state.settings.enableAlbumFetchs && (
              <button onclick={() => actions.showModal('fetchalbum')}>+ new album-fetch</button>
            )
          }
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

        {(showingModal === 'fetchalbum') && (
          <FetchAlbumModal
            state={state}
            actions={actions} />
        )}

        {(showingModal === 'selectalbum') && (
          <SelectAlbumModal
            state={state}
            actions={actions} />
        )}

        {(showingModal === 'confirmalbumfetch') && (
          <ConfirmAlbumFetch
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
