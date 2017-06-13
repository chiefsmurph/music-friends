import { h } from 'hyperapp';
import Layout from '../components/layout';
import YoutubeSearcher from '../components/youtubeSearcher';

const playlistEditor = (state, actions) => {

  return (
    <Layout
      onNewPlaylist={actions.onNewPlaylist}
      currentPlaylist={state.currentPlaylist}
      playlists={state.playlists}
      onSelectPlaylist={actions.selectPlaylist}>

      <YoutubeSearcher
        actions={actions}
        suggestions={state.suggestions}
        />

      <h2>Currently editing {state.currentPlaylist.title}</h2>

      {state.currentPlaylist.tracks && (
        <table>
          <thead>
            <th>#</th>
            <th>Thumbnail</th>
            <th>Song</th>
            <th>DL</th>
          </thead>
          <tbody>
            {state.currentPlaylist.tracks.map((track, i) => (
              <tr>
                <td>{i + 1}</td>
                <td><img src={track.thumbnail} /></td>
                <td>{track.title}</td>
                <td>{track.dl}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </Layout>
  )

};

module.exports = playlistEditor;
