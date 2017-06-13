import { h } from 'hyperapp';
import PlaylistButton from './PlaylistButton';

const Layout = ({ state, actions }, children) => {
  const { currentPlaylist, playlists, currentIcon, changeBalance } = state;
  const { onNewPlaylist, selectPlaylist } = actions;
  const onSelectPlaylist = (playlist) => {
    selectPlaylist(playlist);
  };
  return (
    <div class='container'>
      {JSON.stringify(currentPlaylist)}
      <h1><span>{currentIcon}</span>music hacker</h1>
      <div id='left'>
        <button onclick={onNewPlaylist}>+ new playlist</button><br/>
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
