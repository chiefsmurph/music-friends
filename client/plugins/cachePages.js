import updatedTracksWithDl from '../utils/updatedTracksWithDl';

const CachePages = () => ({
  state: {
    playlistCache: JSON.parse(localStorage.getItem('plCache')),
  },
  actions: {
    updateCache: (state, actions, pl) => {
      var playlists = state.playlistCache;
      playlists[pl.playlistid] = pl;
      console.log('updated cache with ', pl);
      localStorage.setItem('plCache', JSON.stringify(playlists));
      console.log('cache now ', JSON.stringify(playlists));
      return {
        playlistCache: playlists
      }
    },
    updateCacheTracksForPlaylist: (state, actions, data) => {
      var { playlistid, tracks } = data;
      var playlists = state.playlistCache;
      var pl = playlists[playlistid];
      console.log(playlistid, tracks);
      if (pl) {
        console.log('FOUND');
        pl.tracks = tracks;
        playlists[playlistid] = pl;
        return {
          playlistCache: playlists
        };
      }
    },
    updateCacheWithDL: (state, actions, dl) => {
      var playlists = state.playlistCache;
      if (playlists[dl.playlistid]) {
        var tracks = playlists[dl.playlistid].tracks || [];
        tracks = updatedTracksWithDl(tracks, dl);
        playlists[dl.playlistid].tracks = tracks;
      }
      return {
        playlistCache: playlists
      };
    }
  },
  events: {
    action: (state, actions, data) => {
      // console.log('action', data);
    },
    loaded: (state, actions, data) => {
      console.log('loading')
      // actions.loadCache();
    }
  }
});

module.exports = CachePages;
