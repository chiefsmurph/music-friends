import { h } from 'hyperapp';
import Layout from '../components/layout';

import Leaderboard from '../components/leaderboard';

const home = (state, actions) => {

  return (
    <Layout
      actions={actions}
      state={state}>

      <Leaderboard
        leaderboard={state.leaderboard}
        goToPlaylist={(playlistid) => actions.router.go('/playlist/' + playlistid) }
        thumbnailClick={actions.thumbnailClick}
        enableAlbumFetchs={state.settings.enableAlbumFetchs} />

    </Layout>
  )

};

module.exports = home;
