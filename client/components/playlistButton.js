import { h } from 'hyperapp';

const PlaylistButton = ({ onSelect, pl, selected, confirmDeletePl }, children) => {
  const onselectplaylist = () => {
    console.log('selected', pl);
    onSelect(pl);
  };
  return (
    <div>
      <div class='x small' onclick={() => confirmDeletePl(pl)}>x</div>
      <li onmousedown={onselectplaylist} class={(selected) ? 'selected' : ''}>
        <h3>{pl.title}</h3>
        <i>{pl.playlistid}</i>
      </li>
    </div>
  );
};

module.exports = PlaylistButton;
