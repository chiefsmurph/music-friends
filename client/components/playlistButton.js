import { h } from 'hyperapp';

const PlaylistButton = ({ onSelect, pl, selected }, children) => {
  const onselectplaylist = () => {
    console.log('selected', pl);
    onSelect(pl);
  };
  return (
    <li onclick={onselectplaylist} class={(selected) ? 'selected' : ''}>
      <h3>{pl.title}</h3>
      <i>{pl.playlistid}</i>
    </li>
  );
};

module.exports = PlaylistButton;
