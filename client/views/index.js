import { h } from 'hyperapp';
import home from './home';
import leaderboard from './leaderboard';
import playlistEditor from './playlistEditor';

// const prependRoutes = location.pathname.substring(0, location.pathname.indexOf('/dist/') + 6);
const views = module.exports = {
  '/': home,
  '/home': home,
  '/dist/index.html': home,
  '/leaderboard': leaderboard,
  '/playlist/:id': playlistEditor,
  '*': (state, actions) => {
    return (
      <b>{location.pathname}</b>
    );
  }
}
