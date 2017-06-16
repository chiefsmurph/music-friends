import { h } from 'hyperapp';
import home from './home';
import playlistEditor from './playlistEditor';

const views = module.exports = {
  '/': home,
  'index.html': home,
  '/Users/john/Development/my-stuff/musichacker/client/dist/index.html': home,
  '/playlist/:id': playlistEditor,
  '*': (state, actions) => {
    return (
      <b>{location.pathname}</b>
    );
  }
}
