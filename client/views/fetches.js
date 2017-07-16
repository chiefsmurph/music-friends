import { h } from 'hyperapp';
import Layout from '../components/layout';
import YoutubeSearcher from '../components/youtubeSearcher';
import PlaylistViewer from '../components/playlistViewer';

const fetches = (state, actions) => {

  const isInSavedPlaylists = state.playlists.some(pl => {
    return pl.fetchid === state.currentPlaylist.fetchid;
  });

  console.log('isInSavedPlaylists', isInSavedPlaylists);

  const addToSavedPls = () => {
    if (isInSavedPlaylists) return;
    actions.addPlaylist({
      fetchid: state.currentPlaylist.fetchid,
      title: state.currentPlaylist.artist + ' - ' + state.currentPlaylist.release
    });
  };

  const confirmDeletePl = (pl) => {
    actions.confirmDeletePl({
      fetchid: pl.fetchid
    });
  };

  const downloadAll = () => {
    actions.downloadAll();
  };

  const admin = state.authedKeys.indexOf(state.currentPlaylist.playlistid) !== -1;

  const showSubmitKeysModal = () => {
    actions.showModal('submitkeys');
    document.getElementById('submittingKey').focus();
  };

  const hasDl = state.currentPlaylist.tracks && state.currentPlaylist.tracks.some(track => !state.fileDirectory[track.id] && state.activeDownloads.indexOf(track.id) === -1);

  return (
    <Layout
      actions={actions}
      state={state}>

      {state.activeFetch && (
        <div id='activeFetchInfo'>
          fetching "{state.activeFetch.title}" by {state.activeFetch.artist}<br/>
          currently on track #{state.activeFetchTrackNum + 1} / {state.activeFetch.tracks.length}: "{state.activeFetch.tracks[state.activeFetchTrackNum]}"
        </div>
      )}

      {
        state.activeFetch
        && (
          <YoutubeSearcher
            actions={actions}
            state={state} />
        )
      }


      <header>
        <h3>{state.currentPlaylist.artist} - {state.currentPlaylist.release}</h3>
        <table>
          <tr>
            <td>
                {
                  (isInSavedPlaylists) ? (
                    <input
                      type="button"
                      value="| Remove from saved playlists"
                      onclick={() => confirmDeletePl(state.currentPlaylist)}/>
                  ) : (
                    <input
                      type="button"
                      value="| Add to saved playlists"
                      onclick={addToSavedPls}/>
                  )
                }

                <br/><br/>
                {state.settings.enableMP3s && (
                  <input
                    type="button"
                    value="| Download all"
                    class={(!hasDl || state.activeFetch) ? 'disabled' : ''}
                    onclick={downloadAll}
                    disabled={!hasDl || state.activeFetch}/>
                )}

            </td>
            <td>
                fetchid: {state.currentPlaylist.fetchid}<br/><br/>
                artist: {state.currentPlaylist.artist}<br/>
                release: {state.currentPlaylist.release}
            </td>
          </tr>
        </table>
      </header>

      <PlaylistViewer state={state} actions={actions} />

    </Layout>
  )

};

module.exports = fetches;
