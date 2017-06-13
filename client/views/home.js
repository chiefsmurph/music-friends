import { h } from 'hyperapp';
import Layout from '../components/layout';

const home = (state, actions) => {

  return (
    <Layout
      onNewPlaylist={actions.onNewPlaylist}
      currentPlaylist={state.currentPlaylist}
      playlists={state.playlists}
      onSelectPlaylist={actions.selectPlaylist}>

      Welcome to the homepage

    </Layout>
  )

};

module.exports = home;
