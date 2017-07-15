import { h } from 'hyperapp';

const PlaylistViewer = ({ state, actions }, children) => {

  return (
    <div>

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
                    onmousedown={() => actions.thumbnailClick(track.id) }
                    class={(state.activeDownloads.indexOf(track.id) !== -1) ? 'waitingForDl' : ''}/>
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


    </div>
  )
};

module.exports = PlaylistViewer;
