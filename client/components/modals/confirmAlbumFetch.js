import { h } from 'hyperapp';

const ConfirmAlbumFetch = ({ state, actions }, children) => {
  const fetchAlbum = (e) => {
    actions.beginFetch();
  };
  return (
    <div class="modal" id="confirmalbumfetch">
      <a class="x" onclick={actions.hideModals}>x</a>
      <header>
        Confirm this is the album you want to fetch
      </header>
      <h2>{state.albumOfInterest.title} by {state.albumOfInterest.artist}</h2>
      <div style={{float: 'left', margin: '10px'}}>
        <img src={state.albumOfInterest.thumbnail}/>
      </div>
      <ul id='tracklist'>
        {state.albumOfInterest.tracks.map((track, i) => (
          <li>{i+1} {track}</li>
        ))}
      </ul>
      <footer>
        <button onclick={actions.hideModals}>Cancel</button>
        <button class='confirm' onclick={fetchAlbum}>Fetch this album</button>
      </footer>
    </div>
  )
};

module.exports = ConfirmAlbumFetch;
