import { h } from 'hyperapp';
import home from './home';
import playlistEditor from './playlistEditor';

const views = module.exports = {
  '/': home,
  '/playlist/:id': playlistEditor,
  '*': (model, actions) => <div>404</div>
}
