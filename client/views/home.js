import { h } from 'hyperapp';
import Layout from '../components/layout';

const home = (state, actions) => {

  return (
    <Layout
      actions={actions}
      state={state}>

      <h2>Welcome to music hacker - the most awesome underground web application for building an mp3 collection in 2017!</h2>
      <br/>
      <p>Go ahead and create a playlist and then start adding songs.</p>

    </Layout>
  )

};

module.exports = home;
