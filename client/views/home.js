import { h } from 'hyperapp';
import Layout from '../components/layout';

const home = (state, actions) => {

  return (
    <Layout
      actions={actions}
      state={state}>

      <h2>Welcome to music glossary - something pretty cool!</h2>
      <br/>
      <p>Go ahead and create a playlist and then start adding songs.</p>

    </Layout>
  )

};

module.exports = home;
