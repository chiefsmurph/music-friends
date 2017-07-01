import { h } from 'hyperapp';
import Layout from '../components/layout';

import Leaderboard from '../components/leaderboard';

const home = (state, actions) => {

  return (
    <Layout
      actions={actions}
      state={state}>

      <h2>Welcome to the homepage</h2>

      <br/>

      <Leaderboard
        leaderboard={state.leaderboard}
        goToPlaylist={(playlistid) => actions.router.go('/playlist/' + playlistid) }/>

    </Layout>
  )

};

module.exports = home;
