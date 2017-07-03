import { h } from 'hyperapp';
import Layout from '../components/layout';

import Leaderboard from '../components/leaderboard';

const home = (state, actions) => {

  return (
    <Layout
      actions={actions}
      state={state}>

      <h2>Welcome to music hacker - the most awesome underground music application for creating a rich mp3 library in 2017!</h2>
      <br/>
      <p>We recommend you download the music hacker app directly to your computer:</p>

      <p>Then all you have to do is create a playlist and then start adding songs.</p>
      <p>You can use music hacker directly in your browser, but then you are not using the full capabilities.</p>

      <br/>

      <Leaderboard
        leaderboard={state.leaderboard}
        goToPlaylist={(playlistid) => actions.router.go('/playlist/' + playlistid) }/>

    </Layout>
  )

};

module.exports = home;
