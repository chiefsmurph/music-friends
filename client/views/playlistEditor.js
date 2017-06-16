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
    actions.showModal('downloadingAll');
    
  };

  const admin = state.authedKeys.indexOf(state.currentPlaylist.playlistid) !== -1;

  const showSubmitKeysModal = () => {
    actions.showModal('submitkeys');
    document.getElementById('submittingKey').focus();
  };

  const hasDl = state.currentPlaylist.tracks && state.currentPlaylist.tracks.some(track => track.dl);

  return (
    <Layout
      actions={actions}
      state={state}>

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
                  value="| Download entire playlist as a zip"
                  class={(!hasDl) ? 'disabled' : ''}
                  disabled={!hasDl}/>
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
                share url: {window.location.href}
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
                    onmousedown={() => { if (track.dl) actions.requestStream(track); }}
                    class={state.lastRequested === track.id && state.nowPlaying !== track.id ? 'justrequested' : ((!track.dl) ? 'waitingForDl' : '')}/>
                </td>
                <td>
                  {track.title}<br/>
                  <a href={track.url} target='_blank'>{track.url}</a>
                </td>
                <td>
                  {
                    (track.dl) ? (
                      <a href={'/dl/song/' + track.dl.replace(/''/g, "'")}>
                        <img width='50px' src='/download.gif' />
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
