import { h } from 'hyperapp';
import VideoChooser from './videoChooser';

const YoutubeSearcher = ({ actions, state }, children) => {
  // console.log(actions.songDone, 'youtubesearcher');
  return (
    <div>
      <input
        type="text"
        id="songname"
        placeholder="artist and or song name"
        oninput={actions.suggestVids} />

      <VideoChooser
        videos={state.suggestions}
        vidClick={actions.vidClick}
        playYoutube={actions.playYoutube}
        songDone={actions.songDone}
        playOnHover={state.settings.previewVideosOnHover}/>

    </div>
  );

};

module.exports = YoutubeSearcher;
