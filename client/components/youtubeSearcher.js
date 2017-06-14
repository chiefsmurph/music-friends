import { h } from 'hyperapp';

const YoutubeSearcher = ({ actions, state }, children) => {

  return (
    <div>
      <input
        type="text"
        id="songname"
        placeholder="artist and or song name"
        oninput={actions.suggestVids} />

      {state.suggestions && (
        <div id="vidSuggestions">
          {state.suggestions.map(vid => (
            <div onclick={(e) => { e.preventDefault(); actions.vidClick(vid); }}>
              <img src={vid.thumbnail} />
              {vid.title}
            </div>
          ))}
        </div>
      )}

      {

        state.step2

      }

    </div>
  );

};

module.exports = YoutubeSearcher;
