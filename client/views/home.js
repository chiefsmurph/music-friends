import { h } from 'hyperapp';
import Layout from '../components/layout';

const home = (state, actions) => {

  return (
    <Layout
      actions={actions}
      state={state}>

      Welcome to the homepage

    </Layout>
  )

};

module.exports = home;
