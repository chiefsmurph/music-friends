import { h } from 'hyperapp';
import PlaylistButton from './PlaylistButton';

const Layout = ({ currentPlaylist, playlists, onSelectPlaylist, onNewPlaylist }, children) => {

  return (
    <div class='container'>
      {JSON.stringify(currentPlaylist)}
      <h1>music hacker</h1>
      <div id='left'>
        <button onclick={onNewPlaylist}>+ new playlist</button>
        <ul>
          {playlists.map(pl => (
            <PlaylistButton selected={pl.playlistid === currentPlaylist.playlistid} onSelect={onSelectPlaylist} pl={pl} />
          ))}
        </ul>
      </div>
      <div id='right'>
        {children}
      </div>
      <div class="clear"></div>
    </div>
  );
}

module.exports = Layout;
