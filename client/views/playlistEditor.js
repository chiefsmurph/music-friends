import { h } from 'hyperapp';
import Layout from '../components/layout';
import YoutubeSearcher from '../components/youtubeSearcher';

const playlistEditor = (state, actions) => {

  return (
    <Layout
      actions={actions}
      state={state}>

      <YoutubeSearcher
        actions={actions}
        state={state} />

      <header>
        <h3>{state.currentPlaylist.title}</h3>
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
            {state.currentPlaylist.tracks && (state.currentPlaylist.tracks.map) && state.currentPlaylist.tracks.map((track, i) => (
              <tr>
                <td>{i + 1}</td>
                <td><img src={track.thumbnail} /></td>
                <td>
                  {track.title}<br/>
                  <a href={track.url} target='_blank'>{track.url}</a>
                </td>
                <td>
                  {
                    (track.dl) ? (
                      <a href={track.dl}>
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
