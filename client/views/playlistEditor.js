import { h } from 'hyperapp';
import Layout from '../components/layout';
import YoutubeSearcher from '../components/youtubeSearcher';

const playlistEditor = (state, actions) => {

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

  const handleThumbnailClick = (track) => {
    if (state.nowPlaying === track.id) {
      actions.stopStreaming();
    } else if (state.fileDirectory[track.id]) {
      actions.playMP3({
        id: track.id,
        file: state.fileDirectory[track.id]
      });
    }
    // for now ignore thumbnail clicks when the file has not been downloaded
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
        <h3>{state.currentPlaylist.title}</h3>
        <table>
          <tr>
            <td>
                <input
                  type="button"
                  value="| Add to saved playlists"
                  class={(isInSavedPlaylists) ? 'disabled' : ''}
                  disabled={isInSavedPlaylists}
                  onclick={addToSavedPls}/>
                <br/><br/>
                <input
                  type="button"
                  value="| Fetch album"
                  disabled={!admin || state.activeFetch}
                  class={(!admin || state.activeFetch) ? 'disabled' : ''}
                  onclick={() => actions.showModal('fetchalbum')}/>
                <br/><br/>
                <input
                  type="button"
                  value="| Download all"
                  class={(!hasDl || state.activeFetch) ? 'disabled' : ''}
                  onclick={downloadAll}
                  disabled={!hasDl || state.activeFetch}/>
            </td>
            <td>
                {(admin) ? (
                  <div class='box'>
                    <h2>Admin</h2>
                    <label>
                      key: {state.keys[state.currentPlaylist.playlistid]}
                    </label>
                  </div>
                ) : (
                  <div class='box'>
                    <h2>View mode</h2>
                    <input type="button" value="| Submit admin keys" onclick={showSubmitKeysModal} />
                  </div>
                )}
                <br/><br/>
                playlistid: {state.currentPlaylist.playlistid}
            </td>
          </tr>
        </table>
      </header>

      {state.currentPlaylist.tracks && (
        <table>
          <thead>
            <th>#</th>
            <th>Thumbnail</th>
            <th>Song</th>
            <th>DL</th>
          </thead>
          <tbody>
            { state.currentPlaylist.tracks &&
              (state.currentPlaylist.tracks.map) &&
              state.currentPlaylist.tracks.map((track, i) => (
              <tr class={(state.nowPlaying === track.id) ? 'nowplaying' : ''}>
                <td>{i + 1}</td>
                <td>
                  <img
                    src={track.thumbnail}
                    onmousedown={() => handleThumbnailClick(track) }
                    class={(!state.fileDirectory[track.id]) ? 'waitingForDl' : ''}/>
                </td>
                <td>
                  {track.title}<br/>
                  <a href={track.url} target='_blank'>{track.url}</a>
                </td>
                <td>
                  {
                    (state.fileDirectory[track.id]) ? (
                      <a onclick={() => { window.openItem('/' + state.fileDirectory[track.id]) }} >
                        <img width='50px' src='/dist/locateOnHdd.png' />
                      </a>
                    ) : (state.activeDownloads.indexOf(track.id) === -1) ? (
                      <a onclick={() => { actions.downloadAudio(track); }} >
                        <img width='50px' src='/dist/download.gif' />
                      </a>
                    ) : (
                      <div class="loader"/>
                    )
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {(!state.currentPlaylist.tracks || !state.currentPlaylist.tracks.length) && (
        <b class='notracks'>playlist has no tracks yet. add some!</b>
      )}

    </Layout>
  )

};

module.exports = playlistEditor;
