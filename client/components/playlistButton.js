import { h } from 'hyperapp';

const PlaylistButton = ({ onSelect, pl, currentPlaylist }, children) => {
  const selected = (pl.playlistid && pl.playlistid === currentPlaylist.playlistid) ||
                    (pl.fetchid && pl.fetchid === currentPlaylist.fetchid);
  return (
    <div>
      <li onmousedown={() => onSelect(pl) } class={(selected) ? 'selected' : ''}>
        <h3>{pl.title}</h3>
        <i>{pl.playlistid || pl.fetchid}</i>
        {pl.fetchid && (<b>album-fetch</b>)}
      </li>
    </div>
  );
};

module.exports = PlaylistButton;
