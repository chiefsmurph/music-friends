import { h } from 'hyperapp';
import Layout from '../components/layout';
import YoutubeSearcher from '../components/youtubeSearcher';
import PlaylistViewer from '../components/playlistViewer';

const fetches = (state, actions) => {

  const isInSavedPlaylists = state.playlists.some(pl => {
    return pl.playlistid === state.currentPlaylist.playlistid;
  });

  const addToSavedPls = () => {
    if (isInSavedPlaylists) return;
    actions.addPlaylist({
      playlistid: state.currentPlaylist.playlistid,
      title: state.currentPlaylist.title
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
          currently on track #{state.activeFetchTrackNum + 1}: "{state.activeFetch.tracks[state.activeFetchTrackNum]}"
        </div>
      )}

      {
        admin
        && (
          <YoutubeSearcher
            actions={actions}
            state={state} />
        )
      }


      <header>
        <h3>album fetch{state.currentPlaylist.artist}</h3>
        <table>
          <tr>
            <td>
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
                playlistid: {state.currentPlaylist.playlistid}
            </td>
          </tr>
        </table>
      </header>

      <PlaylistViewer state={state} actions={actions} />

    </Layout>
  )

};

module.exports = fetches;
