import { h } from 'hyperapp';
import Layout from '../components/layout';
import YoutubeSearcher from '../components/youtubeSearcher';

const playlistEditor = (state, actions) => {

  return (
    <Layout
      actions={actions}
      state={state}>

      <header>
        <h3>{state.currentPlaylist.title}</h3>
      </header>

      <YoutubeSearcher
        actions={actions}
        suggestions={state.suggestions} />

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
                <td>
                  {track.title}<br/>
                  <a href={track.url} target='_blank'>{track.url}</a>
                </td>
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
