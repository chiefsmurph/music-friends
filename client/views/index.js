import { h } from 'hyperapp';
import home from './home';
import playlistEditor from './playlistEditor';

// const prependRoutes = location.pathname.substring(0, location.pathname.indexOf('/dist/') + 6);
const views = module.exports = {
  '/': home,
  'index.html': home,
  '/playlist/:id': playlistEditor,
  '*': (state, actions) => {
    return (
      <b>{location.pathname}</b>
    );
  }
}
