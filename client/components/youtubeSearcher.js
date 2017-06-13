import { h } from 'hyperapp';

const YoutubeSearcher = ({ actions, suggestions }, children) => {

  return (
    <div>
      <input
        type="text"
        id="songname"
        placeholder="song name"
        oninput={actions.suggestVids} />

      <div id="vidSuggestions">
        {suggestions.map(vid => (
          <div onclick={(e) => { e.preventDefault(); actions.vidClick(vid); }}>
            <img src={vid.thumbnail} />
            {vid.title}
          </div>
        ))}
      </div>
    </div>
  );

};

module.exports = YoutubeSearcher;
