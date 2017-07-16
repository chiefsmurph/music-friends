import { h } from 'hyperapp';

const Leaderboard = ({ leaderboard, goToPlaylist, thumbnailClick, enableAlbumFetchs }) => {
  if (!(leaderboard && leaderboard.topSongs && leaderboard.topPlaylists)) {
    return <b>Loading leaderboard</b>;
  }
  return (
    <div id="leaderboards">
      <h2>Top Songs</h2>
      <div id="top-songs">
        {
          leaderboard.topSongs.map(song => (
            <div onclick={() => thumbnailClick(song.songid)}>
              <img src={song.thumbnail}/>
              song title: {song.title}
            </div>
          ))
        }
      </div>
      <br/><br/>
      <h2>Top Playlists</h2>
      <div id="top-playlists">
        {
          leaderboard.topPlaylists.map(pl => (
            <div>
              <a href='javascript:void(0)' onclick={() => goToPlaylist(pl.playlistid)}>{pl.title}</a><br/><br/>
              times requested: {pl.requestcount}<br/>
              number of tracks: {pl.trackcount}
            </div>
          ))
        }
      </div>
      {
        enableAlbumFetchs && (
          <div>
            <br/><br/>
            <h2>Top Fetches</h2>
            <div id="top-playlists">
              {
                leaderboard.topFetches.map(fetch => (
                  <div>
                    artist: {fetch.artist}<br/>
                    release: {fetch.release}
                  </div>
                ))
              }
            </div>
          </div>
        )
      }
    </div>
  );
};

module.exports = Leaderboard;
