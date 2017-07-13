import { h } from 'hyperapp';
import home from './home';
import leaderboard from './leaderboard';
import playlistEditor from './playlistEditor';
import settings from './settings';

// const prependRoutes = location.pathname.substring(0, location.pathname.indexOf('/dist/') + 6);
const views = module.exports = [
    ['/', home],
    ['/home', home],
    ['/dist/index.html', home],
    ['/leaderboard', leaderboard],
    ['/playlist/:id', playlistEditor],
    ['/settings', settings],
    ['*', (state, actions) => {
      return (
        <b>{location.pathname}</b>
      );
    }]
];
