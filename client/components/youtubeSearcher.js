import { h } from 'hyperapp';
import VideoChooser from './videoChooser';

const YoutubeSearcher = ({ actions, state }, children) => {

  return (
    <div>
      <input
        type="text"
        id="songname"
        placeholder="artist and or song name"
        oninput={actions.suggestVids} />

      <VideoChooser
        videos={state.suggestions}
        vidClick={actions.vidClick} />

    </div>
  );

};

module.exports = YoutubeSearcher;
